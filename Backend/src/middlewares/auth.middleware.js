// Removed unused prompt-async import
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function authUser(req, res, next) {
    // Try to get token from cookies first
    let token = req.cookies.token;
    
    // If no cookie token, try Authorization header
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized - No token provided!"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select("-password");
        
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized - User not found!"
            })
        }
        
        req.user = user;
        next();

    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({
            message: "Unauthorized - Invalid token!"
        })
    }
}

module.exports = {authUser}