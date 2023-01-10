const joi = require("joi");




 

 

const schema = {
  roleCreate: joi.object({
      
    roleName: joi.string().required(),
    roleDescription: joi.string().required()
  }),

  updateRole: joi.object({
    roleName: joi.string().required(),
      
  }),

  profileUpdate: joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    dob: joi.string().required(),
    gender: joi.string().required(),
      
  }),
 
  
  
};

module.exports = schema;
 

 
