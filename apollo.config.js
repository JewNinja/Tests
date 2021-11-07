module.exports = {
  client: {
    service: {
      name: 'nest-test',
      url: process.env.VUE_APP_GRAPHQL_ENDPOINT,
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}