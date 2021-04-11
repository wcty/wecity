global.fetch = require('node-fetch');
const { ApolloClient, gql, InMemoryCache } = require('@apollo/client');
const users = require('./users/firebase_users.json')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const users_filtered = users.users
  .filter(u=>u.email)
  .map(u=>({
    ...u,
    account_providers_id: uuidv4(),
    accounts_id: uuidv4(),
    users_id: uuidv4(),
    ticket: uuidv4(),
    account_roles_id: uuidv4(),
    refresh_token: uuidv4()
  }))

console.log(users_filtered.length)
/// generate account_providers id, accounts id, users id and associate the with firebase ids
/// replace all firebase initiative users ids with hasura ids
fs.writeFile('./migration/users/firebase_users_mapped.json', JSON.stringify(users_filtered), (err,success)=>{if(err){console.log(err)}})
