const { AuthenticationError } = require("apollo-server-express");
const { Book, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // me: async (parent, { user }) => {
    //   console.log("show me the user!", user);
    //   const oldUser = await User.findById(user);
    //   return oldUser;
    // },

    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }, context) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user.id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    updateProduct: async (parent, { id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return Product.findByIdAndUpdate(
        id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
