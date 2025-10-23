<script setup>
import { ref } from "vue"
import VueTailwindDatepicker from "vue-tailwind-datepicker"
import { formatCurrency } from "@/helpers"
import SelectedService from "@/components/SelectedService.vue"
import { useAppointmentsStore } from "@/stores/appointments"

const appointments = useAppointmentsStore()

const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MMMM"
})

const disableDate = (date) => {
  const today = new Date()
  return (
    date < today ||
    date.getMonth() > today.getMonth() + 1 ||
    [0, 6].includes(date.getDay())
  )
}
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">
    Detalles Cita y Resumen
  </h2>

  <p class="text-white text-lg">
    A continuación se muestra un resumen de su cita:
  </p>

  <h3 class="text-3xl font-extrabold text-white">Servicios Seleccionados</h3>

  <p
    v-if="appointments.noServicesSelected"
    class="text-white text-2xl text-center"
  >
    No se han seleccionado servicios.
  </p>

  <div
    v-else
    class="grid gap-5"
  >
    <SelectedService
      v-for="service in appointments.services"
      :key="service.id"
      :service="service"
    />

    <p class="text-white text-2xl text-right">
      Total a pagar:
      <span class="font-black text-blue-500">
        {{ formatCurrency(appointments.totalAmount) }}
      </span>
    </p>
  </div>

  <div
    class="space-y-8"
    v-if="!appointments.noServicesSelected"
  >
    <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>

    <div class="lg:flex gap-5 items-center">
      <div class="w-full lg:w-96 flex rounded-lg">
        <VueTailwindDatepicker
          :disable-date="disableDate"
          i18n="es-co"
          as-single
          no-input
          :formatter="formatter"
          v-model="appointments.date"
        />
      </div>

      <div
        v-if="appointments.isDateSelected"
        class="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-"
      >
        <button
          v-for="hour in appointments.hours"
          :key="hour"
          @click="appointments.time = hour"
          :disabled="appointments.disableTime(hour) ? true : false"
          :class="
            appointments.time === hour
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800'
          "
          class="block mb-3 px-5 py-2 rounded-full font-semibold cursor-pointer text-center disabled:opacity-10"
        >
          {{ hour }}
        </button>
      </div>
    </div>

    <div class="flex justify-end">
      <button
        :disabled="!appointments.isValidReservation"
        @click="appointments.saveAppointment()"
        class="w-full md:w-auto disabled:bg-gray-500/50 disabled:text-white/50 bg-blue-500 p-3 rounded-lg uppercase cursor-pointer font-black text-white"
      >
        Confirmar Cita
      </button>
    </div>
  </div>
</template>
