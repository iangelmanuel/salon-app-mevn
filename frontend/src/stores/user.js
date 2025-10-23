import { ref, onMounted, computed } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import AuthApi from "@/api/AuthApi"
import AppointmentAPI from "@/api/AppointmentAPI"

export const useUserStore = defineStore("user", () => {
  const user = ref({})
  const userAppointments = ref([])
  const loading = ref(true)

  const router = useRouter()

  onMounted(async () => {
    try {
      const { data } = await AuthApi.auth()
      user.value = data.user

      await getUserAppointments()
    } catch (error) {
      console.log("No authenticated user")
    } finally {
      loading.value = false
    }
  })

  const getUserAppointments = async () => {
    const { data } = await AppointmentAPI.getUserAppointments(user.value._id)
    userAppointments.value = data
  }

  const logout = async () => {
    localStorage.removeItem("token")
    user.value = {}
    router.push({ name: "login" })
  }

  const getUserName = computed(() => (user.value?.name ? user.value.name : ""))

  const noAppointments = computed(() => userAppointments.value.length === 0)

  return {
    user,
    userAppointments,
    loading,
    getUserName,
    noAppointments,
    logout,
    getUserAppointments
  }
})
