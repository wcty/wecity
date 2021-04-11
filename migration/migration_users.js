global.fetch = require('node-fetch');
require('dotenv').config()
const { ApolloClient, gql, InMemoryCache } = require('@apollo/client');
const users = require('./users/firebase_users_mapped.json')

const formatDate = (epoch)=> new Date(Number(epoch)).toISOString();

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  uri: 'https://hasura-aws.weee.city/v1/graphql',
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_ADMIN
  },
})

const queryString = `
  mutation AddAuthProvider {
    insert_auth_account_providers(objects: [${
      users.map(u=>`
        {
          auth_provider: "google", 
          auth_provider_unique_id: "${u.providerUserInfo[0].rawId}", 
          created_at: "${formatDate(u.createdAt)}", 
          id: "${u.account_providers_id}", 
          updated_at: "${formatDate(u.lastSignedInAt)}", 
          account: { 
            data: {
              account_roles: {
                data: {
                  created_at: "${formatDate(u.createdAt)}", 
                  id: "${u.account_roles_id}", 
                  role: "user"
                }
              },
              active: true, 
              created_at: "${formatDate(u.createdAt)}", 
              email: "${u.email}", 
              id: "${u.accounts_id}", 
              is_anonymous: false, 
              default_role: "user", 
              mfa_enabled: false, 
              ticket: "${u.ticket}", 
              ticket_expires_at: "${formatDate(Date.now())}", 
              updated_at: "${formatDate(u.lastSignedInAt)}", 
              user: {
                data: {
                  avatar_url: "${u.photoUrl}", 
                  created_at: "${formatDate(u.createdAt)}", 
                  display_name: "${u.displayName}", 
                  id: "${u.users_id}", 
                  updated_at: "${formatDate(u.lastSignedInAt)}"
                }
              }
            }
          }
        }`).join(',')
      }
    ]) {
      affected_rows
    }
  }
`

const addAuthProvider = gql`${queryString}`
client.mutate({
    mutation: addAuthProvider,
}).then(result => console.log(result))
