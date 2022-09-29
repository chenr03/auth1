
let express = require("express");

let router = express.Router();

let authController = require("../controllers/authController");

// unprotected register route
router.post("/register", authController.register);

// unprotected login route
router.post("/login", authController.login);

