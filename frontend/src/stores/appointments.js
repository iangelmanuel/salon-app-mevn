import { ref, computed, onMounted, inject, watch } from "vue"
import { useRouter } from "vue-router"
import { defineStore } from "pinia"

import AppointmentAPI from "@/api/AppointmentAPI"
import { convertToISO } from "@/helpers/date"

export const useAppointmentsStore = defineStore("appointments", () => {
  const services = ref([])
  const date = ref("")
  const hours = ref([])
  const time = ref("")
  const appointmentsByDate = ref([])

  const toast = inject("toast")
  const router = useRouter()

  onMounted(() => {
    const startHour = 10
    const endHour = 19

    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ":00")
    }
  })

  watch(date, async () => {
    time.value = ""
    if (date.value === "") return

    const { data } = await AppointmentAPI.getByDate(date.value)
    appointmentsByDate.value = data
  })

  const onServiceSelected = (service) => {
    const servicesIsDuplicated = services.value.some(
      (selectedService) => selectedService._id === service._id
    )

    if (servicesIsDuplicated) {
      services.value = services.value.filter(
        (selectedService) => selectedService._id !== service._id
      )
    } else {
      if (services.value.length >= 3) {
        alert("You can select up to 3 services only.")
        return
      }

      services.value.push(service)
    }
  }

  const createAppointment = async () => {
    const appointment = {
      services: services.value.map((service) => service._id),
      date: convertToISO(date.value),
      time: time.value,
      totalAmount: totalAmount.value
    }

    try {
      const { data } = await AppointmentAPI.create(appointment)
      toast.open({
        type: "success",
        message: data.msg
      })
      clearAppointmentStore()
      router.push({ name: "my-appointments" })
    } catch (error) {
      console.log(error)
    }
  }

  function clearAppointmentStore() {
    services.value = []
    date.value = ""
    time.value = ""
  }

  const isServiceSelected = computed(() => {
    return (serviceId) => services.value.some((s) => s._id === serviceId)
  })

  const noServicesSelected = computed(() => services.value.length === 0)

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  const isValidReservation = computed(() => {
    return services.value.length && date.value.length && time.value.length
  })

  const isDateSelected = computed(() => {
    return date.value ? true : false
  })

  const disableTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find(
        (appointment) => appointment.time === hour
      )
    }
  })

  return {
    services,
    date,
    hours,
    time,
    isServiceSelected,
    noServicesSelected,
    totalAmount,
    isValidReservation,
    isDateSelected,
    disableTime,
    onServiceSelected,
    createAppointment
  }
})
