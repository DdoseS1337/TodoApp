import { v4 as uuidv4 } from 'uuid';
import { comparing, hashing } from '../utils/bcrypto';
import { IUser, IUserUpdate } from '../types/user.type';
import { User } from '../entities/User';

export class UserService {
  async findAll(): Promise<User[]> {
    return User.find();
  }

  async delete(id: string): Promise<User | null> {
    const deletedUser = await User.findOne({ where: { id } });
    if (deletedUser) {
      await User.delete(id);
      return deletedUser;
    }
    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  public async createUser({ username, password, email }: IUser) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      return {
        status: 400,
        data: null,
        error: null,
        message: 'User with this email already exists'
      };
    }

    const passwordHash = await hashing(password);
    const token = await hashing(uuidv4());

    const encodedToken = Buffer.from(token).toString('base64');

    const newUser = User.create({
      username,
      password: passwordHash,
      email,
      confirmationToken: token
    });
    await newUser.save();

    return {
      status: 200,
      data: { email, confirmationToken: encodedToken },
      error: null,
      message: 'User successfully registered'
    };
  }

  public async loginUser({ password, email }: IUser) {
    const existingUser = await this.findByEmail(email);
    if (!existingUser) {
      return {
        status: 400,
        data: null,
        error: null,
        message: 'User not exist'
      };
    }

    const passwordMatched = await comparing(password, existingUser.password);

    if (!passwordMatched) {
      return {
        status: 400,
        data: null,
        message: 'Invalid password or email'
      };
    }
    return {
      status: 200,
      data: null,
      error: null,
      message: 'User successfully login',
      id: existingUser.id
    };
  }

  public userLogout() {
    try {
      return {
        status: 200,
        data: null,
        error: null,
        message: 'User successfully logged out'
      };
    } catch (error) {
      return {
        status: 500,
        data: null,
        error: 'Server error',
        message: `We got this error ${error}`
      };
    }
  }

  public async changePassword(email: string, { oldPassword, newPassword }: IUserUpdate) {
    const user = await this.findByEmail(email);
    if (!user || user === null) {
      return {
        status: 404,
        data: null,
        error: null,
        message: 'User not found'
      };
    }

    const passwordMatched = await comparing(oldPassword, user.password);
    if (!passwordMatched) {
      return {
        status: 400,
        data: null,
        error: null,
        message: 'Invalid password'
      };
    }

    const passwordHash = await hashing(newPassword);
    const updatedUser = await User.update({ id: user.id }, { password: passwordHash });

    return {
      status: 200,
      data: updatedUser,
      error: null,
      message: 'Password changed successfully'
    };
  }

  public async requestResetPassword(email: string) {
    const user = await this.findByEmail(email);
    if (!user || user === null) {
      return {
        status: 404,
        data: null,
        error: null,
        message: 'User not found'
      };
    }

    const resetToken = await hashing(uuidv4());

    const encodedToken = Buffer.from(resetToken).toString('base64');

    user.resetPasswordToken = resetToken;
    await user.save();
    return {
      status: 200,
      data: { email: user.email, resetPasswordToken: encodedToken },
      error: null,
      message: 'Password reset token sent successfully'
    };
  }

  public async resetPassword(resetPasswordToken: string, newPassword: string) {
    const decodedToken = Buffer.from(resetPasswordToken, 'base64').toString('ascii');

    const user = await User.findOne({ where: { resetPasswordToken: decodedToken } });
    if (!user) {
      return {
        status: 404,
        data: null,
        error: null,
        message: 'User not found'
      };
    }
    const passwordHash = await hashing(newPassword);
    user.password = passwordHash;
    user.resetPasswordToken = '';
    await user.save();
    return {
      status: 200,
      data: null,
      error: null,
      message: 'Password change successfully'
    };
  }

  public async confirmEmail(confirmationToken: string) {
    try {
      const decodedToken1 = Buffer.from(confirmationToken, 'base64').toString('ascii');
      const user = await User.findOne({ where: { confirmationToken: decodedToken1 } });
      if (!user) {
        return {
          status: 404,
          data: null,
          error: 'User not found',
          message: 'User not found'
        };
      }

      user.isEmailConfirmed = true;
      user.confirmationToken = '';
      await user.save();

      return {
        status: 200,
        data: user,
        error: null,
        message: 'Email successfully confirmed'
      };
    } catch (error) {
      return {
        status: 400,
        data: null,
        error: 'Invalid confirmation token',
        message: 'Invalid confirmation token'
      };
    }
  }

  public async checkAuth() {
    return {
      status: 200,
      data: { isAuthenticated: true },
      error: null,
      message: 'Authentication succes'
    };
  }
}
