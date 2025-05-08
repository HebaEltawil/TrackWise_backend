require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../model/adminModel');



const login = async (req,res) => {
    const {email, password}= req.body;
    try {
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: admin._id, email: admin.email, firstName: admin.firstName, lastName: admin.lastName},
            process.env.JWT_SECRET,
            { expiresIn: '2y' }
        );
        
        res.json({ message: 'Login successful!', token});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
    
};

module.exports = login;