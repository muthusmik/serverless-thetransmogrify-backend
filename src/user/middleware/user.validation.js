const joi = require("joi");




 

 

const schema = {
  roleCreate: joi.object({
      
    roleName: joi.string().min(2).required(),
    roleDescription: joi.string().min(2).required()
  }),

  updateRole: joi.object({
    roleName: joi.string().min(2).required(),
      
  }),

  profileUpdate: joi.object({
    firstName: joi.string().min(2).required(),
    lastName: joi.string().min(2).required(),
    dob: joi.string().min(2).required(),
    gender: joi.string().min(1).required(),
      
  }),
 
  
  
};

module.exports = schema;
 

 
