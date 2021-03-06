const { gql } = require('apollo-server-lambda');

const typeDefs = gql`

scalar DateTime

type Item {
  _id: String
  name: String
  description: String
  height: Float
  width: Float
  length: Float
  period: String
  manufactureDate: Int
  price: Float
  images: [String]
  type: String
  active: Boolean
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
  length: Float
  period: String,
  manufactureDate: Int,
  price: Float,
  type: String,
  images: [String],
  active: Boolean,

 ): Item!

deleteItem ( _id: String): Item!

updateItem (
  _id: String
  name: String,
  description: String,
  height: Float,
  width: Float,
  length: Float
  period: String,
  manufactureDate: Int,
  price: Float,
  type: String
  images: [String],
  active: Boolean,

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
