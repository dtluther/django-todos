import axios from 'axios';
import { reset } from 'redux-form';
import history from '../history';
import { GET_TODOS, CREATE_TODO, GET_TODO, DELETE_TODO, EDIT_TODO } from './types';

// GET TODOS
export const getTodos = () => async dispatch => {
    const res = await axios.get('/api/todos/');
    dispatch({
        type: GET_TODOS,
        payload: res.data
    });
};

// CREATE TODO -- this if for the react form
export const createTodo = formValues => async dispatch => {
    const res = await axios.post('/api/todos/', { ...formValues });
    debugger;
    dispatch({
      type: CREATE_TODO,
      payload: res.data
    });
    dispatch(reset('todoForm')); // this clears the form after submission succeeeds
  };

export const addTodo = formValues => async dispatch => {
    const res = await axios.post('/api/todos/', { ...formValues });
    debugger;
    dispatch({
      type: CREATE_TODO,
      payload: res.data
    });
  };

// GET TODO
export const getTodo = id => async dispatch => {
    const res = await axios.get(`/api/todos/${id}/`);
    dispatch({
        type: GET_TODO,
        payload: res.data
    });
};

// DELETE TODO
export const deleteTodo = id => async dispatch => {
    await axios.delete(`/api/todos/${id}/`);
    dispatch({
        type: DELETE_TODO,
        payload: id
    });
    history.push('/')
};

// EDIT TODO
export const editTodo = (id, formValues) => async dispatch => {
    const res = await axios.patch(`/api/todos/${id}/`, formValues);
    dispatch({
        type: EDIT_TODO,
        payload: res.data
    });
    history.push('/');
};