import db from "../db/connection.js";

export async function createPost({ id, title, content, author, user_id }) {
  const [post] = await db("posts")
    .insert({
      id,
      title,
      content,
      author,
      user_id,
    })
    .returning("*");
  return post;
}

export async function findPostById(id) {
  const post = await db("posts").where({ id }).first();
  return post;
}

export async function findPostsByUserId(user_id) {
  const posts = await db("posts").where({ user_id });
  return posts;
}

export async function updatePost(id, { title, content }) {
  const [post] = await db("posts")
    .where({ id })
    .update({ title, content })
    .returning("*");
  return post;
}

export async function deletePost(id) {
  await db("posts").where({ id }).del();
  return true;
}
