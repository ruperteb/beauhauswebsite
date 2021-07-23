async function itemList(parent, args, context, info) {
  /* if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }
  return context.prisma.property.findMany({
    orderBy: {
      propertyName: 'asc',
    },
  }) */

  /* return context.db */

  const { client, query: q } = context;
  const results = await client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("itemList")), {
          size: 256,
        }),
        q.Lambda(["name", "ref"], q.Get(q.Var("ref")))
      )
    )
  return results.data.map(item => {
    return { ...item.data, _id: item.ref.value.id }
  })


}

async function singleItem(parent, args, context, info) {
  /* if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }
  return context.prisma.property.findMany({
    orderBy: {
      propertyName: 'asc',
    },
  }) */

  /* return context.db.find((item) => item.itemId === args.itemId); */

  const { client, query: q } = context;
  const results = await client
    .query(
      q.Get(q.Ref(q.Collection('Item'), args._id))
    )
    return {...results.data, _id: results.ref.value.id }

}

module.exports = {

  itemList,
  singleItem,


}