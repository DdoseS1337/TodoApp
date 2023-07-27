import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useChangePassword } from '../../hooks/user.hooks';
import CustomInput from '../components/default.components/items/userInput';
import { Button } from '../components/to-do.components/to-do.element/todoElement.styled';
import { IRequestChangePassword } from '../types/user.types';
import { APP_KEYS } from '../consts';
import { BackLink } from '../components/to-do.components/to-do.add/todoAdd.styled';

const ChangePasswordPage = () => {
  const history = useHistory();
  const changePassword = useChangePassword();
  const [message, setMessage] = useState<string | null>(null);

  const handleChangePassword = async (values: IRequestChangePassword) => {
    try {
      await changePassword.mutateAsync({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
      });

      history.push(APP_KEYS.ROUTER_KEYS.USER_PROFILE);
    } catch (error) {
      setMessage('Something went wrong. Please try again later');
    }
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('New Password is required')
  });

  return (
    <div>
      <h1>Change Password</h1>
      {message && <p>{message}</p>}
      <Formik
        initialValues={{ oldPassword: '', newPassword: '' }}
        onSubmit={handleChangePassword}
        validationSchema={validationSchema}
      >
        <Form>
          <Field
            label="Old password"
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            as={CustomInput}
          />
          <ErrorMessage name="oldPassword" component="div" />

          <Field
            label="New password"
            type="password"
            name="newPassword"
            placeholder="New Password"
            as={CustomInput}
          />
          <ErrorMessage name="newPassword" component="div" />

          <Button type="submit">Change Password</Button>

          <div>
            <BackLink to={APP_KEYS.ROUTER_KEYS.USER_PROFILE}>Back</BackLink>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePasswordPage;
