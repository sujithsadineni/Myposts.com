import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    role: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }
  input LoginInput {
    username: String!
    password: String!
  }
  type AuthPayload {
    user: User!
    token: String!
  }
  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
  }
`;
