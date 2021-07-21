async function itemList(parent, args, context, info) {
    /* if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }
    return context.prisma.property.findMany({
      orderBy: {
        propertyName: 'asc',
      },
    }) */

    return "Item List Query"
    
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

    return "Single Item Query"
    
  }

  module.exports = {

    itemList,
    singleItem,
   
    
  }