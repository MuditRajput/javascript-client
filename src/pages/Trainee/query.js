import { gql } from '@apollo/client';

const GETALL_TRAINEES = gql`
  query GetAllTrainees($skip: Int, $limit: Int ) {
    getAllTrainees(options: { skip: $skip, limit: $limit }) {
      message
      status
      data {
        totalCount
        UsersList {
          originalId
          name
          email
          createdAt
        }
      }
    }
  }
`;

export {
  GETALL_TRAINEES,
};
