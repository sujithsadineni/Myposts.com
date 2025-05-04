import { v4 as uuidv4 } from "uuid";
import {
  createPost,
  findPostById,
  updatePost,
  deletePost,
} from "../../models/posts.js";

export const postMutations = {
  Mutation: {
    async createPost(_, { input }, context) {
      const { title, content } = input;
      const { id: userId, username } = context.user;

      const post = await createPost({
        id: uuidv4(),
        title,
        content,
        user_id: userId,
        author: username,
      });
      console.log(
        "Post created successfully By the user :",
        context.user.username
      );
      if (!post) {
        throw new Error("Failed to create post");
      }
      return post;
    },

    async updatePost(_, { id, input }, context) {
      const { title, content } = input;
      const userId = context.user.id;

      const post = await findPostById(id);
      if (!post) {
        throw new Error("Post not found");
      }
      if (post.user_id !== userId) {
        throw new Error("You are not authorized to update this post");
      }

      const updatedPost = await updatePost(id, {
        title,
        content,
      });

      return updatedPost;
    },

    async deletePost(_, { id }, context) {
      const userId = context.user.id;

      const post = await findPostById(id);
      if (!post) {
        throw new Error("Post not found");
      }
      if (post.user_id !== userId) {
        throw new Error("You are not authorized to delete this post");
      }

      await deletePost(id);
      console.log("Post deleted successfully by the user:", context.title);
      return true;
    },
  },
};
