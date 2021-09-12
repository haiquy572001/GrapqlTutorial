require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

// Load schema && resolver

const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

//Load db
const mongoDataMethods = require("./data/db");

// connect DB
const connectDb = async () => {
  await mongoose.connect(
    process.env.MONGO_URL,
    {
      // useCreateIndex: true,
      // useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Mongodb connection");
    }
  );
};

connectDb();

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

const app = express();
app.listen(process.env.PORT, () =>
  console.log(`Server is running in http://localhost:${process.env.PORT}`)
);
