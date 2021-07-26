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

// Construct a schema, using GraphQL schema language
/* const typeDefs = gql`
  type Query {
    hello: String
  }
`; */

// Provide resolver functions for your schema fields
/* const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}; */

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  /* context: function () {
   
    return { client, query };
  },  */
  context: async ({ req }) => {
    let isAuthenticated = false
    try {
      const authHeader = req.headers.authorization || ""
      console.log(req.headers.authorization)
      
      if (authHeader) {
       const token = authHeader.split(" ")[1]
        const payload = await verifyToken(token)
        isAuthenticated = payload ? true : false
      }
    } catch (error) {
      console.error("Not Authorised")
    }

    return {
      ...req,
      client,
      query,
      token: req.headers.authorization,
      isAuthenticated
    }
  },
  
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
},
});