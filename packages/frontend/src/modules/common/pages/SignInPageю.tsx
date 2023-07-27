import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import CustomInput from '../components/default.components/items/userInput';
import { useSignIn } from '../../hooks/user.hooks';
import Preloader from '../../utils/components/Preloader';
import { Button } from '../components/to-do.components/to-do.element/todoElement.styled';
import { APP_KEYS } from '../consts';
import { BackLink } from '../components/to-do.components/to-do.add/todoAdd.styled';

const LoginPage: React.FC = () => {
  const { mutateAsync, isLoading } = useSignIn();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const history = useHistory();

  if (isLoading) {
    return <Preloader />;
  }

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await mutateAsync({ email: values.email, password: values.password });

      history.push(APP_KEYS.ROUTER_KEYS.TODOS);
    } catch (error) {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
        <Form>
          <Field
            as={CustomInput}
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <ErrorMessage name="email" component="div" />

          <Field
            as={CustomInput}
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <ErrorMessage name="password" component="div" />

          <Button type="submit">Login</Button>
          <div>
            <BackLink to={APP_KEYS.ROUTER_KEYS.ROOT}>Back</BackLink>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
