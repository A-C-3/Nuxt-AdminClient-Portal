import { defineNuxtPlugin, useRouter } from '#app'

export default defineNuxtPlugin(() => {
  if (process.client) {
    const router = useRouter()

    router.beforeEach((to, from, next) => {
      const token = localStorage.getItem('auth_token')

      if (!token && to.path !== '/login' && to.path !== '/registration') {
        // Redirect to login if the user is not authenticated and is trying to access a protected route
        return next('/login')
      }

      if (token && (to.path === '/login')) {
        // Redirect to the /clients page if the user is authenticated and tries to access login
        return next('/clients')
      }

      next()
    })
  }
})
