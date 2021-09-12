// const { books, authors } = require("../static/data");

const resolvers = {
  // Query
  Query: {
    books:
      () =>
      async (__, args, { mongoDataMethods }) => {
        await mongoDataMethods.getAllBooks();
      },
    authors: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllAuthors(),
    book: async (__, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getBookById(id),
    author: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(id),
  },
  Book: {
    author: async ({ authorId }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(authorId),
  },
  Author: {
    books: async ({ id }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks({ authorId: id }),
  },

  //Mutation
  Mutation: {
    createBook: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createBook(args),
    createAuthor: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createAuthor(args),
  },
};

module.exports = resolvers;
