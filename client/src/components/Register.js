import React, { useState, useContext } from 'react';
import { Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import useForm from '../hooks/useForm';
import { AuthContext } from '../context/auth';

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const Register = () => {
  const context = useContext(AuthContext);
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const { values, handleInputChange } = useForm(initialState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
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
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={handleInputChange}
        />
        <Button type="submit" primary>
          Register
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

export default Register;