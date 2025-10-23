import { createRouter, createWebHistory } from "vue-router"
import AuthApi from "@/api/AuthApi"
import HomeView from "../views/HomeView.vue"
import AppointmentsLayout from "@/views/appointments/AppointmentsLayout.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/reservaciones",
      name: "appointments",
      component: AppointmentsLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "my-appointment",
          component: () => import("../views/appointments/MyAppointmentView.vue")
        },
        {
          path: "nueva",
          component: () =>
            import("../views/appointments/NewAppointmentLayout.vue"),
          children: [
            {
              path: "",
              name: "new-appointment",
              component: () => import("../views/appointments/ServicesView.vue")
            },
            {
              path: "detalles",
              name: "appointment-details",
              component: () =>
                import("../views/appointments/AppointmentView.vue")
            }
          ]
        }
      ]
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/auth/AuthLayout.vue"),
      children: [
        {
          path: "resgistro",
          name: "register",
          component: () => import("../views/auth/RegisterView.vue")
        },
        {
          path: "confirmar-cuenta/:token",
          name: "confirm-account",
          component: () => import("../views/auth/ConfirmAccView.vue")
        },
        {
          path: "login",
          name: "login",
          component: () => import("../views/auth/LoginView.vue")
        }
      ]
    },
    {
      path: "/:id/editar",
      component: () =>
        import("../views/appointments/EditAppointmentLayout.vue"),
      children: [
        {
          path: "",
          name: "edit-appointment",
          component: () => import("../views/appointments/ServicesView.vue")
        },
        {
          path: "detalles",
          name: "edit-appointment-details",
          component: () => import("../views/appointments/AppointmentView.vue")
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth)

  if (requiresAuth) {
    try {
      await AuthApi.auth()
      next()
    } catch (error) {
      next({ name: "login" })
    }
  } else {
    next()
  }
})

export default router
