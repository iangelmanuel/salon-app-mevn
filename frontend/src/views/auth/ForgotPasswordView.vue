<script setup>
import { inject } from "vue"
import { reset } from "@formkit/vue"
import AuthApi from "@/api/AuthApi"

const toast = inject("toast")

const handleSubmit = async ({ email }) => {
  try {
    const { data } = await AuthApi.forgotPassword({ email })
    toast.open({
      type: "success",
      message: data.msg
    })
    reset("forgot-password-form")
  } catch (error) {
    toast.open({
      type: "error",
      message: error.response.data.msg
    })
  }
}
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Olvide mi Contraseña
  </h1>

  <p class="text-2xl text-white text-center my-5">
    Recupera el acceso a tu cuenta
  </p>

  <FormKit
    type="form"
    id="forgot-password-form"
    :actions="false"
    @submit="handleSubmit"
    incomplete-message="Por favor, completa todos los campos correctamente"
  >
    <FormKit
      type="email"
      name="email"
      label="Email"
      placeholder="Tu Email"
      validation="required|email"
      :validation-messages="{
        required: 'El email es obligatorio',
        email: 'El email no es válido'
      }"
      class="mb-4"
    />

    <FormKit
      type="submit"
      label="Recuperar Contraseña"
      class="mt-4"
    />
  </FormKit>
</template>
