import { IUser } from "./user.interface";
import { User } from "./user.model";
import config from "../../../config/index"; 
import { generateUserId } from "./user.utlis";
import ApiError from "../../../errors/ApiErorr";


const createUser = async(user: IUser): Promise<IUser | null> => {

    const id = await generateUserId();
    user.id = id;
    
   if(!user.password){
    user.password = config.default_student_pass as string
   }
   
    const createdUser = await User.create(user);
    if(!createdUser) {
        throw new ApiError(400, "Faild To Create new User...")
    }
    return createdUser;
}

export const UserService = {
    createUser
}

 