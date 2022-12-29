const BaseService = require("../../common/services/base.service");
const models = require("../../common/models");
const auth0 = require("./../../common/services/auth0-connection.service");
const ono = require("@jsdevtools/ono");
const auth0Header = require("../../common/helpers/auth0-header.helper");
const axios = require("axios");
const sendMail = require("../../common/services/sendMail");
const validation = require("../validation/validation");

const {
  signJWT,
  verifyToken,
  generateLoginJWT,
} = require("../../common/services/auth.jwt");

const {
  Users,
  UserRoles,
    UserSession,
   Profiles,
} = models;

class AuthRepository extends BaseService {
  constructor(model) {
    super(model);
    this.model = model;
    this.auth0BaseUrl = process.env.AUTH0_API_BASE_URL;
    this.auth0ClientId = process.env.AUTH0_CLIENT_ID;
    this.auth0Connection = process.env.AUTH0_CONNECTION;
    this.auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET;
    this.create = this.create.bind(this);
    this.getExistingAuth0User = this.getExistingAuth0User.bind(this);
    this.createAuth0User = this.createAuth0User.bind(this);
    this.auth0UserLogin = this.auth0UserLogin.bind(this);
    this.sendVerifyMail = this.sendVerifyMail.bind(this);
  }

  async createUser(createUserDto) {
    try {
      // Get auth0 access token

      const oauth = await auth0.getAccessToken();

      if (oauth.status < 200 && oauth.status > 299) {
        throw ono({
          status: 500,
          message: "Invalid access token",
        });
      }
      // Check if user already exists in auth0 if yes throw error
      const exisitingAuth0User = await this.getExistingAuth0User(
        createUserDto.email,
        oauth
      );
      console.log('exisitingAuth0User.....11',exisitingAuth0User)

      if (exisitingAuth0User.status === 200 && exisitingAuth0User.data) {

        return {
          status: 409,
          message: "User already exists",
        };
      }

      // If user doesn't exist in auth0 create a user
      const createdAuth0User = await this.createAuth0User(createUserDto, oauth);
      console.log('createdAuth0User....',createdAuth0User)
      if (!createdAuth0User.data) {
        throw ono(createdAuth0User);
      }

      const loginUser = await this.auth0UserLogin({
        email: createUserDto.email,
        password: createUserDto.password,
      });
      console.log('loginUser......',loginUser)
      if (!loginUser.data) {
        throw ono(loginUser);
      }
      //Create new user in database with auth0-user-id

      // let hashPassword=validation.hashPassword(createUserDto.password)
      console.log("loginUser...", loginUser);
      const newUserDto = {};
      Object.assign(newUserDto, {
        ...createUserDto,
        auth0_user_id: createdAuth0User.data._id,
      });
      newUserDto.is_email_verified = true;

      delete newUserDto.device_id;
      const user = await this.create(newUserDto);

      await UserSession.create({
        user_id: user.dataValues.id,
        access_token: loginUser.data.access_token,
        refresh_token: loginUser.data.refresh_token,
        device_id: createUserDto.device_id,
      });
      await UserRoles.create({
        user_id: user.dataValues.id,
        role_id:6
      });

      await Profiles.create({ user_id: user.dataValues.id });
      return Object.assign({
        ...user.dataValues,
        access_token: loginUser.data.access_token,
        refresh_token: loginUser.data.refresh_token,
      });
    } catch (e) {
      console.log("e.,,,,", e);
      throw ono(e);
    }
  }

  //find user with our database
  async findUserWithDatabase(auth0Id) {
    const userData = await Users.findOne({
      where: { auth0_user_id: auth0Id },
      attribute: ["id", "email"],
    });

    return userData;
  }
  async getExistingAuth0User(email, oauth) {
    const result = await axios
      .get(`${this.auth0BaseUrl}/api/v2/users?q=email:` + email, {
        headers: auth0Header.baseHeaders(oauth),
      })
      .then((result) => {
        return {
          status: result.status,
          data: result.data[0],
        };
      })
      .catch((error) => {
        return {
          status: error,
          message: error,
        };
      });

    return result;
  }
  // prettier-ignore

  async createAuth0User(userDto, oauth) {

    
    const auth0UserData = {
      // given_name: userDto.first_name,
      // family_name: userDto.last_name,
      email: userDto.email,
      password: userDto.password,
      connection: this.auth0Connection,
      client_id: this.auth0ClientId,
    };
     

    const auth0User = await axios
      .post(`${this.auth0BaseUrl}/dbconnections/signup`, auth0UserData, {
        headers: {'Authorization':auth0Header.baseHeaders(oauth).Authorization}
      })
      .then((result) => {
       
        return {
          status: result.status,
          data: result.data,
        };
      })


      .catch((error) => {
        return {
          status: error.response.status,
          message: error.response.data.error,
        };
      });
     
    return auth0User;
  }

  async auth0UserLogin(loginUserDto) {
    // Get auth0 access token
    const oauth = await auth0.getAccessToken();
    if (oauth.status < 200 && oauth.status > 299) {
      throw ono({
        status: 500,
        message: "Invalid access token",
      });
    }
    // login user

    const result = await axios
      .post(
        `${this.auth0BaseUrl}/oauth/token`,
        {
          grant_type: "password",
          client_id: this.auth0ClientId,
          username: loginUserDto.email,
          client_secret: this.auth0ClientSecret,
          password: loginUserDto.password,
          audience: "https://dev-0vf2g2usonnwi44r.us.auth0.com/api/v2/",
        },
        {
          headers: {
            Authorization: auth0Header.baseHeaders(oauth).Authorization,
            "Accept-Encoding": "gzip,deflate,compress",
          },
        }
      )
      .then((result) => {
        return {
          status: result.status,
          data: result.data,
        };
      })
      .catch((error) => {
        console.log(error.response.data);
        return error.response.data;

        // return {
        //   status: error,
        //   message: error,
        // };
      });

    return result;
  }

  //   send verification mail by getting user id
  async sendVerifyMail(userDto) {
    const user = await this.getById(userDto.id);

    if (user) {
      const token = await signJWT({ id: user.dataValues.id });
      this.update(user.dataValues.id, { email_verify_token: token });
      const isSent = await sendMail([user.dataValues.email], token);
      return isSent;
    } else {
      throw ono({
        status: 404,
        message: "No User Found",
      });
    }
  }

  //   verify user by received mail
  async verifyUser(data) {
    const decoded = await verifyToken(data.token);

    if (decoded.id) {
      const updatedUser = await this.update(decoded.id, {
        email_verify_token: null,
        is_email_verified: true,
      });
      return updatedUser;
    } else {
      throw ono({
        status: 401,
        message: "Invalid Token",
      });
    }
  }

  async login(loginDto) {
    try {
      const loginUser = await this.auth0UserLogin({
        email: loginDto.email,
        password: loginDto.password,
      });

      if (!loginUser.data) {


        throw ono(loginUser);
      }

      // fetch user logged in with email id
      const loggedInUser = await this.model.findOne({ email: loginUser.email });
      // console.log('login user...',loggedInUser)

      // remove sessions with already existing device id
      await UserSession.destroy({
        where: {
          device_id: loginDto.device_id,
        },
      });
      // create new session with device id
      await UserSession.create({
        user_id: loggedInUser.dataValues.id,
        access_token: loginUser.data.access_token,
        refresh_token: loginUser.data.refresh_token,
        device_id: loginDto.device_id,
      });

      return Object.assign({
        // ...loggedInUser.dataValues,
        access_token: loginUser.data.access_token,
        refresh_token: loginUser.data.refresh_token,
      });
    } catch (e) {
      throw ono(e);
    }
  }

  async getAuth0UserById(userId) {
    const oauth = await auth0.getAccessToken();

    const result = await axios
      .get(
        `${this.auth0BaseUrl}/api/v2/users/auth0|${userId}`,

        {
          headers: auth0Header.baseHeaders(oauth),
          "content-type": "application/x-www-form-urlencoded",
        }
      )
      .then((result) => {
        return {
          status: result.status,
          data: result.data,
        };
      })
      .catch((error) => {
        return {
          status: error.response.status,
          message: error.response.data,
        };
      });
    return result;
  }

  async getUserById(userId) {
    try {
      const user = await this.getById(userId);

      const authUser = await this.getAuth0UserById(user.auth0_user_id);
      return authUser;
    } catch (e) {
      throw ono(e);
    }
  }

  // async createRoles(data){
  //   try{

  //    const userRole= await roles.create({
  //       roleName: data.roleName,
  //       roleDescription: data.roleDescription,

  //     });

  //     return userRole
  //   }
  //   catch(e){
  //     console.log('inside createRoles e...',e)
  //           throw ono(e);
  //   }
  // }
}

module.exports = new AuthRepository(Users);
