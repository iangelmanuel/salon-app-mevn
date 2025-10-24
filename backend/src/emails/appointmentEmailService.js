import { createTransporter } from "../config/nodemailer.js"

export const appointmentEmailService = async ({ date, time }) => {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  )

  await transporter.sendMail({
    from: "AppSalon <citas@appsalon.com>",
    to: "admin@appsalon.com",
    subject: "AppSalon - New Appointment Scheduled",
    text: `Your appointment is scheduled for ${date} at ${time}.`,
    html: `<h1>Your appointment is scheduled</h1>
           <p>Your appointment is scheduled for <strong>${date}</strong> at <strong>${time}</strong>.</p>
           <p>If you did not create an account, you can ignore this email.</p>
          `
  })
}

export const sendEmailUpdateAppointment = async ({ date, time }) => {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  )

  await transporter.sendMail({
    from: "AppSalon <citas@appsalon.com>",
    to: "admin@appsalon.com",
    subject: "AppSalon - Appointment Updated",
    text: `The appointment has been updated to ${date} at ${time}.`,
    html: `<h1>The appointment has been updated</h1>
           <p>The appointment has been updated: <strong>${date}</strong> at <strong>${time}</strong>.</p>
           <p>If you did not create an account, you can ignore this email.</p>
          `
  })
}

export const sendEmailCancelAppointment = async ({ date, time }) => {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  )

  await transporter.sendMail({
    from: "AppSalon <citas@appsalon.com>",
    to: "admin@appsalon.com",
    subject: "AppSalon - Appointment Canceled",
    text: `The appointment has been canceled: ${date} at ${time}.`,
    html: `<h1>The appointment has been canceled</h1>
           <p>The appointment has been canceled: <strong>${date}</strong> at <strong>${time}</strong>.</p>
           <p>If you did not create an account, you can ignore this email.</p>
          `
  })
}
