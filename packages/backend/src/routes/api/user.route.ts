import { Router } from 'express';
import { isUserExist } from '../../middlewares/isExist.middleware';
import { tryCatch } from '../../utils/tryCatch';
import userController from '../../controllers/user.contoller';
import { authenticate } from '../../middlewares/auth.middleware';

const userRouter: Router = Router();

userRouter.post('/sign-up', tryCatch(userController.signUp.bind(userController)));
userRouter.get('/', tryCatch(userController.getAllUsers.bind(userController)));
userRouter.post(
  '/email-confirm/:confirmationToken',
  tryCatch(userController.confirmEmail.bind(userController))
);
userRouter.delete(
  '/delete/:id',
  isUserExist,
  tryCatch(userController.deleteUser.bind(userController))
);
// Маршрут для входу користувача
userRouter.post('/sign-in', tryCatch(userController.signIn.bind(userController)));

userRouter.post('/sign-out', tryCatch(userController.signOut.bind(userController)));
// Маршрут для забуття пароля
userRouter.post(
  '/request-reset-password',
  tryCatch(userController.requestResetPassword.bind(userController))
);

// Маршрут для скидання пароля
userRouter.post(
  '/reset-password/:resetPasswordToken',
  tryCatch(userController.resetPassword.bind(userController))
);
userRouter.post(
  '/change-password',
  authenticate,
  tryCatch(userController.changePassword.bind(userController))
);

userRouter.get(
  '/check-auth',
  authenticate,
  tryCatch(userController.checkAuth.bind(userController))
);

export default userRouter;
