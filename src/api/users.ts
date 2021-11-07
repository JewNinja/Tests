import gql from "graphql-tag";
import { apolloClient } from "./config/apollo";
import { UserDetailsResponseType } from "./types";

export const getUserDetails = ({userId = null, userEmail = null}): Promise<UserDetailsResponseType> => apolloClient.query({
  query: gql`
    query {
      giveUserDetails(id: ${userId ? '"' + userId +  '"' : null}, email: ${userEmail? '"' + userEmail +  '"' : null}) {
        email,
        roles,
        blackbox {
          is_used,
          pictures
        }
      }
    }
  `
})
