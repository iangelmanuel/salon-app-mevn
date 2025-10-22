<script setup>
import { useUserStore } from "@/stores/user"
import Appointment from "@/components/Appointment.vue"

const user = useUserStore()
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">Mis Citas</h2>

  <p class="text-lg text-white mt-5">Aquí puedes ver y gestionar tus citas.</p>

  <p
    v-if="user.loading"
    class="text-white text-2xl text-center mt-5"
  >
    Cargando...
  </p>

  <div v-else>
    <p
      v-if="user.noAppointments"
      class="text-white text-2xl text-center mt-5"
    >
      No tienes citas programadas.
    </p>

    <div
      v-else
      class="grid grid-cols 1 gap-5 mt-10"
    >
      <Appointment
        v-for="appointment in user.userAppointments"
        :key="appointment.id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
