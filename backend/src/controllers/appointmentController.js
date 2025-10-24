import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns"
import Appointment from "../models/Appointment.js"
import {
  validateObjectID,
  handleNotFoundError,
  formatDate
} from "../utils/index.js"
import {
  sendEmailCancelAppointment,
  appointmentEmailService,
  sendEmailUpdateAppointment
} from "../emails/appointmentEmailService.js"

export const createAppointment = async (req, res) => {
  try {
    const appointment = req.body
    appointment.user = req.user._id.toString()
    const newAppointment = new Appointment(appointment)
    const result = await newAppointment.save()

    await appointmentEmailService({
      date: formatDate(result.date),
      time: result.time
    })
    res.status(201).json({ msg: "Appointment created successfully" })
  } catch (error) {
    console.log(error)
  }
}

export const getAppointmentsByDate = async (req, res) => {
  const { date } = req.query

  const newDate = parse(date, "dd/MM/yyyy", new Date())

  if (!isValid(newDate)) {
    const error = new Error("Invalid date format")
    return res.status(400).json({ msg: error.message })
  }

  const isoDate = formatISO(newDate)
  const appointments = await Appointment.find({
    date: {
      $gte: startOfDay(new Date(isoDate)),
      $lte: endOfDay(new Date(isoDate))
    }
  }).select("time")

  res.status(200).json(appointments)
}

export const getAppointmentById = async (req, res) => {
  const { id } = req.params

  if (validateObjectID(id, res)) return

  const appointment = await Appointment.findById(id).populate("services")
  if (!appointment) return handleNotFoundError("Appointment not found", res)

  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("Access denied")
    return res.status(403).json({ msg: error.message })
  }

  res.status(200).json(appointment)
}

export const updateAppointment = async (req, res) => {
  const { id } = req.params

  if (validateObjectID(id, res)) return

  const appointment = await Appointment.findById(id).populate("services")
  if (!appointment) return handleNotFoundError("Appointment not found", res)

  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("Access denied")
    return res.status(403).json({ msg: error.message })
  }

  const { date, time, totalAmount, services } = req.body
  appointment.date = date || appointment.date
  appointment.time = time || appointment.time
  appointment.services = services || appointment.services
  appointment.totalAmount = totalAmount || appointment.totalAmount

  try {
    await appointment.save()

    await sendEmailUpdateAppointment({
      date: formatDate(appointment.date),
      time: appointment.time
    })

    res.status(200).json({ msg: "Appointment updated successfully" })
  } catch (error) {
    console.log(error)
  }

  await appointment.save()
  res.status(200).json({ msg: "Appointment updated successfully" })
}

export const deleteAppointment = async (req, res) => {
  const { id } = req.params

  if (validateObjectID(id, res)) return

  const appointment = await Appointment.findById(id).populate("services")
  if (!appointment) return handleNotFoundError("Appointment not found", res)

  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("Access denied")
    return res.status(403).json({ msg: error.message })
  }

  try {
    const result = await appointment.deleteOne()

    await sendEmailCancelAppointment({
      date: formatDate(result.date),
      time: result.time
    })

    res.status(200).json({ msg: "Appointment deleted successfully" })
  } catch (error) {
    console.log(error)
  }
}
