import httpStatus from "http-status";
import { ILogInUser, IRefreshTokenResponse, IUserLoginResponse } from "./auth.interface"
import ApiError from "../../../errors/ApiErorr";
import { User } from "../user/user.model"; 
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from 'jsonwebtoken';

 
const loginUser = async(payload: ILogInUser) : Promise<IUserLoginResponse> => {
    const {id, password} = payload;

    //is user exist 
    const user = new User();  
    const isUserExist = await user.isUserExist(id); 

    if(!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does Not Exist")
    }

    // is pass match
    // const isPasswordMatched = await bcrypt.compare(password, isUserExist?.password);
    
    if(isUserExist?.password && !user.isPasswordMatched(password, isUserExist?.password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect")
    }

    // create JWT
    const {id: userId, role, needsPasswordChange} = isUserExist;

    const accessToken = jwtHelpers.createToken(
        {userId, role}, 
        config.jwt.jwt_secret as Secret, 
        config.jwt.jwt_expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
        { userId, role},
        config.jwt.jwt_refresh_token as Secret,
        config.jwt.jwt_secret_expires_in as string
    )
    
    return {
        accessToken,
        refreshToken,
        needsPasswordChange
    }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    let verifiedToken = null;
    try{
        verifiedToken = jwtHelpers.verifyToken(token, config.jwt.jwt_refresh_token as Secret)
    }
    catch(err){
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refreshed Token')
    }
    const {userId} = verifiedToken;
    const user = new User();
    const isUserExit = await user.isUserExist(userId);
    if(!isUserExit){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    //generate new token
    const newAccessToken = jwtHelpers.createToken(
        {
            id: isUserExit.id,
            role: isUserExit.role,
        },
        config.jwt.jwt_secret as Secret,
        config.jwt.jwt_expires_in as string,
    )
    return { 
        accessToken: newAccessToken
    }
}

export const AuthService = {
    loginUser,
    refreshToken
}

 