 import { Request, Response } from 'express';
import { createUser } from './user.service';
 
export const createUserController = async ( req: Request, res: Response) => {
    try{
        const {user} = req.body;
        const result = await createUser(user);
        res.json().json({
            sucess: true,
            message: "User Created Sucessfully",
            data: result
        })
    } catch(err){
        res.status(400).json({
            sucess: false,
            message: "Faild To Create User"
        })
    }
}