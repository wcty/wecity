global.fetch = require('node-fetch');
const { ApolloClient, gql, InMemoryCache } = require('@apollo/client');
const initiatives = require('./initiatives/initiatives_mongo.json')
const users = require('./users/firebase_users_mapped.json')

const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const initiatives_mapped = initiatives
  .map(({geometry, properties})=>{
    const members = properties.members.map(m=>{
      const user = users.find(u=>u.localId===m.uid)
      return {...m, id: user.users_id }
    })
    return ({
      geometry,
      ...properties,
      members,
      initiative_id: uuidv4(),
      initiative_member_id: uuidv4(),
      initiative_thread_id: uuidv4(),
    })
  })

console.log(initiatives_mapped.length)
/// generate account_providers id, accounts id, users id and associate the with firebase ids
/// replace all firebase initiative users ids with hasura ids
fs.writeFile('./migration/initiatives/initiatives_mapped.json', JSON.stringify(initiatives_mapped), (err,success)=>{if(err){console.log(err)}})
