const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

require('dotenv').config()

const jwt_secret = process.env.JWT_SECRET


const bearerTokenAuth = async (req, res, next) => {
    try {
    const authHeader = req.headers;

    if (!authHeader.authorization) {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }

    const token = authHeader.authorization.split(' ')[1]; // bearer tokenvalue

    const decoded =  await jwt.verify(token, jwt_secret)

    const user = await UserModel.findOne({ _id: decoded._id })
    
    
    if (!user) {
        console.log(user)
        return res.status(401).json({
            message: "Unauthorized",
        })
    }

    req.user = user;

    next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Unauthorized",
        })
    }
}


const checkAdmin = (req, res, next) => {
    if (req.user.userType !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized!' });
    }

    next()
}


module.exports = {
    bearerTokenAuth
}