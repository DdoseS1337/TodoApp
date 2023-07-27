import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { createAndSendJWToken } from '../utils/jwt';
import { EmailService } from '../services/email.service';
import { FRONTEND_ROUTER_KEYS } from '../consts/app.keys.consts';
import { IUser } from '../types/user.type';

class UserController {
  constructor(private userService: UserService, private emailService: EmailService) {}

  async getAllUsers(_: Request, res: Response) {
    // Отримати всіx users
    const users = await this.userService.findAll();
    res.json(users);
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    // Видалити user за ідентифікатором
    const deletedTodo = await this.userService.delete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedTodo);
  }

  public async signUp(req: Request, res: Response): Promise<Response> {
    const { data, status, message, error } = await this.userService.createUser(req.body);
    if (data?.email) {
      const confirmEmailUrl = `${process.env.FRONT_SERVER}${FRONTEND_ROUTER_KEYS.VERIFICATE_TOKEN}/${data.confirmationToken}`;
      await this.emailService.sendEmail(
        data.email,
        'Confirm Your Email',
        `Please use this link to confirm your email: ${confirmEmailUrl}`
      );
    }
    return res.status(status).json({
      error,
      data,
      message
    });
  }

  public async confirmEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { confirmationToken } = req.params;
      const { data, status, message, error } = await this.userService.confirmEmail(
        confirmationToken
      );
      let token: string | undefined;
      if (data) {
        token = createAndSendJWToken(data.id, res);
      }
      return res.status(status).json({
        error,
        data,
        message,
        token
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error',
        data: null,
        message: 'Failed to confirm email'
      });
    }
  }

  public async signIn(req: Request, res: Response): Promise<Response> {
    const { data, status, message, error, id } = await this.userService.loginUser({ ...req.body });
    let token: string | undefined;
    if (id) {
      token = createAndSendJWToken(id, res);
    }

    return res.status(status).json({
      error,
      data,
      message,
      token
    });
  }

  public async signOut(req: Request, res: Response): Promise<Response> {
    const { data, status, message, error } = await this.userService.userLogout();
    const cookieOptions = {
      expires: new Date(0),
      httpOnly: true
    };

    res.cookie('jwt', '', cookieOptions);

    return res.status(status).json({
      error,
      data,
      message
    });
  }

  public async requestResetPassword(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const { data, status, message, error } = await this.userService.requestResetPassword(email);
    if (data) {
      const resetPassURL = `${process.env.FRONT_SERVER}${FRONTEND_ROUTER_KEYS.RESET_TOKEN}/${data.resetPasswordToken}`;
      await this.emailService.sendEmail(
        data.email,
        'Forget password?',
        `Not problem, use this link to make new password: ${resetPassURL}`
      );
    }
    return res.status(status).json({
      error,
      data,
      message
    });
  }

  public async resetPassword(req: Request, res: Response): Promise<Response> {
    const { resetPasswordToken } = req.params;
    const { newPassword } = req.body;
    const { data, status, message, error } = await this.userService.resetPassword(
      resetPasswordToken,
      newPassword
    );
    return res.status(status).json({
      error,
      data,
      message
    });
  }

  public async changePassword(req: Request, res: Response): Promise<Response> {
    const authenticatedUser = req.user as IUser;
    const { data, status, message, error } = await this.userService.changePassword(
      authenticatedUser.email,
      {
        ...req.body
      }
    );
    return res.status(status).json({
      error,
      data,
      message
    });
  }

  async checkAuth(req: Request, res: Response) {
    const { data, status, message, error } = await this.userService.checkAuth();
    return res.status(status).json({
      error,
      data,
      message
    });
  }
}

const userController = new UserController(new UserService(), new EmailService());
export default userController;
