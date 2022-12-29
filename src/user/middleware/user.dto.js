const BaseDto = require("../../common/dto/base.dto");
const { User, Role, UserRole } = require("../../common/models");

class UserDto extends BaseDto {
  constructor(model) {
    super(model);
  }

  roleCreateDto(body){
    return {
        roleName: body.roleName,
        roleDescription:body.roleDescription
    };
}
  
   
  updateRole(body) {
    return {
       
      roleName: body.roleName,
    };
  }

  updateProfileDto(body){

    return{
     
      firstName:body.firstName,
      lastName:body.lastName,
      dob:body.dob,
      gender:body.gender
    }
  }
   
}

module.exports = new UserDto(User);
