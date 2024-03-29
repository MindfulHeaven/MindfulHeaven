const User = require("../models/User");
const JWT = require("jsonwebtoken");
require("dotenv").config()

//This  function handles all the error that could possibly be there while registering
const errorHandle = (err) => {
  let errors = { name: "", email: "", password: "" };

  //this thing is only for the fields that need unique values
  if (err.code) {
    errors.email = "the phone number or email is already registered";
    console.log(err.code);
    return errors;
  }

  //all other error handle
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 60 * 60 * 24;
const SECRET_KEY = process.env.SECRET_KEY;

//creating a JWT token
const CreateToken = (id, email) => {
  return JWT.sign({ id, email }, SECRET_KEY, {
    expiresIn: maxAge,
  });
};

//api for registering a new custommer
module.exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ user: user._id });
    console.log(user._id);
  } catch (err) {
    // const errors = errorHandle(err);
    res.status(400).json(err);
  }
  console.log("signup post");
};

//api for logging in
module.exports.login_post = async (req, res) => {
  console.log("login post");
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password)
    const token = await CreateToken(user._id, user.email, user.password);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ user: user._id });
    console.log('login success');
  }
  catch (err) {
    console.log(err);
    res.status(400).json({});
  }
};

//api for logging out
module.exports.logout_post = async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
}