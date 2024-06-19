import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Token from "../models/tokenModel.js";

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validation
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters long");
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Create new user
    user = await User.create({ name, email, password });

    // Generate Token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Authenticate a user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate request
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("Invalid Credentials");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid Credentials");
    }

    // Generate Token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Logout user
export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
  
 
    res.status(200).json({ message: 'Logged out successfully' });
  });
  












































// import User from "../models/userModel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken"
// import asyncHandler from "express-async-handler"


// // Register a new user
// export const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         let user = await User.findOne({ email });
//         if(!req.body.email){
//             res.status(400);
//             throw new Error("Please add an email")
//         }
//         if (user) {
//             return res.status(400).json({ msg: 'User already exists' });
//         }
//         user = new User({ name, email, password });
//         await user.save();
//         const payload = { user: { id: user.id } };
//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Authenticate a user
// export const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }
//         const payload = { user: { id: user.id } };
//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });
