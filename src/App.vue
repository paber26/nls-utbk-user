<template>
  <!-- Loading sementara -->
  <div
    v-if="checkingAuth"
    class="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50"
  >
    <div class="flex flex-col items-center">
      <div class="relative">
        <div class="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center shadow-inner">
          <div class="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>

      <h2 class="mt-8 text-xl font-semibold text-indigo-700 tracking-wide">Menyiapkan Dashboard Anda</h2>

      <p class="mt-2 text-sm text-slate-500 text-center max-w-xs">
        Sistem sedang memeriksa sesi login dan memuat data pengguna. Mohon tunggu sebentar...
      </p>
    </div>
  </div>

  <!-- <Login v-else-if="!loggedIn && !proseslogin" />
  <Isiformawal v-else-if="loggedIn && !profilLengkap" />
  <EventInfo v-else-if="loggedIn && profilLengkap && !isEventRegistered" /> -->
  <RouterView v-else />
</template>

<script setup>
import { onMounted, computed } from "vue"
import { RouterView, useRouter, useRoute } from "vue-router"
import { useUserStore } from "@/stores/userStore"
import Login from "./pages/autentifikasi/login.vue"
import Isiformawal from "./pages/autentifikasi/Isiformawal.vue"
import EventInfo from "./pages/event/EventInfo.vue"

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const checkingAuth = computed(() => userStore.checkingAuth)
const loggedIn = computed(() => userStore.loggedIn)
const profilLengkap = computed(() => userStore.profilLengkap)
const proseslogin = computed(() => userStore.proseslogin)
const isEventRegistered = computed(() => userStore.user?.is_event_registered === 1)

onMounted(async () => {
  console.log("App.vue mounted, initializing auth...")

  try {
    await userStore.initializeAuth()
    // Jika sudah login dan masih di halaman login, redirect ke root
    if (userStore.loggedIn && route.path === "/login") {
      router.replace("/")
    }
    console.log("Auth initialization selesai")
  } catch (error) {
    console.error("Error saat initializeAuth:", error)
  }
})
</script>
