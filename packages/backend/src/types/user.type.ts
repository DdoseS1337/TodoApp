export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserUpdate {
  oldPassword: string;
  newPassword: string;
}
