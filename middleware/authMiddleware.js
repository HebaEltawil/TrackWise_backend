const jwt = require('jsonwebtoken');
require('dotenv').config();
// const { isTokenBlacklisted } = require('../controller/tokenBlackList');
const BlacklistedToken = require('../model/blacklistedToken');

const extractFromToken =  async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(403).json({ message: ' Please login again.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userEmail = decoded.email; 
        req.verify = decoded.verify;
        req.exp = decoded.expiresIn;
        req.token = token;

        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token', error: error.message });
    }
};

module.exports = extractFromToken;



 // Format: "Bearer <token>"