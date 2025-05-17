const User= require('../../model/usersModel');

const findUserByEmail = async (req,res)=>{
    const userEmail = req.userEmail;
    const {email} = req.body;
    if(!email){
        return res.status(400).json({ message: 'Email is required' });
    }
    try {

        const user = await User.find({ 
            $and: [
                { email: { $regex: email, $options: 'i' } },
                { email: { $ne: userEmail } }
            ]
        },
        {firstName:1, lastName:1, email:1, phoneNumber:1}).limit(1).lean();
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
module.exports = findUserByEmail;