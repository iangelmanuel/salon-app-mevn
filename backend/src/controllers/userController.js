import Appointment from "../models/Appointment.js"

export const getUserAppointments = async (req, res) => {
  const { user } = req.params

  if (user !== req.user._id.toString()) {
    const error = new Error("Unauthorized access")
    return res.status(403).json({ message: error.message })
  }

  try {
    const appointments = await Appointment.find({
      user,
      date: { $gte: new Date() }
    })
      .populate("services")
      .sort({ date: "asc" })

    res.status(200).json(appointments)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}
