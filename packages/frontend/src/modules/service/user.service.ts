import { APP_KEYS } from '../common/consts';
import {
  IUser,
  IRequestUser,
  ConfirmEmailResponse,
  IUserWithToken
} from '../common/types/user.types';
import HttpService from './http.service';

export default class UserService extends HttpService {
  async getAllUsers(): Promise<IUser[]> {
    const response = await this.get({ url: `${APP_KEYS.BACKEND_KEYS.SERVER_URL}/user` });
    return response.data;
  }

  async getUserById(id: string): Promise<IUser | null> {
    const response = await this.get({ url: `${APP_KEYS.BACKEND_KEYS.SERVER_URL}/user/${id}` });
    return response.data;
  }

  async updateUserById(id: string, user: IRequestUser): Promise<IUser | null> {
    const response = await this.put({
      url: `${APP_KEYS.BACKEND_KEYS.SERVER_URL}/user/update${id}`,
      data: user
    });
    return response.data;
  }

  async deleteUserById(id: string): Promise<IUser | null> {
    const response = await this.delete({
      url: `${APP_KEYS.BACKEND_KEYS.SERVER_URL}/user/delete/${id}`,
      data: undefined
    });
    return response.data;
  }

  async checkAuth() {
    const response = await this.get({
      url: APP_KEYS.BACKEND_KEYS.USER_AUTH,
      data: undefined
    });
    return response.data;
  }

  async signUp(user: IRequestUser): Promise<IRequestUser> {
    const response = await this.post({
      url: APP_KEYS.BACKEND_KEYS.USER_SIGN_UP,
      data: user
    });
    return response.data;
  }

  async confirmEmail(confirmationToken: string): Promise<ConfirmEmailResponse> {
    const response = await this.post({
      url: `${APP_KEYS.BACKEND_KEYS.USER_CONFIRM_EMAIL}/${confirmationToken}`,
      data: undefined
    });
    return response.data;
  }

  async signIn(user: IUser): Promise<IUserWithToken> {
    const response = await this.post({
      url: APP_KEYS.BACKEND_KEYS.USER_SIGN_IN,
      data: user
    });
    return response.data;
  }

  async signOut(): Promise<ResponseType> {
    const response = await this.post({
      url: APP_KEYS.BACKEND_KEYS.USER_SIGN_OUT,
      data: undefined
    });
    return response.data;
  }

  async requestResetPassword(email: string): Promise<string> {
    const response = await this.post({
      url: APP_KEYS.BACKEND_KEYS.USER_REQ_RESET_PASS,
      data: {
        email
      }
    });
    return response.data;
  }

  async resetPassword(
    resetPasswordToken: string,
    newPassword: string
  ): Promise<{ resetPasswordToken: string; newPassword: string }> {
    const response = await this.post({
      url: `${APP_KEYS.BACKEND_KEYS.USER_RESET_PASS}/${resetPasswordToken}`,
      data: {
        newPassword
      }
    });
    return response.data;
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<ResponseType> {
    const response = await this.post({
      url: APP_KEYS.BACKEND_KEYS.USER_CHANGE_PASS,
      data: {
        oldPassword,
        newPassword
      }
    });
    return response.data;
  }
}
