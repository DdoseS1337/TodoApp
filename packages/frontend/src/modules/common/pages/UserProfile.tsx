import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSignOut } from '../../hooks/user.hooks';
import { Button } from '../components/to-do.components/to-do.element/todoElement.styled';
import { APP_KEYS } from '../consts';
import { BackLink } from '../components/to-do.components/to-do.add/todoAdd.styled';

const UserProfile = () => {
  const history = useHistory();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    try {
      await signOut.mutateAsync();
      history.push(APP_KEYS.ROUTER_KEYS.USER_LOGOUT);
    } catch (error) {
      history.push(APP_KEYS.ROUTER_KEYS.ROOT);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <Button onClick={handleSignOut}>Log out</Button>
      <Button onClick={() => history.push(APP_KEYS.ROUTER_KEYS.USER_CHANGE_PASSWORD)}>
        Change password
      </Button>
      <div>
        <BackLink to={APP_KEYS.ROUTER_KEYS.TODOS}>Back</BackLink>
      </div>
    </div>
  );
};

export default UserProfile;
