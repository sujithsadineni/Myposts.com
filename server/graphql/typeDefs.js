import { gql } from "apollo-server-express";
import { userTypeDefs } from "./types/User.js";
import { postTypeDefs } from "./types/Posts.js";

export const typeDefs = gql`
  type Query
  type Mutation

  ${userTypeDefs}
  ${postTypeDefs}
`;
