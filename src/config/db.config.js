require('dotenv/config');

module.exports = {
    
        development:{
           username : "postgres-admin",
          password: "redgistry-dev",
          database: "postgres",
          host: "52.206.80.247",
          dialect: "postgres"
        },
        test: {
          username: "postgres-admin",
          password: "redgistry-dev",
          database: "postgres",
          host: "52.206.80.247",
          dialect: "postgres"
        },
        production: {
          username: "postgres-admin",
          password: "redgistry-dev",
          database: "postgres",
          host: "52.206.80.247",
          dialect: "postgres"
        }
      
      
}