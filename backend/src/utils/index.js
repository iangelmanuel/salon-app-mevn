import mongoose from "mongoose"
import jwt from "jsonwebtoken"

export function validateObjectID(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid ID")
    return res.status(400).json({ msg: error.message })
  }
}

export function handleNotFoundError(message, res) {
  const error = new Error(message)
  return res.status(404).json({ msg: error.message })
}

export function generateJWT(id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  })
  return token
}
