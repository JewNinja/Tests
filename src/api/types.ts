export type UserDetailsType = {
  email: string,
  roles: Array<string>,
  blackbox: {
    is_used: boolean,
    pictures: Array<string>
  }
}

export type UserDetailsResponseType = {
  data: {
    giveUserDetails: UserDetailsType & {
      __typename: unknown
    }
  }
}
