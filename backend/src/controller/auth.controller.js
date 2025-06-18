import {User} from '../models/user.model.js';

export const authController = async (req,res,next) =>{
    try {
        const {id,firstName , lastName , imgUrl,} = req.body;

        const user = await User.findOne({clerkID:id });

        if(!user){
            await User.create({
                clerkID:id,
                fullName : `${firstName} ${lastName}`,
                imageUrl
            })
        }
        
        res.status(200).json({Success:true});
    } catch (error) {
        console.log("Error in Connection " , error);
        next(error)
        
    }
};