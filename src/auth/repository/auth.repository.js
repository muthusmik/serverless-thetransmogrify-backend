const BaseService = require("../../common/services/base.service");
const models = require("../../common/models");
const auth0 = require("./../../common/services/auth0-connection.service");
const ono = require("@jsdevtools/ono");
const auth0Header = require("../../common/helpers/auth0-header.helper");
const axios = require("axios");
 const validation = require("../validation/validation");

const {
  signJWT,
  verifyToken,
  generateLoginJWT,
} = require("../../common/services/auth.jwt");

const { Users, UserRoles, UserSession, Profiles } = models;

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

      if (exisitingAuth0User.status === 200 && exisitingAuth0User.data) {
        return {
          status: 409,
          message: "User already exists",
        };
      }

      // If user doesn't exist in auth0 create a user
      const createdAuth0User = await this.createAuth0User(createUserDto, oauth);

      if (!createdAuth0User.data) {
        throw ono(createdAuth0User);
      }

      const loginUser = await this.auth0UserLogin({
        email: createUserDto.email,
        password: createUserDto.password,
      });

      if (!loginUser.data) {
        throw ono(loginUser);
      }
      //Create new user in database with auth0-user-id

      let hashPassword = validation.hashPassword(createUserDto.password);

      const newUserDto = {};
      Object.assign(newUserDto, {
        ...createUserDto,
        auth0_user_id: createdAuth0User.data._id,
        password: hashPassword,
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
        role_id: 6,
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
        console.log("existing aut0 error", error);
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

        
      });
    console.log("result.............", result);
    return result;
  }

  

 
  

  async login(loginDto) {
    try {
      const loginUser = await this.auth0UserLogin({
        email: loginDto.email,
        password: loginDto.password,
      });

      if (!loginUser.data) {
            return {
          statusCode: 400,
          message: "invalid username or password",
        };
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
        statusCode:200,
        access_token: loginUser.data.access_token,
        refresh_token: loginUser.data.refresh_token,
      });
    } catch (e) {
      throw ono(e);
    }
  }

  async auth0UserPasswordChange(userId, changePasswordDto) {
    console.log("userId...111", userId);
    const oauth = await auth0.getAccessToken();
    const result = await axios
      .patch(
        `${this.auth0BaseUrl}/api/v2/users/${userId}`,
        {
          connection: this.auth0Connection,
          password: changePasswordDto.password,
        },
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
    console.log(
      "result.......................................................",
      result
    );
    return result;
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

  async changeUserPassword(id, changePasswordDto) {
    try {
      console.log("id....", id);
      const user = await this.getById(id);
      let passwordUpdated = false;
      console.log("user..", user);
      const authUser = await this.getAuth0UserById(user.auth0_user_id);

      if (authUser.status == "404") {
        return authUser;
      } else {
        const auth0_user_id = authUser.data.user_id;
        console.log(
          "before changepassword if cond",
          changePasswordDto.oldPassword
        );
        console.log("user.password", user.password);
        if (
          validation.comparePassword(
            user.password,
            changePasswordDto.oldPassword
          )
        ) {
          
          const changePassword = await this.auth0UserPasswordChange(
            auth0_user_id,
            {
              email: changePasswordDto.email,
              password: changePasswordDto.password,
              confirmPassword: changePasswordDto.confirmPassword,
            }
          );

           
          if (changePassword.status == 200) {
            await this.update(id, {
              password: validation.hashPassword(changePasswordDto.password),
            });
          }
          return changePassword;
        }
        return passwordUpdated;
      }
    } catch (e) {
      throw ono(e);
    }
  }
}

module.exports = new AuthRepository(Users);
