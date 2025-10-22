import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers

  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      const token = authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select(
        "-password -verified -token -createdAt -updatedAt -__v"
      )
      next()
    } catch {
      const error = new Error("Unauthorized")
      res.status(401).json({ msg: error.message })
    }
  } else {
    const error = new Error("Unauthorized")
    res.status(401).json({ msg: error.message })
  }
}
