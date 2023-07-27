import React, { useState, useEffect } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  redirectTo,
  ...rest
}) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    setIsLoadingAuth(false);
  }, [isAuthenticated]);

  if (isLoadingAuth) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Route {...rest} />;
  }

  return <Redirect to={redirectTo} />;
};

export default ProtectedRoute;
