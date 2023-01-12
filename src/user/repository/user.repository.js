const BaseService = require("../../common/services/base.service");
const models = require("../../common/models");
const ono = require("@jsdevtools/ono");
const {
  modifyResponseForGetProfiles,
} = require("../../common/helpers/users.helpers");
const academicDetailsModel = require("../../common/models/academic-details.model");
const { Users, UserRoles, Roles, Profiles, States, Cities, AcademicDetails ,Countries,Uszips,SchoolDetails} =
  models;

class UserRepository extends BaseService {
  constructor(model) {
    super(model);
    this.model = model;
  }

  async createRoles(data) {
    try {
      const role = await Roles.create({
        roleName: data.roleName,
        roleDescription: data.roleDescription,
      });

      return role;
    } catch (e) {
      throw ono(e);
    }
  }

  async updateRoles(userId, updateRoleDto) {
    try {
      const userData = await UserRoles.findOne({
        where: { user_id: userId },
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

  async updateProfile(userId, data) {
    try {
      const userData = await Profiles.findOne({
        where: { user_id: userId },
        attribute: ["id", "firstName", "lastName", "dob", "gender", "user_id"],
      });

      (userData.firstName = data.firstName),
        (userData.lastName = data.lastName),
        (userData.dob = data.dob),
        (userData.gender = data.gender);

      await userData.save();

      return userData;
    } catch (e) {
      throw ono(e);
    }
  }

  async getRoles() {
    try {
      const roles = await Roles.findAll({});
      console.log("roles...", roles);
      return roles;
    } catch (e) {
      throw ono(e);
    }
  }

  async getUserProfiles(userId) {
    try {
      const userData = await Profiles.findOne({
        where: { user_id: userId },
        attribute: ["id", "firstName", "lastName", "dob", "gender", "user_id"],
      });
      return userData;
    } catch (e) {
      return e;
    }
  }

  async getStates() {
    try {
      const userData = await States.findAll({
        attributes: ["id", "country_id", "name", "code"],
      });

      return userData;
    } catch (e) {
      return e;
    }
  }

  async getCities() {
    try {
      const userData = await Cities.findAll({
        attributes: ["id", "state_id", "name", "zipcode", "long", "lat"],
      });

      return userData;
    } catch (e) {
      return e;
    }
  }

  async getUserAcademicDetails(userId) {
    try {
      
      let userData = await AcademicDetails.findAll({
        where: { userId: userId },
        attributes: [
          "id",
          "schoolId",
          "graduationYear",
          "userId",
          "isAdult",
        ],
      });

      return userData;
    } catch (e) {
      return e;
    }
  }



  async getAllCountries(){
    try{

       
      
      console.log("hai from getCountries  REpository.........");
      const userData = await Countries.findAll({  attributes: ['id','name','code','is_active'], });
    
      return userData
      
    }
    catch(e){
      return e 
    }
  }
  async getAllUszips(){
    try{

       
         console.log("hai from getCountries  REpository.........");
      const userData = await Uszips.findAll({  attributes: ['zip','city','state_id','state_name','lat','lng'], });
    
      return userData
      
    }
    catch(e){
      return e 
    }
  }
  async academicDetailsUpdate(userId, data) {
    try {

      console.log('data............',data)
      if(typeof data.schoolId === 'string' ){
          console.log('inside')

          const schoolName = await SchoolDetails.create({
            school_name:data.schoolId
          });
          console.log('schoolName...',schoolName)
      }
      const academicData = await AcademicDetails.findOne({
        where: { userId: userId },
        attribute: ["id", "schoolId", "graduationYear", "userId", "isAdult"],
      });
      
      (academicData.schoolId = data.schoolId),
        (academicData.graduationYear = data.graduationYear),
        (academicData.userId = data.userId),
        (academicData.isAdult = data.isAdult);

      await academicData.save();

      return academicData;
    } catch (e) {
      throw ono(e);
    }
  }


}

module.exports = new UserRepository(Users);
