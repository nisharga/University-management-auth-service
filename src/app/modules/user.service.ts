import { IUser } from "./user.interface";
import { User } from "./user.model";
import config from "../../config/index"; 
import { generateUserId } from "./user.utlis";


export const createUser = async(user: IUser): Promise<IUser | null> => {

    const id = await generateUserId();
    user.id = id;
    
   if(!user.password){
    user.password = config.default_student_pass as string
   }
   
    const createdUser = await User.create(user);
    if(!createdUser) {
        throw new Error("Faild To Create User")
    }
    return createdUser;
}

 