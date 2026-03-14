<template>
  <!-- ================= SIDEBAR ================= -->
  <aside class="w-64 bg-slate-900 text-slate-200 flex flex-col">
    <!-- Logo -->
    <div class="px-6 py-5 border-b border-slate-800">
      <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Next Level Study</p>
      <p class="text-lg font-semibold text-white mt-1">UTBK Hub</p>
    </div>

    <!-- User Info -->
    <div class="px-6 py-4 border-b border-slate-800">
      <p class="text-xs text-slate-400">Peserta UTBK</p>
      <p class="font-medium">
        {{ user?.nama_lengkap || user?.name || "Memuat..." }}
      </p>
      <p class="text-xs text-slate-400">{{ user?.sekolah || "-" }} • Kelas {{ user?.kelas || "-" }}</p>
    </div>

    <!-- Menu -->
    <nav class="flex-1 px-3 py-4 space-y-1 text-sm">
      <RouterLink
        to="/"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition"
        :class="$route.path === '/' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-300'"
      >
        🏠
        <span>Beranda</span>
      </RouterLink>

      <RouterLink
        to="/tryout"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition"
        :class="isTryoutRoute ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-300'"
      >
        📝
        <span>Tryout UTBK</span>
      </RouterLink>

      <RouterLink
        to="/fokus-utbk"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition"
        :class="$route.path === '/fokus-utbk' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-300'"
      >
        📘
        <span>Fokus UTBK</span>
      </RouterLink>

      <RouterLink
        to="/target-ptn"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition"
        :class="
          $route.path === '/target-ptn' || $route.path === '/fokus-tka'
            ? 'bg-slate-800 text-white'
            : 'hover:bg-slate-800 text-slate-300'
        "
      >
        🎯
        <span>Target PTN</span>
      </RouterLink>

      <RouterLink
        to="/peringkat"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition"
        :class="$route.path === '/peringkat' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-300'"
      >
        🏆
        <span>Peringkat SNBT</span>
      </RouterLink>

      <RouterLink
        to="/edit-profil"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition"
        :class="$route.path === '/edit-profil' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-300'"
      >
        👤
        <span>Edit Profil</span>
      </RouterLink>
    </nav>

    <!-- Logout -->
    <div class="px-3 py-4 border-t border-slate-800">
      <button
        @click="logout"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
      >
        🚪
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router"
import { computed, onMounted } from "vue"
import { useUserStore } from "@/stores/userStore"

const route = useRoute()
const userStore = useUserStore()

const isTryoutRoute = computed(() => route.path.startsWith("/tryout"))

const user = computed(() => userStore.user)

// Load user once if not already loaded
onMounted(async () => {
  if (!userStore.user) {
    try {
      await userStore.fetchUser()
    } catch (error) {
      console.error("Gagal memuat user:", error)
    }
  }
})

// const logout = () => {
//   localStorage.removeItem("auth_token")
//   userStore.$reset()
//   window.location.href = "/login"
// }

const logout = () => {
  // Hapus token
  localStorage.removeItem("auth_token")

  // Reset store
  userStore.$reset()

  // Reload full page dan arahkan ke login
  window.location.href = "/login"
}
</script>
