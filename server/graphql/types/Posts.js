import { gql } from "apollo-server-express";

export const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    user_id: ID!
  }
  input PostInput {
    title: String!
    content: String!
  }
  type Query {
    getPosts: [Post!]!
    getPost(id: ID!): Post
  }
  type Mutation {
    createPost(input: PostInput!): Post!
    updatePost(id: ID!, input: PostInput!): Post!
    deletePost(id: ID!): Boolean!
  }
`;
