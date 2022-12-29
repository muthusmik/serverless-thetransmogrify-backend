const BaseController = require('../../common/controllers/base.controller');
const authRepository = require('../repository/auth.repository');
const authDto = require('../middleware/auth.dto');
const responseService = require('../../common/services/response.service');

class AuthController extends BaseController {
    constructor(respService, repository, dto) {
        super(respService, repository, dto);
        this.repository = repository;
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
        this.sendVerificationMail = this.sendVerificationMail.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
        
     }
     

    async create(req) {
        try {
            let success = false;
            
            const createDto = this.dto.createUser(req);
            
            const record = await this.repository.createUser(createDto);
            

           // this.responseService.created(req, res, record);
            return {success:!success,data:record}
           
        } catch (e) {
           
           return e
             
        }
    }

    async login(req) {
        try {

            let success = false;
            
            const loginDto = this.dto.loginUser(req);
                
            const record = await this.repository.login(loginDto);
        

            
            return  {success:!success,data:record}
            //this.responseService.success(req, res, record);
        } catch (e) {
            delete e.stack;
             return e
        }
    }

    async sendVerificationMail(req) {
        try {
            const sendMailDto = this.dto.sendVerificationMail(req.body);
            const isSent = await this.repository.sendVerifyMail(sendMailDto)
            if (isSent.status) {
                //this.responseService.success(req, res, "Mail Sent Successfully");
            }
        } catch (e) {
            //this.responseService.fail(req, res, e);
        }
    }
    async verifyUser(req) {
        try {
            const verifyUserDto = this.dto.verifyUser(req.params);
            const user = await this.repository.verifyUser(verifyUserDto)

           // this.responseService.success(req, res, "User Verified Successfully");

        } catch (e) {
            //this.responseService.fail(req, res, e);
        }
    }  

 
  }

  
    
    

module.exports = new AuthController(responseService, authRepository, authDto);
