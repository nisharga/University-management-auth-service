import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";
import { IRefreshTokenResponse } from "./auth.interface";


const loginUser = catchAsync(async(req: Request, res: Response) => {
   const {...loginData} = req.body;
   const result = await AuthService.loginUser(loginData);

   // set Refresh token into cookie
   const {refreshToken, ...others} = result;

   const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
   }

   res.cookie('refreshToken', refreshToken, cookieOptions)
   
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user Login successfully",
    data: others
    }) 
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
  
    const result = await AuthService.refreshToken(refreshToken);
  
    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
  
    res.cookie('refreshToken', refreshToken, cookieOptions);
  
    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully !',
      data: result,
    });
  });

export const AuthController = {
    loginUser,
    refreshToken
}