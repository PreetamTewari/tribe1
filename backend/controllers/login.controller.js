const loginService = require('../services/login.service');

// Login a registered user using the service
const login = async (req, res) => {
  try {
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Login the user
    const user = await loginService.login(req.body);

    // Return the user
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Register a new user using the service
const register = async (req, res) => {
    // console.log("in register route");
  try {
    // Get the username, email and password from the request body
    const { username, email, password } = req.body;

    // Register the user
    const user = await loginService.register(req.body);
    console.log(user);
    // Return the user
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
    login,
    register
};