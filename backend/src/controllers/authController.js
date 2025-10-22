import bcrypt from "bcrypt"
import User from "../models/User.js"
import { sendEmailVerification } from "../emails/authEmailService.js"
import { generateJWT } from "../utils/index.js"

export const register = async (req, res) => {
  const { name, email, password } = req.body

  if (Object.values({ name, email, password }).includes("")) {
    const error = new Error("All fields are required")
    return res.status(400).json({ msg: error.message })
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    const error = new Error("User already registered")
    return res.status(400).json({ msg: error.message })
  }

  const MIN_PASSWORD_LENGTH = 8

  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    const error = new Error(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
    )
    return res.status(400).json({ msg: error.message })
  }

  try {
    const user = new User({ name, email, password })
    const result = await user.save()

    const dataToSendEmail = {
      name: result.name,
      email: result.email,
      token: result.token
    }

    sendEmailVerification(dataToSendEmail)

    res.status(201).json({ msg: "User registered successfully", user: result })
  } catch (error) {
    console.log(error)
  }
}

export const verifyAccount = async (req, res) => {
  const { token } = req.params

  const user = await User.findOne({ token })

  if (!user) {
    const error = new Error("Invalid token")
    return res.status(401).json({ msg: error.message })
  }

  try {
    user.verified = true
    user.token = ""
    await user.save()

    res.status(200).json({ msg: "Account verified successfully" })
  } catch (error) {
    console.log(error)
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    const error = new Error("User does not exist")
    return res.status(404).json({ msg: error.message })
  }

  if (!user.verified) {
    const error = new Error("Account not verified")
    return res.status(401).json({ msg: error.message })
  }

  if (await user.checkPassword(password)) {
    const token = generateJWT(user._id)
    res.status(200).json({ msg: "Login successful", token })
  } else {
    const error = new Error("Incorrect password")
    return res.status(403).json({ msg: error.message })
  }
}

export const user = async (req, res) => {
  const { user } = req

  if (!user) {
    const error = new Error("User not found")
    return res.status(404).json({ msg: error.message })
  }

  res.status(200).json({ user })
}
