export type GraphQLResponseErrorType = {
  message: string,
  extensions: {
    code: string,
    response: {
        statusCode: number,
        message: string
    }
  }
}

export type GraphQLResponseType = {
  errors?: Array<GraphQLResponseErrorType>,
  data: unknown | null
}