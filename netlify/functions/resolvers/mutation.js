async function postItem(parent, args, context, info) {
    /* if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }
    return context.prisma.property.findMany({
      orderBy: {
        propertyName: 'asc',
      },
    }) */

    return "Post Item Mutation"
    
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

    return "Update Item Mutation"
    
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

    return "Delete Item Mutation"
    
  }

  module.exports = {

    postItem,
    updateItem,
    deleteItem,
    
  }