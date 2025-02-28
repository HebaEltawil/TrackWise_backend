const jwt = require('jsonwebtoken');
require('dotenv').config();

const extractEmailFromToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userEmail = decoded.email; // Attach the email to the request object
        // req.userFirstName = decoded.firstName;
        // req.userPhone = decoded.phoneNumber;
        // req.userLastName = decoded.lastName;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token', error: error.message });
    }
};

module.exports = extractEmailFromToken;