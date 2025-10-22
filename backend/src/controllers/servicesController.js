import Services from "../models/Services.js"
import { validateObjectID, handleNotFoundError } from "../utils/index.js"

import { services } from "../data/beautyServices.js"

export const createService = async (req, res) => {
  if (Object.values(req.body).includes("")) {
    const error = new Error("All fields are required")
    return res.status(400).json({ msg: error.message })
  }

  try {
    const service = new Services(req.body)
    const result = await service.save()
    return res.json({
      msg: "Service created successfully",
      result
    })
  } catch (error) {
    console.log(error)
  }
}

export const getServices = async (req, res) => {
  try {
    const services = await Services.find()
    return res.json(services)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Internal server error" })
  }
}

export const getServiceById = async (req, res) => {
  const { id } = req.params

  if (validateObjectID(id, res)) return

  const service = await Services.findById(id)

  if (!service) {
    return handleNotFoundError("Service not found", res)
  }

  return res.json(service)
}

export const updateService = async (req, res) => {
  const { id } = req.params

  if (validateObjectID(id, res)) return

  const service = await Services.findById(id)

  if (!service) {
    return handleNotFoundError("Service not found", res)
  }

  service.name = req.body.name || service.name
  service.price = req.body.price || service.price

  try {
    await service.save()
    return res.json({
      msg: "Service updated successfully",
      service
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Internal server error" })
  }
}

export const deleteService = async (req, res) => {
  const { id } = req.params

  if (validateObjectID(id, res)) return

  const service = await Services.findById(id)

  if (!service) {
    return handleNotFoundError("Service not found", res)
  }

  try {
    await service.deleteOne()
    return res.json({ msg: "Service deleted successfully" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Internal server error" })
  }
}
