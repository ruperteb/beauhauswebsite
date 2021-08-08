const { ApolloServer, gql } = require('apollo-server-lambda');

const typeDefs = require('./schema')

const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')

/* const { data } = require("./db.js"); */
const { client, query } = require("./db.js");

const verifyToken = require('./validate');

const resolvers = {
  Query,
  Mutation,
}

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: async ({ event, context, express }) => {
    let isAuthenticated = false
    try {
      const authHeader = event.headers.authorization || ""
      if (authHeader) {
       const token = authHeader.split(" ")[1]
        const payload = await verifyToken(token)
        isAuthenticated = payload ? true : false
      }
    } catch (error) {
      console.error("Not Authorised")
    }

    return {
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    /* expressRequest: express.req, */
    client,
    query,
    isAuthenticated,
   
  }},
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
},
});