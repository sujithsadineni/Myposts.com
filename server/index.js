import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import { getUserFromToken } from "./utils/jwt.js";

const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    try {
      const user = getUserFromToken(req);
      console.log("Authenticated user:", user.username);
      return { user };
    } catch (error) {
      console.error("Error in context:", error);
      return { user: null };
    }
  },
});

await server.start();
server.applyMiddleware({ app, path: "/graphql" });

app.get("/", (req, res) => {
  res.send("Welcome to the GraphQL API");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}/graphql`);
});

export default app;
