export interface IUser {
  id: string | null;
  role: string | null;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}
