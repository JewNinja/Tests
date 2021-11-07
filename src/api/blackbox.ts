import gql from "graphql-tag";
import { apolloClient } from "./config/apollo";
import { axiosInstance } from "./config/axios";

export const postBlackboxPicture = (formData: FormData) => axiosInstance({
  method: 'post',
  url: '/graphql',
  data: formData
})

export const getBlackboxPictures = (number = 10) => apolloClient.query({
  query: gql`
    query {
      giveBlackboxPictures(number: ${number}) {
        images_paths,
      }
    }
  `
})

