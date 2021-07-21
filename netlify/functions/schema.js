const { gql } = require('apollo-server-lambda');

const typeDefs = gql`

scalar DateTime

type Item {
  itemId: Int
  name: String
  description: String
  height: Float
  width: Float
  depth: Float
  period: String
  manufactureDate: Int
  price: Float
  images: [String]
 }

type Query {
  
    itemList: [Item],
    singleItem (itemId: Int!): Item!,

}

type Mutation {
 postItem (

  name: String,
  description: String,
  height: Float,
  width: Float,
  depth: Float,
  period: String,
  manufactureDate: Int,
  price: Float,
  images: [String],

 ): Item!

deleteItem (itemId: Int): Item!

updateItem (
  itemId: Int,
  name: String,
  description: String,
  height: Float,
  width: Float,
  depth: Float,
  period: String,
  manufactureDate: Int,
  price: Float,
  images: [String],

): Item!

}

`



module.exports = typeDefs;
