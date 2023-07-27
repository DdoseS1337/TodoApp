import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useResetPassword } from '../../hooks/user.hooks';
import { Button } from '../components/to-do.components/to-do.element/todoElement.styled';
import CustomInput from '../components/default.components/items/userInput';
import { IRequestUserResetPassword } from '../types/user.types';
import { APP_KEYS } from '../consts';

const ResetPasswordPage = () => {
  const { id } = useParams<{ id: string }>();
  const resetPassword = useResetPassword();
  const [message, setMessage] = useState<string | null>(null);
  const history = useHistory();

  const handleSubmit = async (values: IRequestUserResetPassword) => {
    try {
      await resetPassword.mutateAsync({
        resetPasswordToken: id,
        newPassword: values.newPassword
      });
      setMessage('Password reset successful. You can now login with your new password.');
      setTimeout(() => {
        history.push(APP_KEYS.ROUTER_KEYS.ROOT);
      }, 5000);
    } catch (error) {
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {message && <p>{message}</p>}
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.newPassword) {
            errors.newPassword = 'Password is required';
          }
          return errors;
        }}
      >
        {() => (
          <Form>
            <Field
              label="Enter new password"
              type="password"
              name="newPassword"
              as={CustomInput}
              placeholder="newPassword"
            />
            <ErrorMessage name="password" component="div" />

            <Button type="submit">Reset Password</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordPage;
