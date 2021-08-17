export type Maybe<T> = T /* | null */;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};


export type Item = {
  _id: string
  name: string
  description: string
  height: number
  width: number
  length: number
  period: string
  manufactureDate: number
  price: number
  images: string[]
  type: string
  active: boolean
 }

export type Query = {
  
    itemList: Item[],
    /* singleItem (_id: string): Item, */

}

export type Mutation = {
  createItem: Item,
  deleteItem: Item,
  updateItem: Item,
  sendMessage: String
};

export type MutationSendMessageArgs = {
  name: String,
  from: String,
  subject: String,
  text: String
};

export type MutationCreateItemArgs = {
    name: String,
    description: String,
    height: number,
    width: number,
    length: number,
    period: String,
    manufactureDate: number,
    price: number,
    type: String,
    active: Boolean,
};

export type MutationUpdateItemArgs = {
  _id: string,
  name: String,
  description: String,
  height: number,
  width: number,
  length: number,
  period: String,
  manufactureDate: number,
  price: number,
  type: String,
  active: Boolean,
};

export type MutationUpdateImagesArgs = {
  _id: string,
  images: string[]
};

/* export type Mutation = {
 createItem (

  name: string,
  description: string,
  height: number,
  width: number,
  depth: number,
  period: string,
  manufactureDate: number,
  price: number,
  images: [string],

 ): Item,

deleteItem ( _id: string): Item,

updateItem (
  _id: string,
  name: string,
  description: string,
  height: number,
  width: number,
  depth: number,
  period: string,
  manufactureDate: number,
  price: number,
  images: [string],

): Item,

sendMail(
  name: String,
  from: String,
  subject: String,
  text: String
): String

} */
  