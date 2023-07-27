import React from 'react';
import { Button } from '../components/to-do.components/to-do.element/todoElement.styled';

const LogoutPage = () => {
  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div>
      <h1>Ви успішно вийшли з профілю!</h1>
      <Button onClick={handleLogout}>Перейти на головну сторінку</Button>
    </div>
  );
};

export default LogoutPage;
