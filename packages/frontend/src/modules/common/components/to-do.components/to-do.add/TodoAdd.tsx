import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useCreateTodo } from '../../../../hooks/to-do.hooks';
import { StyledForm, CreateButton, BackLink } from './todoAdd.styled';
import Input from '../../default.components/items/input';
import { APP_KEYS } from '../../../consts';

const AddTodoForm = () => {
  const createTodo = useCreateTodo();
  const history = useHistory();

  const initialValues = {
    title: '',
    description: '',
    isPublic: false
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      createTodo.mutate(values);
      formik.resetForm();
      history.goBack();
    }
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <Input
        label="Title"
        type="text"
        id="title"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      <Input
        label="Description"
        type="text"
        id="description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      <Input
        label="Public"
        type="checkbox"
        id="isPublic"
        name="isPublic"
        value={formik.values.isPublic}
        onChange={formik.handleChange}
      />
      <CreateButton type="submit">Add Todo</CreateButton>
      <BackLink to={APP_KEYS.ROUTER_KEYS.TODOS}>Back</BackLink>
    </StyledForm>
  );
};

export default AddTodoForm;
