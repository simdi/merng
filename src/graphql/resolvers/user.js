import { UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../models/User';
import { validateRegisterInput, validateLoginInput } from '../../utils/validators';

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
  }, SECRET_KEY, { expiresIn: '1h' });
}

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

    const token = generateToken(res);

    return {
      ...res._doc,
      id: res._id,
      token
    };
  },

  login: async(_, args, context, info) => {
    const{ username, password } = args;

    // Validate fields
    const { valid, errors } = validateLoginInput(username, password);
    const user = await User.findOne({ username });

    if (!valid) {
      throw new UserInputError('Errors', { errors });
    }

    if (!user) {
      errors.general = 'User not found';
      throw new UserInputError('Wrong credentials', { errors });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      errors.general = 'Incorrect credentials';
      throw new UserInputError('Incorrect credentials', { errors });
    }

    const token = generateToken(user);

    return {
      ...user._doc,
      id: user._id,
      token
    };
  }
};