// resolvers.js: Define the query and mutation functionality to work with the Mongoose models.

const { AuthenticationError } = require("apollo-server-express");
const { saveBook } = require("../../client/src/utils/API");
const { REMOVE_BOOK } = require("../../client/src/utils/mutations");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedBooks");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("savedBooks");
    },
    books: async () => {
      return Book.find();
    },
    book: async (parent, { title }) => {
      return Book.findOne({ title });
    },
  },

  Mutation: {
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookId } },
          { new: true }
        ).populate("savedBooks");

        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeBook: async (parent, { title }) => {},

    addBook: async (parent, args) => {
      const book = await Book.create(args);
      return book;
    },
  },
};

module.exports = resolvers;
