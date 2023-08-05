import {  Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user.interface"; 
import bcrypt from "bcrypt";
import config from "../../../config";


const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    role: { 
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,   
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    student:{
        type: Schema.Types.ObjectId,
        ref: 'Student',
    },
    faculty:{
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
    }, 
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    },

},
{
    timestamps: true
}
)

userSchema.methods.isUserExist = async function(id: string): Promise<IUser | null>{
    return await User.findOne(
        {id: id}, 
        {id: 1, password: 1, role:1, needsPasswordChange: 1}
    )
}

userSchema.methods.isPasswordMatched = async(password: string, existPassword: string ): Promise<boolean> =>{
    return await bcrypt.compare(password, existPassword);
}

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round));
    next();
})
export const User = model<IUser, UserModel>('User', userSchema);