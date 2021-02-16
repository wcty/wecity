global.fetch = require('node-fetch');
const { ApolloClient, gql, InMemoryCache } = require('@apollo/client');
const fs =require('fs')

const client= new ApolloClient({
    cache: new InMemoryCache({
        addTypename: false
        }),
    uri: 'https://hasura.weee.city/v1/graphql',

})
const GetKeys = gql`
    query GetKeys{
        i18n{
            key
            en
        }
    }
 `  

client.query({
    query : GetKeys
}).then((data) => {
    const json = JSON.stringify(data.data.i18n.reduce( (a,b)=>{
        const {key, ...value} = b
        a[key]=Object.values(value)[0]
        return a
        }, {}),null, ' ')
        fs.writeFile('src/global/defaultLang.json', json, { flag: 'w' }, err => {})
        const md  = json.slice(1,-1)
        fs.writeFile('src/global/defaultLang.md', md,  { flag: 'w' }, err => {})
}
)
