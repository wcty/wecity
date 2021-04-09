require('dotenv').config()

module.exports = {
  schema: [{
      'https://hasura.weee.city/v1/graphql': {
          headers: {
              "X-Hasura-Admin-Secret": process.env.HASURA,
              "content-type": "application/json"
          },
      },
  }, ],
  //documents: ['./src/**/*.tsx', './src/**/*.ts'],
  overwrite: true,
  generates: {
      './src/generated/graphql.tsx': {
          plugins: [
              'typescript',
              'typescript-operations',
              'typescript-react-apollo',
          ],
          config: {
              skipTypename: false,
              withHooks: true,
              withHOC: false,
              withComponent: false,
          },
      },
      './src/generated/graphql.schema.json': {
          plugins: ['introspection'],
      },
  },
};
