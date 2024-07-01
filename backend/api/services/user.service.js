const User = require('../models/User');
const Auth = require('./auth.service');

class UserService {
  constructor() {}

  static async createUser({ email, name, password }) {
    const hashedPwd = await Auth.hashPassword(password);
    const user = new User({ email, name, password: hashedPwd });
    await user.save();
    return user;
  }

  static async login({ email, password }) {
    const userPayload = { email };

    if (!email || !password) {
      throw new Error('Email and password required');
    }

    const user = await User.findOne(userPayload);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const correctPassword = await Auth.matchPasswords(password, user.password);
    if (!correctPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT
    const token = Auth.generateJwt({
      userId: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      user,
      token,
    };
  }
}

module.exports = UserService;
