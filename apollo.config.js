module.exports = {
  client: {
    service: {
      name: 'nest-test',
      url: 'http://localhost:3003/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}