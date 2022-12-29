const BaseService = require("../../common/services/base.service");
const models = require("../../common/models");
const ono = require("@jsdevtools/ono");
const { signJWT } = require("../../common/services/auth.jwt");

const { Users, UserRoles, Roles ,Profiles} = models;

class UserRepository extends BaseService {
  constructor(model) {
    super(model);
    this.model = model;
  }

  async createRoles(data) {
    try {

      console.log(data,'....................................data')
      const role = await Roles.create({
        roleName: data.roleName,
        roleDescription: data.roleDescription,
      });
      console.log(role,'....................................role')

      return role;
    } catch (e) {
      throw ono(e);
    }
  }

  async updateRoles(userId,updateRoleDto) {
    try {
      const userData = await UserRoles.findOne({
        where: { user_id: userId},
        attribute: ["id", "user_id", "role_id"],
      });

      const roleData = await Roles.findOne({
        where: { roleName: updateRoleDto.roleName },
      });

      userData.role_id = roleData.id;
      await userData.save();

      return userData;
    } catch (e) {
      throw ono(e);
    }
  }



  
  async updateProfile(userId,data) {
    try {
      const userData = await Profiles.findOne({
        where: { user_id: userId },
        attribute: ["id", "firstName", "lastName","dob","gender","user_id"],
      });

     
     
      userData.firstName = data.firstName,
      userData.lastName=data.lastName,
      userData.dob=data.dob,
      userData.gender=data.gender
       

      //userData.role_id = roleData.id;
      await userData.save();
      console.log('userData...',userData)
      return userData;
    } catch (e) {
      throw ono(e);
    }
  }

  async getRoles() {


    try{
      const roles = await Roles.findAll({ });
      console.log('roles...',roles)
      return roles
    }
    catch(e){
      throw ono(e);
    }
  }
  
}

module.exports = new UserRepository(Users);
