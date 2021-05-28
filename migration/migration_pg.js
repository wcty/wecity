global.fetch = require('node-fetch');
require('dotenv').config()
const { ApolloClient, gql, InMemoryCache } = require('@apollo/client');
const initiatives = require('./initiatives/mongo_initiatives_mapped.json')

const formatDate = (epoch)=> new Date(Number(epoch)).toISOString();

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  uri: 'https://hasura-aws.weee.city/v1/graphql',
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_ADMIN
  },
})

const queryString = `
  mutation InsertInitiatives {
    insert_initiatives(objects: [${
        initiatives.map(i=>`{
          created_at: "${i.timestamp.$date||i.timestamp}", 
          ${i.problem?`description: "${i.problem.replace(/"/g, '\\"').replace(/\n/g, "\\n")}",`:''} 
          geom: "${JSON.stringify(i.geometry).replace(/\\"/g, '"')
            .replace(/([\{|:|,])(?:[\s]*)(")/g, "$1'")
            .replace(/(?:[\s]*)(?:")([\}|,|:])/g, "'$1")
            .replace(/([^\{|:|,])(?:')([^\}|,|:])/g, "$1\\'$2")}", 
          ${i?.imageURL?.l?`image: "${i?.imageURL?.l}",`:''}
          ${i?.name? `name: "${i.name.replace(/"/g, '\\"').replace(/\n/g, "\\n")}",`:''}
          initiative_threads: {
            data: {
              ${i?.context?`context: "${i.context.replace(/"/g, '\\"').replace(/\n/g, "\\n")}",`:''} 
              ${i?.outcome? `goal: "${i.outcome.replace(/"/g, '\\"').replace(/\n/g, "\\n")}",`:''} 
              created_at: "${i.timestamp.$date||i.timestamp||''}",
            }
          }, 
          initiative_members: {
            data: [${
              i.members
              .filter(m=>m.id)
              .map(m=>`{
                contractor: ${m.roles?.Contractor?'true':'false'}, 
                created_at: "${i.timestamp.$date||i.timestamp}", 
                donator: ${m.roles?.Donator?'true':'false'}, 
                initiator: ${m.roles?.Initiator?'true':'false'}, 
                volunteer: ${m.roles?.Volunteer?'true':'false'}, 
                user_id: "${m.id}"
              }`).join(',')
            }]
          }
        }`).join(',')
      }]) {
      affected_rows
    }
  }
`
console.log(queryString)
const insertInitiatives = gql`${queryString}`
client.mutate({
    mutation: insertInitiatives,
}).then(result => console.log(result))
