const User= require('../../model/usersModel');

const findUserByEmail = async (req,res)=>{
    const {email} = req.body;
    if(!email){
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const user = await User.findOne({ email },{firstName:1, lastName:1, email:1, phoneNumber:1});
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
module.exports = findUserByEmail;