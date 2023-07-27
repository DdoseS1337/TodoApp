import React from 'react';
import { useHistory } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import { ButtonContainer, HomeButton } from './HomePage.styled';

const HomePage = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Home Page</h1>
      <ButtonContainer>
        <div>
          <HomeButton onClick={() => history.push(APP_KEYS.ROUTER_KEYS.USER_SIGN_UP)}>
            Register
          </HomeButton>
        </div>
        <div>
          <HomeButton onClick={() => history.push(APP_KEYS.ROUTER_KEYS.USER_SIGN_IN)}>
            Login
          </HomeButton>
        </div>
        <div>
          <HomeButton onClick={() => history.push(APP_KEYS.ROUTER_KEYS.USER_PASSWORD_REQUEST)}>
            Forgot password
          </HomeButton>
        </div>
      </ButtonContainer>
    </div>
  );
};

export default HomePage;
