import dotenv from "dotenv"

import colors from "colors"

import { db } from "../config/db.js"
import Services from "../models/Services.js"

import { services } from "./beautyServices.js"

dotenv.config()
db()

async function seedDB() {
  try {
    await Services.insertMany(services)
    console.log(colors.dim("Database seeded successfully"))
    process.exit()
  } catch (error) {
    console.log(colors.red(error))
    process.exit(1)
  }
}

async function clearDB() {
  try {
    await Services.deleteMany({})
    console.log(colors.dim("Database cleared successfully"))
    process.exit()
  } catch (error) {
    console.log(colors.red(error))
    process.exit(1)
  }
}

if (process.argv.includes("--import")) {
  seedDB()
} else {
  clearDB()
}
