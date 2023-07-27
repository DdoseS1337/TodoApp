import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRequestResetPassword } from '../../hooks/user.hooks';
import CustomInput from '../components/default.components/items/userInput';
import { Button } from '../components/to-do.components/to-do.element/todoElement.styled';
import { IRequestUserForgotPassword } from '../types/user.types';
import { BackLink } from '../components/to-do.components/to-do.add/todoAdd.styled';
import { APP_KEYS } from '../consts';

const ForgotPasswordRequestPage = () => {
  const requestResetPassword = useRequestResetPassword();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (values: IRequestUserForgotPassword) => {
    try {
      await requestResetPassword.mutateAsync(values.email);
      setMessage('Check your email for the reset password link.');
    } catch (error) {
      setMessage('Something went wrong. Please try again later');
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.email) {
            errors.email = 'Email is required';
          }

          return errors;
        }}
      >
        <Form>
          <Field
            label="Enter email to reset password"
            type="email"
            name="email"
            as={CustomInput}
            placeholder="Email"
          />
          <ErrorMessage name="email" component="div" />
          {message && <p>{message}</p>}
          <Button type="submit">Submit</Button>
          <div>
            <BackLink to={APP_KEYS.ROUTER_KEYS.ROOT}>Back</BackLink>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPasswordRequestPage;
