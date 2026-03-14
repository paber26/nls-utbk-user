<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F3F4F4] via-white to-[#5F9598]/12">
    <div class="bg-white p-8 rounded-xl shadow-md text-center w-full max-w-sm">
      <div v-if="!error">
        <div
          class="animate-spin mx-auto mb-4 h-8 w-8 border-4 border-[#1D546D] border-t-transparent rounded-full"
        ></div>
        <h2 class="text-lg font-semibold text-gray-800">Sedang masuk…</h2>
        <p class="text-sm text-gray-500 mt-2">Mohon tunggu, kami sedang memverifikasi akun Anda.</p>
      </div>

      <div v-else>
        <h2 class="text-lg font-semibold text-red-600">Login gagal</h2>
        <p class="text-sm text-gray-500 mt-2">Token login tidak ditemukan. Mengalihkan ke halaman login…</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const error = ref(false)

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const token = params.get("token")

  if (token) {
    localStorage.setItem("token", token)
    window.location.href = "/"
  } else {
    error.value = true
    setTimeout(() => {
      router.replace("/login")
    }, 2000)
  }
})
</script>
