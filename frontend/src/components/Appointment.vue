<script setup>
import { displayDate } from "@/helpers/date"
import { formatCurrency } from "@/helpers"

defineProps({
  appointment: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white p-5 rounded-lg space-y-3">
    <p class="font-black">
      Fecha:
      <span class="font-light">{{ displayDate(appointment.date) }}</span> Hora:
      <span class="font-light">{{ appointment.time }} Horas</span>
    </p>

    <p class="text-lg font-black">Servicios solicitados en la cita:</p>

    <div
      v-for="service in appointment.services"
      :key="service.id"
      class="flex justify-between"
    >
      <p class="font-light">{{ service.name }}</p>
      <p class="font-black">{{ formatCurrency(service.price) }}</p>
    </div>

    <p class="text-2xl font-black text-right">
      Total a pagar:
      <span class="text-blue-600">{{
        formatCurrency(appointment.totalAmount)
      }}</span>
    </p>
  </div>
</template>
