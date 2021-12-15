module.exports = {
  input: 'src/api', // "input" of aspida is "output" for openapi2aspida
  outputEachDir: true, // Generate $api.ts in each endpoint directory
  openapi: { inputFile: 'https://petstore.swagger.io/v2/swagger.json' },
}
