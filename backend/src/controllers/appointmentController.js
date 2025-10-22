import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns"
import Appointment from "../models/Appointment.js"

export const createAppointment = async (req, res) => {
  try {
    const appointment = req.body
    appointment.user = req.user._id.toString()
    const newAppointment = new Appointment(appointment)
    await newAppointment.save()
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
