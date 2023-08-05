export type ILogInUser = {
    id: string;
    password: string;
}
export type IUserLoginResponse = {
    accessToken: string;
    refreshToken?: string;
    needPasswordChange: boolean | undefined;
}
export type IRefreshTokenResponse = {
    accessToken: string;
};
