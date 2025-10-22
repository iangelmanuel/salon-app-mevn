<script setup>
import { inject } from "vue"
import { reset } from "@formkit/vue"
import AuthApi from "@/api/AuthApi"

const toast = inject("toast")

const handleSubmit = async ({ password_confirm, ...formData }) => {
  try {
    const { data } = await AuthApi.register(formData)
    toast.open({
      type: "success",
      message: data.msg
    })
    reset("register-form")
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
    Crear una cuenta
  </h1>

  <p class="text-2xl text-white text-center my-5">
    Crea una cuenta en AppSalon
  </p>

  <FormKit
    type="form"
    id="register-form"
    :actions="false"
    @submit="handleSubmit"
    incomplete-message="Por favor, completa todos los campos correctamente"
  >
    <FormKit
      type="text"
      name="name"
      label="Nombre"
      placeholder="Tu Nombre"
      validation="required|length:3"
      :validation-messages="{
        required: 'El nombre es obligatorio',
        length: 'El nombre debe tener al menos 3 caracteres'
      }"
      class="mb-4"
    />

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
      validation="required|length:8"
      :validation-messages="{
        required: 'El password es obligatorio',
        length: 'El password debe tener al menos 8 caracteres'
      }"
      class="mb-4"
    />

    <FormKit
      type="password"
      name="password_confirm"
      label="Confirmar Password"
      placeholder="Confirma tu Password"
      validation="required|length:8|confirm"
      :validation-messages="{
        required: 'La confirmación del password es obligatoria',
        length: 'La confirmación del password debe tener al menos 8 caracteres',
        confirm: 'Los passwords no coinciden'
      }"
      class="mb-4"
    />

    <FormKit type="submit">Crear Cuenta</FormKit>
  </FormKit>
</template>
