<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 flex h-screen flex-col overflow-visible border-r border-white/10 bg-sidebar text-slate-200 shadow-2xl transition-[transform,width] duration-300 ease-out"
    :class="open ? 'w-64 translate-x-0' : '-translate-x-full w-64 lg:w-[4.5rem] lg:translate-x-0'"
  >
    <div
      class="flex border-b border-white/10"
      :class="open ? 'items-center px-6 py-5' : 'justify-center px-2 py-4 lg:flex-col lg:gap-3'"
    >
      <div
        class="flex items-center justify-center rounded-2xl bg-white/8 text-white shadow-inner"
        :class="open ? 'h-12 w-12' : 'h-12 w-12'"
      >
        <img
          src="/nls-logo-300.png"
          alt="Next Level Study"
          class="h-8 w-8 object-contain"
          :class="open ? 'lg:h-8 lg:w-8' : 'lg:h-8 lg:w-8'"
        />
      </div>

      <div v-if="open" class="ml-4 flex-1 lg:block">
        <p class="text-xs uppercase tracking-[0.3em] text-white/55">Next Level Study</p>
        <p class="mt-1 text-lg font-semibold text-white">SNBT Hub</p>
      </div>
    </div>

    <div v-if="open" class="border-b border-white/10 px-6 py-4">
      <p class="text-xs text-white/55">Peserta SNBT</p>
      <p class="font-medium">
        {{ user?.nama_lengkap || user?.name || "Memuat..." }}
      </p>
      <p class="text-xs text-white/55">{{ user?.sekolah || "-" }} • Kelas {{ user?.kelas || "-" }}</p>
    </div>

    <nav class="flex-1 space-y-1 px-2 py-4 text-sm">
      <RouterLink
        to="/"
        class="group relative flex rounded-lg py-3 transition"
        :class="navItemClass($route.path === '/')"
        @click="handleNavigate"
      >
        <span class="text-xl leading-none">🏠</span>
        <span v-if="open">Beranda</span>
        <span v-if="!open" :class="tooltipClass">Beranda</span>
      </RouterLink>

      <RouterLink
        to="/tryout"
        class="group relative flex rounded-lg py-3 transition"
        :class="navItemClass(isTryoutRoute)"
        @click="handleNavigate"
      >
        <span class="text-xl leading-none">📝</span>
        <span v-if="open">Tryout SNBT</span>
        <span v-if="!open" :class="tooltipClass">Tryout SNBT</span>
      </RouterLink>

      <RouterLink
        to="/fokus-snbt"
        class="group relative flex rounded-lg py-3 transition"
        :class="navItemClass($route.path === '/fokus-snbt')"
        @click="handleNavigate"
      >
        <span class="text-xl leading-none">📘</span>
        <span v-if="open">Fokus SNBT</span>
        <span v-if="!open" :class="tooltipClass">Fokus SNBT</span>
      </RouterLink>

      <RouterLink
        to="/target-ptn"
        class="group relative flex rounded-lg py-3 transition"
        :class="navItemClass($route.path === '/target-ptn' || $route.path === '/fokus-tka')"
        @click="handleNavigate"
      >
        <span class="text-xl leading-none">🎯</span>
        <span v-if="open">Target PTN</span>
        <span v-if="!open" :class="tooltipClass">Target PTN</span>
      </RouterLink>

      <RouterLink
        to="/peringkat"
        class="group relative flex rounded-lg py-3 transition"
        :class="navItemClass($route.path === '/peringkat')"
        @click="handleNavigate"
      >
        <span class="text-xl leading-none">🏆</span>
        <span v-if="open">Peringkat SNBT</span>
        <span v-if="!open" :class="tooltipClass">Peringkat SNBT</span>
      </RouterLink>

      <RouterLink
        to="/edit-profil"
        class="group relative flex rounded-lg py-3 transition"
        :class="navItemClass($route.path === '/edit-profil')"
        @click="handleNavigate"
      >
        <span class="text-xl leading-none">👤</span>
        <span v-if="open">Edit Profil</span>
        <span v-if="!open" :class="tooltipClass">Edit Profil</span>
      </RouterLink>
    </nav>

    <div class="border-t border-white/10 px-3 py-4">
      <button
        class="group relative flex rounded-lg py-3 text-red-400 transition hover:bg-red-500/10"
        :class="open ? 'w-full items-center gap-3 px-4 justify-start' : 'mx-auto h-12 w-12 items-center justify-center'"
        @click="logout"
      >
        <span class="text-xl leading-none">🚪</span>
        <span v-if="open">Logout</span>
        <span v-if="!open" :class="tooltipClass">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router"
import { computed, onMounted } from "vue"
import { useUserStore } from "@/stores/userStore"

const props = defineProps({
  open: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(["close", "open"])

const route = useRoute()
const userStore = useUserStore()
const tooltipClass =
  "pointer-events-none absolute left-full top-1/2 z-50 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#061E29] px-3 py-2 text-xs font-medium text-white shadow-xl ring-1 ring-white/10 group-hover:block"

const isTryoutRoute = computed(() => route.path.startsWith("/tryout"))

const user = computed(() => userStore.user)

const navItemClass = (isActive) => [
  props.open ? "items-center gap-3 px-4 justify-start" : "mx-auto h-12 w-12 items-center justify-center",
  isActive ? "bg-sideover text-white" : "text-slate-300 hover:bg-sideover"
]

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
