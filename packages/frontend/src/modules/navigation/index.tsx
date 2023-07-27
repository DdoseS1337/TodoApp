import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../home/HomePage';
import { APP_KEYS } from '../common/consts';
import { NotFound } from '../common/pages/NotFound';
import TodoContainer from '../common/components/to-do.components/to-do.container/TodoContainer';
import TodoViewer from '../common/components/to-do.components/to-do.viewer/TodoViewer';
import TodoAdd from '../common/components/to-do.components/to-do.add/TodoAdd';
import TodoEdit from '../common/components/to-do.components/to-do.edit/TodoEdit';
import RegistrationPage from '../common/pages/SignUpPage';
import EmailVerificationPage from '../common/pages/ConfirmEmailPage';
import LoginPage from '../common/pages/SignInPageю';
import ForgotPasswordRequestPage from '../common/pages/ForgotPasswordRequestPage';
import ResetPasswordPage from '../common/pages/ResetPasswordPage';
import UserProfile from '../common/pages/UserProfile';
import ChangePasswordPage from '../common/pages/ChangePasswordPage';
import ProtectedRoute from '../utils/ProtectedRoute';
import { useCheckAuth } from '../hooks/user.hooks';
import Preloader from '../utils/components/Preloader';
import LogoutPage from '../common/pages/LogoutPage';

export const MainRouter = () => {
  const { isAuthenticated, isLoading } = useCheckAuth();

  if (isLoading) {
    return <Preloader />;
  }
  return (
    <Router>
      <Switch>
        <ProtectedRoute
          component={LogoutPage}
          path={APP_KEYS.ROUTER_KEYS.USER_LOGOUT}
          isAuthenticated={isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.ROOT}
        />
        <ProtectedRoute
          component={HomePage}
          exact
          path={APP_KEYS.ROUTER_KEYS.ROOT}
          isAuthenticated={!isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.TODOS}
        />
        <ProtectedRoute
          component={RegistrationPage}
          exact
          path={APP_KEYS.ROUTER_KEYS.USER_SIGN_UP}
          isAuthenticated={!isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.TODOS}
        />
        <ProtectedRoute
          component={EmailVerificationPage}
          exact
          path={APP_KEYS.ROUTER_KEYS.USER_CONFIRM_EMAIL}
          isAuthenticated={!isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.TODOS}
        />
        <ProtectedRoute
          component={LoginPage}
          exact
          path={APP_KEYS.ROUTER_KEYS.USER_SIGN_IN}
          isAuthenticated={!isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.TODOS}
        />
        <ProtectedRoute
          component={ForgotPasswordRequestPage}
          exact
          path={APP_KEYS.ROUTER_KEYS.USER_PASSWORD_REQUEST}
          isAuthenticated={!isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.TODOS}
        />
        <ProtectedRoute
          component={ResetPasswordPage}
          exact
          path={APP_KEYS.ROUTER_KEYS.USER_RESET_PASSWORD}
          isAuthenticated={!isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.TODOS}
        />
        <ProtectedRoute
          component={UserProfile}
          exact
          path={APP_KEYS.ROUTER_KEYS.USER_PROFILE}
          isAuthenticated={isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.USER_SIGN_IN}
        />
        <ProtectedRoute
          component={ChangePasswordPage}
          exact
          path={APP_KEYS.ROUTER_KEYS.USER_CHANGE_PASSWORD}
          isAuthenticated={isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.USER_SIGN_IN}
        />
        <ProtectedRoute
          component={TodoContainer}
          exact
          path={APP_KEYS.ROUTER_KEYS.TODOS}
          isAuthenticated={isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.USER_SIGN_IN}
        />

        <ProtectedRoute
          component={TodoViewer}
          exact
          path={APP_KEYS.ROUTER_KEYS.TODO}
          isAuthenticated={isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.USER_SIGN_IN}
        />

        <ProtectedRoute
          component={TodoAdd}
          exact
          path={APP_KEYS.ROUTER_KEYS.TODOADD}
          isAuthenticated={isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.USER_SIGN_IN}
        />

        <ProtectedRoute
          component={TodoEdit}
          exact
          path={APP_KEYS.ROUTER_KEYS.TODOEDIT}
          isAuthenticated={isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.USER_SIGN_IN}
        />

        <ProtectedRoute
          component={TodoEdit}
          exact
          path={APP_KEYS.ROUTER_KEYS.TODOEDIT}
          isAuthenticated={isAuthenticated}
          redirectTo={APP_KEYS.ROUTER_KEYS.USER_SIGN_IN}
        />

        <Route component={NotFound} exact path={APP_KEYS.ROUTER_KEYS.NotFound} />
      </Switch>
    </Router>
  );
};
