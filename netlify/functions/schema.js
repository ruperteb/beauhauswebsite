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
  type: String
 }

 type Email {
  from: String
  to: String
  subject: String
  text: String
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

sendMessage(
  name: String,
  from: String,
  subject: String,
  text: String
): String

}

`



module.exports = typeDefs;
