const { ApolloServer, gql } = require('apollo-server-lambda');

const nodemailer = require("nodemailer");

const typeDefs = require('./schema')

const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')

/* const { data } = require("./db.js"); */
const { client, query } = require("./db.js");

const verifyToken = require('./validate');

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.REACT_APP_EMAIL,
    pass: process.env.REACT_APP_WORD,
    clientId: process.env.REACT_APP_OAUTH_CLIENTID,
    clientSecret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
    refreshToken: process.env.REACT_APP_OAUTH_REFRESH_TOKEN,
  },
 });

 transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
 });

 let mailOptions = {
  from: "test@gmail.com",
  to: process.env.REACT_APP_EMAIL,
  subject: "Nodemailer API",
  text: "Hi from your nodemailer API",
 };

 transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log("Email sent successfully");
  }
 });

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
    isAuthenticated
  }},
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
},
});