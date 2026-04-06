<template>
  <div :class="['min-h-screen font-poppins', shellClass]">
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
      @click="closeSidebar"
    ></div>

    <Sidebar :open="sidebarOpen" @close="closeSidebar" />

    <div
      class="min-h-screen transition-[padding] duration-300 ease-out"
      :class="sidebarOpen ? 'lg:pl-64' : 'lg:pl-0'"
    >
      <header
        v-if="$slots.header"
        class="sticky top-0 z-30 border-b border-slate-200/80 bg-white/92 backdrop-blur"
      >
        <div class="flex items-start gap-3 px-4 py-4 sm:px-6">
          <button
            type="button"
            class="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-900 hover:shadow"
            @click="toggleSidebar"
          >
            <span class="sr-only">{{ sidebarOpen ? "Sembunyikan sidebar" : "Tampilkan sidebar" }}</span>
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div class="min-w-0 flex-1">
            <slot name="header" :sidebar-open="sidebarOpen" :toggle-sidebar="toggleSidebar" />
          </div>
        </div>
      </header>

      <main class="min-w-0 overflow-x-hidden">
        <slot :sidebar-open="sidebarOpen" :toggle-sidebar="toggleSidebar" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"

import Sidebar from "./Sidebar.vue"

const props = defineProps({
  shellClass: {
    type: String,
    default: "bg-bgsoft"
  }
})

const route = useRoute()

const sidebarOpen = ref(typeof window !== "undefined" ? window.innerWidth >= 1024 : true)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

watch(
  () => route.fullPath,
  () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      closeSidebar()
    }
  }
)
</script>
