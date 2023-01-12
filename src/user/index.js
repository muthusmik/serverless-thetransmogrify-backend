let userController = require("../user/controller/user.controller");
//let _ = require("lodash");
let jwt = require("../auth/middleware/auth.jwt");
const userValidation = require("./middleware/user.validation");
const redgidtryValidate = require("../shared/middleware/validate.middleware");
const constants = require("../common/constants.config");
const {
  profileUpdateValidation,
  updateRoleValidation,
  roleCreateValidation,
} = require("../user/validation/validation");

module.exports.createRole = async (event, context, callback) => {
  try {
    let token = event.headers.Authorization;
    let req = {
      token,
    };
    if (event.headers.Authorization) {
      let resu = await jwt.verifyJwt(req);

      req.body = JSON.parse(event.body);
      await roleCreateValidation(req.body);
      let category = await userController.roleCreate(req);

      callback(null, {
        statusCode: 200,
        headers:constants.headers,
        body: JSON.stringify(category),
      });
    } else {
      return callback("Unauthorized");
    }
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers:constants.headers,
      body: JSON.stringify(err),
    });
  }
};

module.exports.updateRole = async (event, context, callback) => {
  try {
    let token = event.headers.Authorization;
    let req = {
      token,
    };
    if (event.headers.Authorization) {
      let resu = await jwt.verifyJwt(req);

      req.body = JSON.parse(event.body);

      let valida = await updateRoleValidation(req.body);
      let category = await userController.updateUserRole(req);

      callback(null, {
        statusCode: 200,
        headers:constants.headers,
        body: JSON.stringify(category),
      });
    } else {
      return "unauthorized";
    }
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers:constants.headers,
      body: JSON.stringify(err),
    });
  }
};

module.exports.updateProfile = async (event, context, callback) => {
  try {
    let token = event.headers.Authorization;
    let req = {
      token,
    };
    if (event.headers.Authorization) {
      let resu = await jwt.verifyJwt(req);

      req.body = JSON.parse(event.body);
      await profileUpdateValidation(req.body);
      let category = await userController.profileUpdate(req);

      callback(null, {
        statusCode: 200,
        headers:constants.headers,
        body: JSON.stringify(category),
      });
    }
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers:constants.headers,
      body: JSON.stringify(err),
    });
  }
};

module.exports.getRoles = async (event, context, callback) => {
  try {
    let token = event.headers.Authorization;
    let req = {
      token,
    };
    if (event.headers.Authorization) {
      await jwt.verifyJwt(req);

      req.body = JSON.parse(event.body);
      let category = await userController.getRoles(req);
      console.log("testing working fine....", category);

      callback(null, {
        statusCode: 200,
        headers:constants.headers,
        body: JSON.stringify(category),
      });
    } else {
      return "unauthorized";
    }
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers:constants.headers,
      body: JSON.stringify(err),
    });
  }
};

module.exports.getProfile = async (event, context, callback) => {
  try {
    let token = event.headers.Authorization;
    let req = {
      token,
    };
    if (event.headers.Authorization) {
      await jwt.verifyJwt(req);

      req.body = JSON.parse(event.body);

      let category = await userController.getProfile(req);
      console.log("testing working fine....", category);

      callback(null, {
        statusCode: 200,
        headers:constants.headers,
        body: JSON.stringify(category),
      });
    } else {
      return "unauthorized";
    }
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers:constants.headers,
      body: JSON.stringify(err),
    });
  }
};

module.exports.getStates = async (event, context, callback) => {
  try {
    let category = await userController.getAllStates();

    callback(null, {
      statusCode: 200,
      headers:constants.headers,
      body: JSON.stringify(category),
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers:constants.headers,
      body: JSON.stringify(err),
    });
  }
};

module.exports.getCities = async (event, context, callback) => {
  try {
    let category = await userController.getAllCities();

    callback(null, {
      statusCode: 200,
      headers:constants.headers,
      body: JSON.stringify(category),
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers:constants.headers,
      body: JSON.stringify(err),
    });
  }
};

module.exports.getAcademicDetails = async (event, context, callback) => {
  try {
    let token = event.headers.Authorization;
    let req = {
      token,
    };
    if (event.headers.Authorization) {
      let jwtVerify = await jwt.verifyJwt(req);

      if (jwtVerify === false) {
        return "Unauthorized";
      }
      req.body = JSON.parse(event.body);

     

      let category = await userController.getAcademicDetails(req);
      console.log("testing working fine....", category);

      callback(null, {
        statusCode: 200,
        headers:constants.headers,
        body: JSON.stringify(category),
      });
    } else {
      return "unauthorizeds";
    }
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers:constants.headers,
      body: JSON.stringify(err),
    });
  }
};

 

module.exports.getCountries = async (event, context, callback) => {
  try {
    

        let category = await userController.getAllCountries();
 
      callback(null, {
        statusCode: 200,
        headers:constants.headers,
        body: JSON.stringify(category),
      });
     
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers:constants.headers,
      body: JSON.stringify(err),
    });
  }
};

module.exports.getUszips = async (event, context, callback) => {
  try {
    

        let category = await userController.getAllUszips();
 
      callback(null, {
        statusCode: 200,
        headers:constants.headers,
        body: JSON.stringify(category),
      });
     
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers:constants.headers,
      body: JSON.stringify(err),
    });
  }
};



module.exports.updateAcademicDetails = async (event, context, callback) => {
  try {
    let token = event.headers.Authorization;
    let req = {
      token,
    };
    if (event.headers.Authorization) {
    await jwt.verifyJwt(req);

      req.body = JSON.parse(event.body);
     // await profileUpdateValidation(req.body);
      let category = await userController.academicDetailsUpdate(req);

      callback(null, {
        statusCode: 200,
        headers:constants.headers,
        body: JSON.stringify(category),
      });
    }
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers:constants.headers,
      body: JSON.stringify(err),
    });
  }
};



