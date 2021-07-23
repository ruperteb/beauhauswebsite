async function createItem(parent, args, context, info) {
  /* if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }
  return context.prisma.property.findMany({
    orderBy: {
      propertyName: 'asc',
    },
  }) */

  /* const item = {
      itemId: context.db.length +1,
      name: args.name,
      description: args.description,
      height: args.height,
      width: args.width,
      depth: args.depth,
      period: args.period,
      manufactureDate: args.manufactureDate,
      price: args.price,
      images: args.images,
  };
  context.db.push(item);
  return item; */

  const item = {

    name: args.name,
    description: args.description,
    height: args.height,
    width: args.width,
    depth: args.depth,
    period: args.period,
    manufactureDate: args.manufactureDate,
    price: args.price,
    images: args.images,
  }

  const { client, query: q } = context;
  const results = await client

    .query(
      q.Create(
        q.Collection('Item'),
        {
          data: item
        },
      )
    )
  return { ...results.data, _id: results.ref.value.id }
}

async function updateItem(parent, args, context, info) {
  /* if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }
  return context.prisma.property.findMany({
    orderBy: {
      propertyName: 'asc',
    },
  }) */
  /* const item = context.db.find((item) => item.itemId === args.itemId);

  item.itemId = args.itemId
  item.name = args.name
  item.description = args.description
  item.height = args.height
  item.width = args.width
  item.depth = args.depth
  item.period = args.period
  item.manufactureDate = args.manufactureDate
  item.price = args.price
  item.images = args.images

  return item */

  const item = {
    name: args.name,
    description: args.description,
    height: args.height,
    width: args.width,
    depth: args.depth,
    period: args.period,
    manufactureDate: args.manufactureDate,
    price: args.price,
    images: args.images,
  }

  const { client, query: q } = context;
  const results = await client
    .query(
      q.Update(
        q.Ref(q.Collection('Item'), args._id),
        {
          data: item,
        },
      )
    )
  return { ...results.data, _id: results.ref.value.id }
}

async function deleteItem(parent, args, context, info) {
  /* if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }
  return context.prisma.property.findMany({
    orderBy: {
      propertyName: 'asc',
    },
  }) */

  /* const index = context.db.findIndex((item) => item.itemId === args.itemId);
  const item = context.db[index];
  context.db.splice(index, 1);
  return item; */
  const { client, query: q } = context;
  const results = await client
    .query(
      q.Delete(q.Ref(q.Collection('Item'),  args._id))
    )
    return { ...results.data, _id: results.ref.value.id }

}

module.exports = {

  createItem,
  updateItem,
  deleteItem,

}