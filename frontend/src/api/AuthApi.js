import api from "@/lib/axios"

export default {
  register(formData) {
    return api.post("/auth/register", formData)
  },
  verifyAccount(token) {
    return api.get(`/auth/verify/${token}`)
  },
  login(formData) {
    return api.post("/auth/login", formData)
  },
  auth() {
    return api.get("/auth/user")
  },
  admin() {
    return api.get("/auth/admin")
  },
  forgotPassword(email) {
    return api.post("/auth/forgot-password", email)
  },
  verifyPasswordResetToken(token) {
    return api.get(`/auth/forgot-password/${token}`)
  },
  updatePassword(token, formData) {
    return api.post(`/auth/forgot-password/${token}`, formData)
  }
}
