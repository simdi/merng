import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.AUTH_SECRET;

const checkAuthHeader = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid Token');
      }
    }
    throw new Error(`Authorization token must be 'Bearer [token]`);
  }

  throw new Error(`Authorization token must be provided`);
}

export default checkAuthHeader;