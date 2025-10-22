<script setup>
const authRoutes = [
  { name: "register", text: "Crear una cuenta" },
  { name: "login", text: "Iniciar sesión" }
]
</script>

<template>
  <div class="mx-auto lg:w-3/6 mt-20">
    <h1>Desde Auth Layout</h1>

    <RouterView />

    <nav
      class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0"
    >
      <RouterLink
        v-for="route in authRoutes"
        :key="route.name"
        :to="{ name: route.name }"
        class="uppercase font-bold text-white"
      >
        {{ route.text }}
      </RouterLink>
    </nav>
  </div>
</template>
