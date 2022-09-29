let database = require("../utils/database");

// this will help us with storing the password hash and checking it

let argon2 = require("argon2");


// we expect in the body an object that contains the username and password and full name
// { "username" : "chenry", "password": "Chrisisawesome!!", "fullName": "Chris Henry" }


let register = async function(request, response){

    let username = request.body.username;
    let password = request.body.password;
    let fullName = request.body.fullName;

    let passwordHash;
    try{
        passwordHash = await argon2.hash(password);
    } catch(err){
        console.log(err);
        response.sendStatus(500); // something went wrong when attempting to hash on the server side
        return;
    }

    let sql = "INSERT INTO USERS (username, password_hash, full_name) VALUES (?, ?, ?)"
    let params = [username, passwordHash, fullName];

    try {
        let results = await database.queryPromise(sql, params);
        response.sendStatus(200);
    } catch(err){
        console.log(err);
        response.sendStatus(500); // something went wrong when attempting to add the user to the database
    }

}

let login = function(request, response){

}

module.exports = {register, login};