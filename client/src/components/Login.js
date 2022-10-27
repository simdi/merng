import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';

import useForm from '../hooks/useForm';
import { AuthContext } from '../context/auth';

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const Login = () => {
  const context = useContext(AuthContext);
  const initialState = {
    username: '',
    password: '',
  };
  const { values, handleInputChange } = useForm(initialState);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData} }) {
      context.login(userData);
      navigate('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {...values, confirmPassword: null },
  });

  const onSubmit = (event) => {
    event.preventDefault();

    addUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} className={loading ? "loading" : null}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={handleInputChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={handleInputChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {
        Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {
                Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))
              }
            </ul>
          </div>
        )
      }
    </div>
  );
};

export default Login;