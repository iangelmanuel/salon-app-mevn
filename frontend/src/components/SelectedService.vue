<script setup>
import { useAppointmentsStore } from "@/stores/appointments"
import { formatCurrency } from "@/helpers"

defineProps({
  service: {
    type: Object,
    required: true
  }
})

const appointments = useAppointmentsStore()
</script>

<template>
  <div
    class="border border-gray-600 rounded-lg p-5 flex justify-between items-center"
  >
    <div>
      <p class="text-2xl font-extrabold text-white">{{ service.name }}</p>
      <p class="text-3xl font-black text-blue-500">
        {{ formatCurrency(service.price) }}
      </p>
    </div>

    <button
      type="button"
      @click="appointments.onServiceSelected(service)"
      class="inline-flex items-center rounded-md bg-red-600 text-white text-sm px-3 py-1 font-semibold shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-700 cursor-pointer"
    >
      Eliminar
    </button>
  </div>
</template>
