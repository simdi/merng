import { UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../models/User';
import validateRegisterInput from '../../utils/validators';

const SECRET_KEY = process.env.AUTH_SECRET;

export const userQuery = {
  getUsers: async() => {
    try {
      const users = await Users.find();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const userMutation = {
  register: async(_, args, context, info) => {
    const { registerInput: { username, password, email } } = args;

    // Validate fields
    const { valid, errors } = validateRegisterInput({ username, password, email });
    if (!valid) {
      throw new UserInputError('Errors', { errors });
    }

    // Make sure user doesn't already exist.
    const user = await User.findOne({ username });
    if (user) {
      throw new UserInputError('Username is taken', {
        errors: {
          username: 'This username is taken',
        }
      })
    }
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashPassword,
      username,
      createdAt: new Date().toISOString()
    });

    const res = await newUser.save();

    const token = jwt.sign({
      id: res.id,
      email: res.email,
      username: res.username,
    }, SECRET_KEY, { expiresIn: '1h' });

    return {
      ...res._doc,
      id: res._id,
      token
    };
  }
};