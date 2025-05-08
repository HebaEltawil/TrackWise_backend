const bcrypt = require('bcrypt');
const Admin = require('../../model/adminModel');

const createAdmin = async (req, res)=> {
    const { firstName, lastName, email, password } = req.body;

    try {
            const existing = await Admin.findOne({ email });
            if(existing){
                return res.status(400).json({ message: 'Admin with this email already exists.' });
            }
            const hashedPass = await bcrypt.hash(password, 10);
            const admin = new Admin({firstName, lastName, email, password: hashedPass});
            await admin.save();
            res.status(200).json({ message: 'Admin created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
    
    
}

module.exports = createAdmin;
