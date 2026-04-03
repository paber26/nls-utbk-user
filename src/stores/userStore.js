import { defineStore } from "pinia"
import api from "../services/api"

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    loggedIn: true,
    profilLengkap: true,
    proseslogin: 0,
    checkingAuth: true,
    loading: false
  }),

  actions: {
    // Dipanggil saat app pertama kali load
    async initializeAuth() {
      // Ambil token dari query oauth callback jika ada
      const params = new URLSearchParams(window.location.search)
      const tokenFromUrl = params.get("token")

      if (tokenFromUrl) {
        localStorage.setItem("auth_token", tokenFromUrl)
        window.history.replaceState({}, document.title, window.location.pathname)
      }

      // Ambil token dari localStorage
      const token = localStorage.getItem("auth_token")

      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }
      try {
        this.checkingAuth = true
        this.loading = true
        const res = await api.get("/me")

        this.user = res.data
        this.loggedIn = true
        this.profilLengkap = !!res.data.profil_lengkap
      } catch (err) {
        this.user = null
        this.loggedIn = false
        this.profilLengkap = false
      } finally {
        this.checkingAuth = false
        this.loading = false
      }
    },

    // Dipanggil manual jika butuh refresh user
    async fetchUser() {
      try {
        this.loading = true
        const res = await api.get("/me")
        this.user = res.data
        this.loggedIn = true
      } catch (error) {
        console.error("Gagal fetch user:", error)
        this.user = null
        this.loggedIn = false
      } finally {
        this.loading = false
      }
    },

    setUser(data) {
      this.user = data
      this.loggedIn = true
    },

    clearUser() {
      this.user = null
      this.loggedIn = false
    }
  }
})
