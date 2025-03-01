const User= require('../../model/usersModel');


const getAllRequests = async (req,res)=>{
    const email = req.userEmail;
    
        try {
            const user = await User.findOne({email});
            const requestIds = user.receivedRequests;
            const requests = [];
            for(const requestId of requestIds){
                const request = await User.findById(requestId,{firstName:1, lastName:1, email:1, phoneNumber:1});
                if(request){
                    requests.push(request);
                }
            }
            res.status(200).json({requests});
        } catch (error){
            res.status(500).json({ message: 'Internal server error', error });
        }
}

module.exports = getAllRequests;