import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CustomInput from '../components/default.components/items/userInput';
import { useSignUp } from '../../hooks/user.hooks';
import { IRequestUser } from '../types/user.types';
import Preloader from '../../utils/components/Preloader';
import { Button } from '../components/to-do.components/to-do.element/todoElement.styled';
import { BackLink } from '../components/to-do.components/to-do.add/todoAdd.styled';
import { APP_KEYS } from '../consts';

const RegistrationPage: React.FC = () => {
  const { mutateAsync, isLoading } = useSignUp();
  const [message, setMessage] = useState<string | null>(null);

  if (isLoading) {
    return <Preloader />;
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  });

  const handleSubmit = async (values: IRequestUser) => {
    try {
      await mutateAsync(values);

      setMessage(
        'You have successfully signed up. Please check your email to verify your account.'
      );
    } catch (error) {
      setMessage('An error occurred while signing up. Please try again.');
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      {message && <p>{message}</p>}
      <Formik
        initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validate={(values) => {
          const errors: Record<string, string> = {};

          if (!values.username) {
            errors.username = 'Username is required';
          }

          if (!values.email) {
            errors.email = 'Email is required';
          }

          if (!values.password) {
            errors.password = 'Password is required';
          }

          if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
          }

          return errors;
        }}
      >
        <Form>
          <Field
            as={CustomInput}
            label="Username"
            type="text"
            name="username"
            placeholder="Enter your username"
          />
          <ErrorMessage name="username" component="div" />

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

          <Field
            as={CustomInput}
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
          />
          <ErrorMessage name="confirmPassword" component="div" />

          <Button type="submit">Register</Button>
          <div>
            <BackLink to={APP_KEYS.ROUTER_KEYS.ROOT}>Back</BackLink>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;
