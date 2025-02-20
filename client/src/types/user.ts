export interface IUser {
  id: string | null;
  role: string | null;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export interface IUserData {
  id: string;
  first_name: string;
  email: string;
  role: string;
  address: string;
  phone_number: string;
}
