<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-sidebar text-slate-200 shadow-2xl transition-transform duration-300 ease-out"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex items-center justify-between border-b border-white/10 px-6 py-5">
      <div>
        <p class="text-xs uppercase tracking-[0.3em] text-white/55">Next Level Study</p>
        <p class="mt-1 text-lg font-semibold text-white">SNBT Hub</p>
      </div>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 hover:text-white"
        @click="$emit('close')"
      >
        <span class="sr-only">Tutup sidebar</span>
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="border-b border-white/10 px-6 py-4">
      <p class="text-xs text-white/55">Peserta SNBT</p>
      <p class="font-medium">
        {{ user?.nama_lengkap || user?.name || "Memuat..." }}
      </p>
      <p class="text-xs text-white/55">{{ user?.sekolah || "-" }} • Kelas {{ user?.kelas || "-" }}</p>
    </div>

    <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-4 text-sm">
      <RouterLink
        to="/"
        class="flex items-center gap-3 rounded-lg px-4 py-3 transition"
        :class="$route.path === '/' ? 'bg-sideover text-white' : 'text-slate-300 hover:bg-sideover'"
        @click="handleNavigate"
      >
        🏠
        <span>Beranda</span>
      </RouterLink>

      <RouterLink
        to="/tryout"
        class="flex items-center gap-3 rounded-lg px-4 py-3 transition"
        :class="isTryoutRoute ? 'bg-sideover text-white' : 'text-slate-300 hover:bg-sideover'"
        @click="handleNavigate"
      >
        📝
        <span>Tryout SNBT</span>
      </RouterLink>

      <RouterLink
        to="/fokus-snbt"
        class="flex items-center gap-3 rounded-lg px-4 py-3 transition"
        :class="$route.path === '/fokus-snbt' ? 'bg-sideover text-white' : 'text-slate-300 hover:bg-sideover'"
        @click="handleNavigate"
      >
        📘
        <span>Fokus SNBT</span>
      </RouterLink>

      <RouterLink
        to="/target-ptn"
        class="flex items-center gap-3 rounded-lg px-4 py-3 transition"
        :class="
          $route.path === '/target-ptn' || $route.path === '/fokus-tka'
            ? 'bg-sideover text-white'
            : 'text-slate-300 hover:bg-sideover'
        "
        @click="handleNavigate"
      >
        🎯
        <span>Target PTN</span>
      </RouterLink>

      <RouterLink
        to="/peringkat"
        class="flex items-center gap-3 rounded-lg px-4 py-3 transition"
        :class="$route.path === '/peringkat' ? 'bg-sideover text-white' : 'text-slate-300 hover:bg-sideover'"
        @click="handleNavigate"
      >
        🏆
        <span>Peringkat SNBT</span>
      </RouterLink>

      <RouterLink
        to="/edit-profil"
        class="flex items-center gap-3 rounded-lg px-4 py-3 transition"
        :class="$route.path === '/edit-profil' ? 'bg-sideover text-white' : 'text-slate-300 hover:bg-sideover'"
        @click="handleNavigate"
      >
        👤
        <span>Edit Profil</span>
      </RouterLink>
    </nav>

    <div class="border-t border-white/10 px-3 py-4">
      <button
        class="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition hover:bg-red-500/10"
        @click="logout"
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

defineProps({
  open: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(["close"])

const route = useRoute()
const userStore = useUserStore()

const isTryoutRoute = computed(() => route.path.startsWith("/tryout"))

const user = computed(() => userStore.user)

const handleNavigate = () => {
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    emit("close")
  }
}

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
  localStorage.removeItem("token")

  // Reset store
  if (typeof userStore.clearUser === 'function') {
    userStore.clearUser()
  } else {
    userStore.$reset()
  }

  // Reload full page dan arahkan ke login
  window.location.href = "/login"
}
</script>
