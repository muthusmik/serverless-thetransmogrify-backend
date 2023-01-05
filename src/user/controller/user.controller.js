const BaseController = require("../../common/controllers/base.controller");
const userRepository = require("../repository/user.repository");
const userDto = require("../middleware/user.dto");
const responseService = require("../../common/services/response.service");
const validation = require("../../shared/middleware/validate.middleware");
const userValidation = require("../middleware/user.validation");


class UserController extends BaseController {
  constructor(respService, repository, dto) {
    super(respService, repository, dto);
    this.repository = repository;
    this.roleCreate = this.roleCreate.bind(this);
     
  }

  async roleCreate(req, res) {
    try {
      let requiredFields = {
        roleName: "",
        roleDescription: "",
      };
      if (req.body) {
        let validate = await validation.validation(req.body, requiredFields);

        if (validate.data.statusCode === 400) {
          return validate;
        }
      }
      let success = false;
      const roleCreateDto = this.dto.roleCreateDto(req.body);
      

      const record = await this.repository.createRoles(roleCreateDto);

      return { success: !success, data: record };
    } catch (e) {
       
      return { e };
    }
  }

  async updateUserRole(req) {
    try {
      

      let requiredFields = {
        roleName: "",
      };
      if (req.body) {
        let validate = await validation.validation(req.body, requiredFields);

        if (validate.data.statusCode === 400) {
          return validate;
        }
      }
      let success = false;
      const updateRoleDto = this.dto.updateRole(req.body);

      console.log("updateRoleDto.....", updateRoleDto);

      const updateRole = await this.repository.updateRoles(
        req.user.id,
        updateRoleDto
      );

      return { success: !success, data: updateRole };
      // this.responseService.created(req, res, createdRole);
    } catch (e) {
      console.log(e);

      //this.responseService.fail(req, res, e);
    }
  }

  async profileUpdate(req) {
    try {

      let requiredFields = {
        firstName: "",
        lastName:"",
        dob:"",
        gender:""
      };
      if (req.body) {
        let validate = await validation.validation(req.body, requiredFields);

        if (validate.data.statusCode === 400) {
          return validate;
        }
      }
      let success = false;
      const updateProfileDto = this.dto.updateProfileDto(req.body);

      const updateProfile = await this.repository.updateProfile(
        req.user.id,
        updateProfileDto
      );

      return { success: !success, data: updateProfile };
      // this.responseService.created(req, res, createdRole);
    } catch (e) {
      console.log(e);

      //this.responseService.fail(req, res, e);
    }
  }

    async getProfile(){
      try{

        let success = false;
        let userId = req.user.id 
        const getProfile = await this.repository.getUserProfiles(userId)
      }
      catch(e){

      }
    }





  async getRoles(req) {
    try {
     

      let success = false;

      const roles = await this.repository.getRoles();

      return { success: !success, data: roles };
       
    } catch (e) {
      console.log(e);

      //this.responseService.fail(req, res, e);
    }
  }
}

module.exports = new UserController(responseService, userRepository, userDto);
