<script setup>
import { onMounted, inject, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { reset } from "@formkit/vue"
import AuthApi from "@/api/AuthApi"

const toast = inject("toast")
const route = useRoute()
const router = useRouter()
const { token } = route.params

const isValidToken = ref(false)

onMounted(async () => {
  try {
    const { data } = await AuthApi.verifyPasswordResetToken(token)
    isValidToken.value = true
    toast.open({
      type: "success",
      message: data.msg
    })

    setTimeout(() => {
      router.push({ name: "login" })
    }, 3000)
  } catch (error) {
    toast.open({
      type: "error",
      message: error.response.data.msg
    })
  }
})

const handleSubmit = async ({ password }) => {
  try {
    const { data } = await AuthApi.updatePassword(token, { password })
    toast.open({
      type: "success",
      message: data.msg
    })
    reset("new-password-form")
  } catch (error) {
    toast.open({
      type: "error",
      message: error.response.data.msg
    })
  }
}
</script>

<template>
  <div v-if="isValidToken">
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
      Nueva Contraseña
    </h1>

    <p class="text-2xl text-white text-center my-5">
      Ingresa tu email para recuperar tu contraseña
    </p>

    <FormKit
      type="form"
      id="new-password-form"
      :actions="false"
      @submit="handleSubmit"
      incomplete-message="Por favor, completa todos los campos correctamente"
    >
      <FormKit
        type="password"
        name="password"
        label="Password"
        placeholder="Tu Password"
        validation="required|length:8"
        :validation-messages="{
          required: 'El password es obligatorio',
          length: 'El password debe tener al menos 8 caracteres'
        }"
        class="mb-4"
      />

      <FormKit
        type="submit"
        label="Guardar Nueva Contraseña"
        class="mt-4"
      />
    </FormKit>
  </div>

  <div v-else>
    <p class="text-2xl text-white text-center my-5">
      Token inválido o expirado
    </p>
  </div>
</template>
