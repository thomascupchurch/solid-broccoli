import { gql } from "@apollo/client";

export const GET_ME = gql`
  query getMe($username: String) {
    getMe(username: $username) {
      savedBooks
    }
  }
`;
