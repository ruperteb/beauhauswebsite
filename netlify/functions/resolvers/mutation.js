async function postItem(parent, args, context, info) {
    /* if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }
    return context.prisma.property.findMany({
      orderBy: {
        propertyName: 'asc',
      },
    }) */

    const item = {
        itemId= args.context.db.length +1,
        name: args.name,
        description: args.description,
        height: args.height,
        width: args.width,
        depth: args.depth,
        period: args.period,
        manufactureDate: args.manufactureDate,
        price: args.price,
        images: [args.images],
    };
    context.db.push(item);
    return item;


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
    const item = context.db.find((item) => item.itemId === args.itemId);
    
        item.itemId= args.itemId
        item.name= args.name
        item.description= args.description
        item.height= args.height
        item.width= args.width
        item.depth= args.depth
        item.period= args.period
        item.manufactureDate= args.manufactureDate
        item.price= args.price
        item.images= [args.images]
    
        return item
   

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

    const index = context.db.findIndex((item) => item.itemId === args.itemId);
    const item = context.db[index];
    context.db.splice(index, 1);
    return item;

}

module.exports = {

    postItem,
    updateItem,
    deleteItem,

}