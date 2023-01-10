let AuthController = require("../auth/controller/auth.controller");
const responseService = require("../common/services/response.service");
let jwt = require("../auth/middleware/auth.jwt");

const { addUserCreateValidation,verifyOtpValidation,resendOtpValidation,changePasswordValidation } = require("../auth/validation/validation");

module.exports.createUsers = async (event, context, callback) => {
  let body = JSON.parse(event.body);

  try {
   await addUserCreateValidation(body);

    let category = await AuthController.create(body);

    console.log("testing working fine", category);
    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
      body: JSON.stringify(category),
    });
  } catch (err) {
    console.log("indesx error ", err);
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
      body: JSON.stringify(err),
    });
  }
};

module.exports.login = async (event, context, callback) => {
  let body = JSON.parse(event.body);

  try {
    await addUserCreateValidation(body);

    let category = await AuthController.login(body);
    console.log("testing working fine", category);

    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
      body: JSON.stringify(category),
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
      body: JSON.stringify(err),
    });
  }
};

module.exports.changePassword = async (event, context, callback) => {
  try {


    let token = event.headers.Authorization;
    let req = {
      token,
    };
    if (event.headers.Authorization) {
      await jwt.verifyJwt(req);

      req.body = JSON.parse(event.body);
      await changePasswordValidation(req.body)
      let category = await AuthController.changePassword(req);
     

      callback(null, {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        },
        body: JSON.stringify(category),
      });
    } else {
      return "unauthorized";
    }
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
      body: JSON.stringify(err),
    });
  }
};

module.exports.verifyOtp = async (event, context, callback) => {
  let body = JSON.parse(event.body);

  try {
  await verifyOtpValidation(body)

 
    let category = await AuthController.otpVerification(body);
    console.log("testing working fine", category);

    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
      body: JSON.stringify(category),
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
      body: JSON.stringify(err),
    });
  }
};

module.exports.resendOtp = async (event, context, callback) => {
  let body = JSON.parse(event.body);

  try {

    await resendOtpValidation(body);
    let category = await AuthController.resendOtp(body);

    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
      body: JSON.stringify(category),
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
      body: JSON.stringify(err),
    });
  }
};

module.exports.forgotPassword = async (event, context, callback) => {
  let body = JSON.parse(event.body);

  try {

    await resendOtpValidation(body);
    let category = await AuthController.resendOtp(body);

    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
      body: JSON.stringify(category),
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
      body: JSON.stringify(err),
    });
  }
};

module.exports.logOut = async (event, context, callback) => {
  try {
    let token = event.headers.Authorization;
    let req = {
      token,
    };
    if (event.headers.Authorization) {
      let resu = await jwt.verifyJwt(req);

      req.body = JSON.parse(event.body);

      let category = await AuthController.logOut(req);
      console.log("testing working fine", category);

      callback(null, {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        },
        body: JSON.stringify(category),
      });
    } else {
      return "unauthorized";
    }
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
      body: JSON.stringify(err),
    });
  }
};
