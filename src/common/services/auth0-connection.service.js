"use strict";
const axios = require("axios");

class AuthConnection {


  
  constructor() {
    this.baseUrl = process.env.AUTH0_API_BASE_URL;
    this.clientId = process.env.AUTH0_CLIENT_ID;
    this.clientSecret = process.env.AUTH0_CLIENT_SECRET;
  }
  
  async getAccessToken() {
    
   
    var options = {
      method: "POST",
      url: this.baseUrl + "/oauth/token",
      headers: {'Content-Type': 'application/json',"Accept-Encoding": "gzip,deflate,compress" },
      data: JSON.stringify({
        grant_type: "client_credentials",
        client_id: this.clientId,
        client_secret: this.clientSecret,
        audience: this.baseUrl + "/api/v2/",
      }),
    };

    return axios
      .request(options)
      .then((result) => {
        return {
          status: result.status,
          data: result.data,
        };
      })
      .catch((error) => {
         return {
          status: error.response.status,
          message: error.response.data.error_description,
        };
      });
  }
}

module.exports = new AuthConnection();
