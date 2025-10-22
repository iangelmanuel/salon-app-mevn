<script setup>
import { onMounted, inject } from "vue"
import { useRoute, useRouter } from "vue-router"
import AuthApi from "@/api/AuthApi"

const toast = inject("toast")
const route = useRoute()
const router = useRouter()
const { token } = route.params

onMounted(async () => {
  try {
    const { data } = await AuthApi.verifyAccount(token)
    toast.open({
      type: "success",
      message: data.msg
    })

    setTimeout(() => {
      router.push({ name: "login" })
    }, 3500)
  } catch (error) {
    toast.open({
      type: "error",
      message: error.response.data.msg || "Hubo un error, inténtalo de nuevo"
    })
  }
})
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Verificar Cuenta
  </h1>

  <p class="text-2xl text-white text-center my-5">
    Verifica tu cuenta en AppSalon
  </p>
</template>
