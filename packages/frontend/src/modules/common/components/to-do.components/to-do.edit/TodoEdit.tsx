import React from 'react';
import { useFormik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { useTodoById, useUpdateTodo } from '../../../../hooks/to-do.hooks';
import { StyledForm, CreateButton, BackLink } from './TodoEdit.styled';
import Input from '../../default.components/items/input';
import { APP_KEYS } from '../../../consts';
import Preloader from '../../../../utils/components/Preloader';

const TodoEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { data: todo, isLoading, isError } = useTodoById(id);
  const updateTodo = useUpdateTodo();
  const history = useHistory();

  const initialValues = {
    title: '',
    description: '',
    isPublic: false
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await updateTodo.mutateAsync({ id, todo: values });
      history.push(`${APP_KEYS.ROUTER_KEYS.TODOS}/${todo.id}`);
    }
  });

  if (isLoading) {
    return <Preloader />;
  }

  if (isError || !todo) {
    return <p>Failed to fetch todo data.</p>;
  }

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
      <CreateButton type="submit">Save Changes</CreateButton>
      <BackLink to={`${APP_KEYS.ROUTER_KEYS.TODOS}/${todo?.id}`}>Back</BackLink>
    </StyledForm>
  );
};

export default TodoEdit;
