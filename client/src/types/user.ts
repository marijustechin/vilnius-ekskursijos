export interface IUser {
  id: string;
  first_name: string;
  email: string;
  role: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
