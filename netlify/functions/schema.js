const { gql } = require('apollo-server-lambda');

const typeDefs = gql`

scalar DateTime

type Item {
  _id: String
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
    singleItem (_id: String): Item,

}

type Mutation {
 createItem (

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

deleteItem ( _id: String): Item!

updateItem (
  _id: String
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
