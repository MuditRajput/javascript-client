import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(payload: { email: $email, password: $password }) {
      message
      status
      data {
        token
      }
    }
  }
`;
