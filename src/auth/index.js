let AuthController = require('../auth/controller/auth.controller')
const responseService = require('../common/services/response.service');


 
//let _ = require("lodash");
module.exports.createUsers = async(event, context,callback) => {
    console.log("log",event.body);
    let body = JSON.parse(event.body);
   
    //let {categoryId} = body;
    try {
        let category = await AuthController.create(body);
        console.log("testing working fine",category);
        //if (_.get(category, 'success')){
            callback(null, {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                    "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization"
                },
                body: JSON.stringify(category)
            })
       // }
        //else throw "Unable to get category"
    }
    catch (err) {


        console.log('indesx error ',err)
        callback(null, {
            statusCode: err.statusCode || 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization"
            },
            body: JSON.stringify(err)
        })
    }
}



module.exports.login = async(event, context,callback) => {
    console.log("log",event.body);
    let body = JSON.parse(event.body);
   
    //let {categoryId} = body;
    try {
        let category = await AuthController.login(body);
        console.log("testing working fine",category);
        //if (_.get(category, 'success')){
            callback(null, {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                    "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization"
                },
                body: JSON.stringify(category)
            })
       // }
        //else throw "Unable to get category"
    }
    catch (err) {
        callback(null, {
            statusCode: err.statusCode || 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization"
            },
            body: JSON.stringify(err)
        })

         
    }
}

 

 
 


 