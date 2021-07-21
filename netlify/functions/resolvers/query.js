async function itemList(parent, args, context, info) {
    /* if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }
    return context.prisma.property.findMany({
      orderBy: {
        propertyName: 'asc',
      },
    }) */

    return context.db
    
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

    return context.db.find((item) => item.itemId === args.itemId);
    
  }

  module.exports = {

    itemList,
    singleItem,
   
    
  }