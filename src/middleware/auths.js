let jwt = require("jsonwebtoken");

let checkJWT = function(req, res, next){

    let headerValue = req.get("Authorization");
        if(headerValue){
            let parts = headerValue.split("")
            signedToken = parts[1];
        }

        if(!signedToken){
            console.log("Missing signed token");
            res.sendStatus(403);
            return;
        }
    // read the token from the request header

        // we are going to verify that the token is good
        // which means that is has not been messed with.

        // if the token is good,
        // then call the next function in the chain

        // if the token is bad,
        // then return an error code
        // potentially a 404 or 400.

    try {
        //this will either throw an error
        // or return the unsigned token
        let unsignedToken = jwt.verify(signedToken, process.env.JWT_SECRET);

        req.userInfo = unsignedToken;
        // the only way to get to this line, is if line 31 does not throw an error
    } catch(error){
        // the only way to get to this line, is if any code in the try block throws an error.
        console.log("failed to verify token", error);
        res.sendStatus(403);
        return;
    }

    //  this means this token was valid
    // because if no token was passed, the function would have quit at line 14
    // if the token passed in was bad, the function would have quit at line 37
    // so if I am here, that means I have a token, and it is good
    next();
}

module.exports = {checkJWT};