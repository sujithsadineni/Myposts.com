import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { createUser, findUserByUsername } from "../../models/users.js";
import { generateToken } from "../../utils/jwt.js";

export const userMutations = {
  Mutation: {
    async register(_, { input }) {
      const { username, email, password } = input;
      const existingUser = await findUserByUsername(username);
      if (existingUser) {
        throw new Error("Username already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await createUser({
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
        role: "user",
      });
      return {
        user,
        token: generateToken(user),
      };
    },
    async login(_, { input }) {
      const { username, password } = input;
      const user = await findUserByUsername(username);
      if (!user) {
        throw new Error(`Invalid credentials: ${username} not found`);
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error(`Invalid credentials : ${username} password mismatch`);
      }
      console.log("User logged in successfully:", user.username);
      // console.log("Token generated successfully:", generateToken(user));
      return {
        user,
        token: generateToken(user),
      };
    },
  },
};
