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
  depth: number
  period: string
  manufactureDate: number
  price: number
  images: [string]
 }

export type Query = {
  
    itemList: [Item],
    singleItem (_id: string): Item,

}

export type Mutation = {
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

}
  