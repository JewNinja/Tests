import gql from "graphql-tag";
import { apolloClient } from "./config/apollo";

export const getUserDetails = ({userId = null, userEmail = null}) => apolloClient.query({
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
