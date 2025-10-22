<script setup>
import { formatCurrency } from "@/helpers"
import { useAppointmentsStore } from "@/stores/appointments"

defineProps({
  service: {
    type: Object,
    required: true
  }
})

const appointmentsStore = useAppointmentsStore()
</script>

<template>
  <div
    @click="appointmentsStore.onServiceSelected(service)"
    class="p-5 space-y-5 rounded-lg cursor-pointer"
    :class="
      appointmentsStore.isServiceSelected(service._id)
        ? 'bg-blue-500 text-white'
        : 'bg-white'
    "
  >
    <p class="text-2xl font-light">{{ service.name }}</p>

    <p
      :class="
        appointmentsStore.isServiceSelected(service._id)
          ? 'text-white'
          : 'text-blue-600'
      "
      class="text-4xl font-black"
    >
      {{ formatCurrency(service.price) }}
    </p>
  </div>
</template>
