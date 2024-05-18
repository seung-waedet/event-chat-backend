const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController")
const {userSchema, loginSchema, patchUserSchema, userIdParamSchema} = require("../validations/userValidator")
const  validate  = require("../middlewares/validate")
const { bearerTokenAuth, checkAdmin} = require("../middlewares/auth")

require('dotenv').config();


userRoute.post( "/signup", validate(userSchema), userController.signUp);

userRoute.post( "/users", validate(userSchema), bearerTokenAuth, checkAdmin,  userController.createUser);

userRoute.post("/login", validate(loginSchema), userController.Login);

userRoute.get( "/users", bearerTokenAuth, checkAdmin, userController.getUsers);

userRoute.get( "/users/:id", bearerTokenAuth, checkAdmin, userController.getUserById);

userRoute.patch( "/users/:id", validate(patchUserSchema), bearerTokenAuth, checkAdmin, userController.updateUserById);

userRoute.delete( "/users/:id", bearerTokenAuth, checkAdmin, userController.deleteUserById);



module.exports = userRoute;
