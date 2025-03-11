const jwt = require('jsonwebtoken');
require('dotenv').config();

const extractFromToken = (req, res, next) => {
    const token = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userEmail = decoded.email; 
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token', error: error.message });
    }
};

module.exports = extractFromToken;