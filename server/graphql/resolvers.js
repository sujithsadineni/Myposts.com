// Inside resolvers.js
import { userMutations } from "./mutations/user.js";
import { postMutations } from "./mutations/post.js";

export const resolvers = {
  Mutation: {
    ...userMutations.Mutation,
    ...postMutations.Mutation,
  },
  Query: {
    // Define your query resolvers here
  },
};
