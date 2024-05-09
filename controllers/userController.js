const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

require('dotenv').config()


const signUp = async (req, res) => {
    try {
        const userFromRequest = req.body

        const existingUser = await UserModel.findOne({
            email: userFromRequest.email
        });
    
        if (existingUser) {
            return res.status(409).json({
                message: 'User already created',
            })
        }
    
        const user = await UserModel.create({
            first_name: userFromRequest.first_name,
            last_name: userFromRequest.last_name,
            username: userFromRequest.username,
            password: userFromRequest.password,
            email: userFromRequest.email,
        });
        
        return res.status(201).json({
            message: 'User created successfully',
        }) 
        
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            data: null
        })
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
    
        const token = await jwt.sign({ email: user.email, _id: user._id}, 
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
    Login
}