<script setup>
import { inject } from "vue"
import { useRouter } from "vue-router"
import { reset } from "@formkit/vue"
import AuthApi from "@/api/AuthApi"

const toast = inject("toast")
const router = useRouter()

const handleSubmit = async (formData) => {
  try {
    const { data } = await AuthApi.login(formData)

    toast.open({
      type: "success",
      message: data.msg
    })

    localStorage.setItem("token", data.token)

    reset("login-form")

    router.push({ name: "my-appointment" })
  } catch (error) {
    toast.open({
      type: "error",
      message: error.response.data.msg || "Hubo un error, inténtalo de nuevo"
    })
  }
}
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Iniciar Sesión
  </h1>

  <p class="text-2xl text-white text-center my-5">
    Accede a tu cuenta en AppSalon
  </p>

  <FormKit
    type="form"
    id="login-form"
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
      type="password"
      name="password"
      label="Password"
      placeholder="Tu Password"
      validation="required"
      :validation-messages="{
        required: 'El password es obligatorio'
      }"
      class="mb-4"
    />

    <FormKit type="submit">Iniciar Sesión</FormKit>
  </FormKit>
</template>
