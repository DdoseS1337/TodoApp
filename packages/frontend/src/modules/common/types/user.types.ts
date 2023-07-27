export interface IUser {
  email: string;
  password: string;
}

export interface IRequestUser {
  username: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IRequestUserForgotPassword {
  email: string;
}

export interface IRequestUserResetPassword {
  newPassword: string;
}
export interface IRequestChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface ConfirmEmailResponse {
  message: string;
  status: number;
  token: string;
}

export interface IUserWithToken {
  email: string;
  password: string;
  token: string;
}

export interface ParamsType {
  search?: string;
  isCompleted?: boolean;
  isPublic?: boolean;
  page?: number;
  pageSize?: number;
}
