global.fetch = require('node-fetch');
const { ApolloClient, gql, InMemoryCache } = require('@apollo/client');
const users = require('./users/firebase_users.json')
const fs = require('fs')

const users_filtered = users.users.filter(u=>u.email)
console.log(users_filtered.length)
fs.writeFile('./migration/users/filtered.json', JSON.stringify(users_filtered), (err,success)=>{if(err){console.log(err)}})
