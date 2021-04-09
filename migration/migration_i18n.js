global.fetch = require('node-fetch');
const { ApolloClient, gql, InMemoryCache } = require('@apollo/client');
const english =require('./lang/en.js')
const ukrainian =require('./lang/uk.js')

const client= new ApolloClient({
    cache: new InMemoryCache({
        addTypename: false
        }),
    uri: 'https://hasura.weee.city/v1/graphql',
    headers: {
        "x-hasura-admin-secret": process.env.REACT_APP_HASURA_ADMIN
        },
})

const addKey = gql`
    mutation AddKey($en:String, $uk:String, $key:String, $category:String) {
        insert_i18n (objects: {en: $en, uk: $uk, key: $key, category: $category}) {
        affected_rows
        }
    }
 `  

for (key in english){
    var group = english[key]
    for (k in group){
        client.mutate({
            
                mutation: addKey,
                variables: {en:english[key][k], uk:ukrainian[k], key:k, category:key}
            })
            .then(result => console.log(result))
        
    }
}