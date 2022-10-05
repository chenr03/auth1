let express = require("express");

let router = express.Router();
//
// let authController = require("../controllers/authController")


// ANYONE can get to this one, you don't need to have a valid token
// GET /hello - everyone has access to this.
// router.post("/hello", authController.hello)
//
// // GET /privateHello - requires authentication and returns a special message that includes your first name
//
// router.post("/privateHello", authController.privateHello)

let messageController = require("../controllers/messageController")

let auths = require("../middleware/auths");


// GET /hello
router.get("/hello", messageController.hello)
// only requests that a valid token is allowed in


// GET /private hello
router.get("/privateHello", auths.checkJWT, messageController.privateHello);
    // if logged in, do stuff
    // if not fail



module.exports = router;


