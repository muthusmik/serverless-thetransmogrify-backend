const BaseController = require("../../common/controllers/base.controller");
const userRepository = require("../repository/user.repository");
const userDto = require("../middleware/user.dto");
const responseService = require("../../common/services/response.service");
//const jwt = require("../../auth/middleware/jwt-decode")
//import jwt_decode from "jwt-decode";
const jwt_decode = require("jwt-decode")
class UserController extends BaseController {
  
  constructor(respService, repository, dto) {
    super(respService, repository, dto);
    this.repository = repository;
    this.roleCreate = this.roleCreate.bind(this);
    // this.login = this.login.bind(this);
    // this.sendVerificationMail = this.sendVerificationMail.bind(this);
    // this.verifyUser = this.verifyUser.bind(this);
    // this.changePassword = this.changePassword.bind(this)
 }
 

  async roleCreate(req){
    try{
    
      //var decoded = jwt.jwtDecode(token)

      console.log('roleCreate........',req.body)

        let success = false
        const roleCreateDto = this.dto.roleCreateDto(req.body);
        console.log('roleCreateDto........',roleCreateDto)

        const record = await this.repository.createRoles(roleCreateDto);

         
        return  {success:!success,data:record}
    }
    catch(e){
        console.log('e.................',e)
    }
}

  async updateUserRole(req) {
    try {
      console.log('req.....',req)

      let success = false
      const updateRoleDto = this.dto.updateRole(req.body);
       
      console.log('updateRoleDto.....',updateRoleDto)

      const updateRole = await this.repository.updateRoles(req.user.id,updateRoleDto);
       

      return  {success:!success,data:updateRole}
     // this.responseService.created(req, res, createdRole);
    } catch (e) {
      console.log(e)

      //this.responseService.fail(req, res, e);
    }
  }
  
  async profileUpdate(req) {
    try {

       let success = false
      const updateProfileDto = this.dto.updateProfileDto(req.body);
       

      const updateProfile = await this.repository.updateProfile(req.user.id,updateProfileDto);
       

      return  {success:!success,data:updateProfile}
     // this.responseService.created(req, res, createdRole);
    } catch (e) {
      console.log(e)

      //this.responseService.fail(req, res, e);
    }
  }
   
  
   



async getRoles(req) {
  try {

    // let token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNMejZEdWlRcVF6YXAweFV1QkF0eiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wdmYyZzJ1c29ubndpNDRyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2M2FiMTQ5ZDQ0NjQxZTBhMTg2Y2NkNTAiLCJhdWQiOiJodHRwczovL2Rldi0wdmYyZzJ1c29ubndpNDRyLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjcyMTU2MzE3LCJleHAiOjE2NzIyNDI3MTcsImF6cCI6IkdBQTBHWFBtOWdzUHJJSXBMS0N0c0p6aUNJcUFpSGVZIiwic2NvcGUiOiJyZWFkOmN1cnJlbnRfdXNlciB1cGRhdGU6Y3VycmVudF91c2VyX21ldGFkYXRhIGRlbGV0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgY3JlYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBjcmVhdGU6Y3VycmVudF91c2VyX2RldmljZV9jcmVkZW50aWFscyBkZWxldGU6Y3VycmVudF91c2VyX2RldmljZV9jcmVkZW50aWFscyB1cGRhdGU6Y3VycmVudF91c2VyX2lkZW50aXRpZXMiLCJndHkiOiJwYXNzd29yZCJ9.rDtkVuZkNrzpfITuksQW6ZcxdyvNK-DdSD5FFrwL2SRG3MX62YcLIQTQYZSSEdAVwsGUN9N-KGK9_73HP78xpoHnYRyeMvrHGLmFe7ODWWaZFcOR9M4YotxOpKH7OtmcWPDnF9CS9QSNDzdtoRO7k7rMaWLD2MhibcklHsYE-r-S5MBrD322e7rQpyDyhyV0KdihB-nyatNoJH1qYzFWyCDD712-gyzmfojTuIMzSvXl3zgSH7F93znJvx3MCdtNJ5LAWDWys52equyXXWm_-9HF3KEOo9j-KDMVQ9e9-hseZ4KjLx7W8JGrGMzrcljVKprEiwHd4KGAofHcG8Uy0A"
    // var decoded = jwt_decode(token);
    // console.log('decoded',decoded);
   
      let success = false

    const roles = await this.repository.getRoles();
     

    return  {success:!success,data:roles}
   // this.responseService.created(req, res, createdRole);
  } catch (e) {
    console.log(e)

    //this.responseService.fail(req, res, e);
  }
}
 

 
}

module.exports = new UserController(responseService, userRepository, userDto);
