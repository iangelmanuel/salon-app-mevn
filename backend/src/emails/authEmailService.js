import { createTransporter } from "../config/nodemailer.js"

export async function sendEmailVerification({ name, email, token }) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  )

  const url = `${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}`

  await transporter.sendMail({
    from: "AppSalon <cuenta@appsalon.com>",
    to: email,
    subject: "AppSalon - Verify your account",
    text: `Verify your account, ${name}`,
    html: `<h1>Verify your account</h1>
           <p>Click the link below to verify your account</p>
           <a href="${url}">Verify Account</a>
           <p>If you did not create an account, you can ignore this email.</p>
          `
  })
}

export async function sendEmailPasswordReset({ name, email, token }) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  )

  const url = `${process.env.FRONTEND_URL}/auth/recuperar-password/${token}`

  await transporter.sendMail({
    from: "AppSalon <cuenta@appsalon.com>",
    to: email,
    subject: "AppSalon - Reset your password",
    text: `Reset your password, ${name}`,
    html: `<h1>Reset your password</h1>
           <p>Click the link below to reset your password</p>
           <a href="${url}">Reset Password</a>
           <p>If you did not request a password reset, you can ignore this email.</p>
          `
  })
}
