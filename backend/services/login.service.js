const db = require('./db.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


// Register a new user   
const register = async (data) => {
  try {
    // Get the username, email and password from the request body
    const { username, email, password } = data;

    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
    //   return "User already exists";
        throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    // Return the new user
    return "User added successfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

// Login a registered user
const login = async (data) => {
  try {
    // Get the username and password from the request body
    const { username, password } = data;

    // Check if the user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User does not exist');
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Password is not correct');
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Return the token
    return { token };
  } catch (error) {
    throw new Error(error.message);
  }
};

// export the functions
module.exports = {
  register,
  login
};

