
let express = require("express");

let router = express.Router();

let authController = require("../controllers/authController");

// unprotected register route - everyone can gain access to this
router.post("/register", authController.register);

// unprotected login route - everyone has access to this, in order to login
router.post("/login", authController.login);

module.exports = router;

