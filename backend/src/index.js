import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import cors from "cors"

import { db } from "./config/db.js"
import servicesRoutes from "./router/servicesRoutes.js"
import authRoutes from "./router/authRoutes.js"
import appointmentRoutes from "./router/appointmentRoute.js"
import userRoutes from "./router/userRoutes.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())

db()

const whitelist = [process.env.FRONTEND_URL, undefined]

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  }
}

app.use(cors(corsOptions))

app.use("/api/services", servicesRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/appointments", appointmentRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
  console.log(colors.blue(`Server is running on port ${PORT}`))
})
