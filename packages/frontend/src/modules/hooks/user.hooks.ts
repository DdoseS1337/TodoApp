import { useMutation, useQueryClient, useQuery } from 'react-query';
import { IUser, IRequestChangePassword, IRequestUser } from '../common/types/user.types';
import UserService from '../service/user.service';
import { APP_KEYS } from '../common/consts';

const userService = new UserService();

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation((user: IRequestUser) => userService.signUp(user), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });
}
export function useCheckAuth() {
  const { data, isLoading } = useQuery('checkAuth', () => userService.checkAuth(), {
    staleTime: 60000,
    cacheTime: 600000
  });
  return { isAuthenticated: data?.isAuthenticated, isLoading };
}

export function useConfirmEmail() {
  const queryClient = useQueryClient();

  return useMutation((confirmationToken: string) => userService.confirmEmail(confirmationToken), {
    onSuccess: (data) => {
      const accessToken = data.token;

      localStorage.setItem(APP_KEYS.STORAGE_KEYS.ACCESSTOKEN, accessToken);

      queryClient.invalidateQueries('checkAuth');
    }
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation((user: IUser) => userService.signIn(user), {
    onSuccess: (data) => {
      const accessToken = data.token;

      localStorage.setItem(APP_KEYS.STORAGE_KEYS.ACCESSTOKEN, accessToken);

      queryClient.invalidateQueries('checkAuth');
    }
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation(() => userService.signOut(), {
    onSuccess: () => {
      localStorage.removeItem(APP_KEYS.STORAGE_KEYS.ACCESSTOKEN);
      queryClient.invalidateQueries('checkAuth');
    }
  });
}

export function useRequestResetPassword() {
  return useMutation((email: string) => userService.requestResetPassword(email));
}

export function useResetPassword() {
  return useMutation(
    ({ resetPasswordToken, newPassword }: { resetPasswordToken: string; newPassword: string }) =>
      userService.resetPassword(resetPasswordToken, newPassword)
  );
}

export function useChangePassword() {
  return useMutation(({ oldPassword, newPassword }: IRequestChangePassword) =>
    userService.changePassword(oldPassword, newPassword)
  );
}
