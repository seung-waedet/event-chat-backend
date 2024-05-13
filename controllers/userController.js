const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const createUser = async (req, res) => {
        try {
          const newUser = new UserModel(req.body);
          await newUser.save();
          res.status(201).json(newUser);
        } catch (err) {
          if (err.code === 11000 && err.keyValue.email) { // Handle duplicate email error
            return res.status(400).json({ message: "Email already exists" });
          }
          console.error(err);
          res.status(500).json({ message: "Error creating user" });
        }
      };

const signUp = async (req, res) => {
    try {
        const { displayName, email, password, displayImage, bio, userType } = req.body;

        // Check if email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new UserModel({
            displayName,
            email,
            password,
            displayImage,
            bio,
            userType
        });

        await newUser.save();


        res.status(201).json({ 
            message: 'User created successfully',
             token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}


const Login = async (req, res) => {
    try {
        const userFromRequest = req.body
    
        const user = await UserModel.findOne({
            email: userFromRequest.email,
        });
    
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            }) 
        }
    
        const validPassword = await user.isValidPassword(userFromRequest.password)
    
        if (!validPassword) {
            return res.status(422).json({
                message: 'Email or password is not correct',
            }) 
        }
    
        const token = await jwt.sign({ email: user.email, _id: user._id, userType: user.userType}, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' })
    
        return res.status(200).json({
            message: 'Login successful',
            token
        })
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: 'Server Error',
            data: null
        })
    }
}


module.exports = {
    signUp,
    createUser,
    Login
}