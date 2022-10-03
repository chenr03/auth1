let database = require("../utils/database");
let jsonwebtoken = require("jsonwebtoken")

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

    let sql = 'INSERT INTO users (username, password_hash, full_name) VALUES (?, ?, ?)';
    let params = [username, passwordHash, fullName];

    database.query(sql, params, function(err){
        if(err){
            console.log('Failed to register', err)
            response.sendStatus(400);
        } else {
            response.sendStatus(200);

        }
    })


}

let login = function(request, response){
    let username = request.body.username
    let password = request.body.password

    let sql = "select full_name, password_hash from users where username = ?"
    let params = [username];

    // plain old callbacks
    database.query(sql, params, async function(err, rows){
        if(err){
            console.log('Could not get password hash', err);
            response.sendStatus(500); // my fault
        } else {
            if(rows.length > 1) {
                console.log("Returned too many rows for username ", username);
                response.sendStatus(500); // my fault
            } else if (rows.length === 0){
                console.log("Username is not Registered in System", err)
                response.sendStatus(400);
            } else {
                let pwHash = rows[0].password_hash;
                let fnName = rows[0].full_name;

                let pass = false;
                try {
                    pass = await argon2.verify(pwHash, password);
                } catch (err){
                    console.log("Failed to verify password", err);
                }
                if(pass){
                    let token = {
                        "fullName": fnName
                    };

                    // sign this token, and send the signed token back
                   let signedToken =  jsonwebtoken.sign(token, process.env.JSONWEBTOKEN_SECRET);
                      response.json(signedToken);
                } else {
                    response.sendStatus(400);
                }

            }
        }
    })
}

module.exports = {register, login};





