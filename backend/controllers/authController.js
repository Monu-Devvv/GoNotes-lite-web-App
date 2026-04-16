import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// helper to create JWT token
function createToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }  // token valid for 30 days
  )
}

// POST /api/auth/register
export async function register(req, res) {
  try {
    const { name, email, password } = req.body

    // check if user already exists
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    // send token back
    res.status(201).json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      token: createToken(user._id),
    })

  } catch (err) {
    res.status(500).json({ message: 'Registration failed' })
  }
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body

    // find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // compare password with hashed one
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // send token back
    res.json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      token: createToken(user._id),
    })

  } catch (err) {
    res.status(500).json({ message: 'Login failed' })
  }
}