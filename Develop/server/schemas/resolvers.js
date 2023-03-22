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
    addUser: async (parent, args, context) => {
      console.log(args);
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { newBook }, context) => {
      console.log(newBook);
      if (context.user) {
        const addBooktoUser = await User.findByIdAndUpdate(
          { _id: context.user.id },
          {
            $push: { savedBook: newBook },
          },
          { new: true }
        );

        return addBooktoUser;
      }

      throw new AuthenticationError("Not logged in");
    },
    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const book = await Book.findOneAndDelete({
          _id: bookId,
          authors: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: book._id } }
        );
        return book;
      }

      throw new AuthenticationError("Not logged in");
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
