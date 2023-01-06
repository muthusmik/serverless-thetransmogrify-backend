var payloadChecker = require("payload-validator");

exports.validation = async (body, expectedPayload) => {
  let notEmptyFields = Object.keys(expectedPayload);

  let data = { statusCode: 200 };

  var result = payloadChecker.validator(
    body,
    expectedPayload,
    notEmptyFields,
    false
  );

  if (!result.success) {
    data = {
      statusCode: 400,
      message: result.response.errorMessage,
    };
  }

  return { data };
};
