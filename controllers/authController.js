const User = require('../models/userModel');
const { signToken } = require('../utils/jwtUtils');
const { signupSchema, signinSchema } = require('../validators/authValidators');

exports.signup = async (req, res) => {
  try {
    const data = signupSchema.parse(req.body);
    const existingUser = await User.findOne({ contactNumber: data.contactNumber });
    if (existingUser) return res.status(400).json({ message: 'Number already in use' });

    const newUser = new User(data);
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.errors || err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { contactNumber, password } = signinSchema.parse(req.body);
    const user = await User.findOne({ contactNumber });
    if (!user) return res.status(400).json({ message: 'Invalid number or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid number or password' });

    const token = signToken({ id: user._id });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(400).json({ error: err.errors || err.message });
  }
};
