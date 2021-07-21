const { ApolloServer, gql } = require('apollo-server-lambda');

const typeDefs = require('./schema')

const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')

const { data } = require("./db.js");

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
  context: function () {
    return { db: data };
  }, 
});

exports.handler = server.createHandler();