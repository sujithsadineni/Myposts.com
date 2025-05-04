import db from "../db/connection.js";

export async function createUser({ id, username, email, password, role }) {
  const [user] = await db("users")
    .insert({
      id,
      username,
      email,
      password,
      role,
    })
    .returning("*");
  return user;
}

export async function findUserByUsername(username) {
  const user = await db("users").where({ username }).first();
  return user;
}
