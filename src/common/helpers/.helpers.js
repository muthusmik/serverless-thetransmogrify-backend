const isEmail = (email) => {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  
     
    return regex.test(email);
  };
  exports.isEmail = isEmail;

 
  
  const isMobileNumber = (mobileNumber) => {
    const regex = /^[0]?[6789]\d{9}$/;
    return regex.test(mobileNumber);
  };
  exports.isMobileNumber = isMobileNumber;

  
  const isPassword = (email) => {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/;
    return regex.test(email);
  };
  exports.isPassword = isPassword;
