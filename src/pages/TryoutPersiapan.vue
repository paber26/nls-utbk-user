<template>
  <AppShell>
    <template #header>
      <div>
          <h1 class="text-lg font-semibold text-slate-800">Persiapan Tryout</h1>
          <p class="text-sm text-slate-500">Harap baca ketentuan sebelum memulai tryout</p>
      </div>
    </template>

    <div v-if="isLoading" class="flex min-h-[50vh] w-full flex-col items-center justify-center px-6 py-12">
          <div class="w-12 h-12 border-4 border-slate-200 border-t-[#1D546D] rounded-full animate-spin mb-4"></div>
          <p class="text-slate-500 font-medium animate-pulse">Menyiapkan data tryout...</p>
    </div>

    <div v-else class="w-full px-6 py-8">
          <div class="space-y-6">
            <!-- LEFT (2/3) -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Info Tryout -->
              <section class="bg-white rounded-xl border p-6">
                <span class="inline-block text-xs bg-[#5F9598]/12 text-[#1D546D] px-2 py-1 rounded mb-3">
                  {{ tryout.jenjang }}
                </span>
                <h2 class="text-xl font-semibold text-slate-800">{{ tryout.nama }}</h2>
                <p class="text-sm text-slate-500 mt-1">
                  Durasi: {{ tryout.durasi }} menit • Jumlah soal: {{ tryout.jumlah_soal }}
                </p>

                <div class="mt-4 bg-[#F3F4F4] border border-[#5F9598]/20 rounded-lg p-4 text-sm text-slate-700">
                  <div class="flex flex-col gap-1">
                    <span class="font-semibold text-[#1D546D]">Periode Pengerjaan</span>
                    <span>
                      Mulai:
                      <b>{{ formatTanggal(tryout.mulai) }}</b>
                    </span>
                    <span>
                      Selesai:
                      <b>{{ formatTanggal(tryout.selesai) }}</b>
                    </span>
                  </div>
                </div>
              </section>

              <!-- Ketentuan Khusus (Dari Admin) -->
              <section v-if="tryout.ketentuan_khusus" class="bg-white rounded-xl border border-[#5F9598]/20 p-6">
                <div class="flex items-center gap-2 mb-4">
                  <span class="text-[#1D546D]">⚠</span>
                  <h3 class="text-lg font-semibold text-slate-800">Ketentuan Khusus Tryout</h3>
                </div>

                <div
                  class="prose prose-sm max-w-none text-slate-700 leading-relaxed"
                  v-html="tryout.ketentuan_khusus"
                ></div>
              </section>

              <!-- Ketentuan -->
              <section class="bg-white rounded-xl border border-slate-200 p-6">
                <h3 class="text-lg font-semibold text-slate-800 mb-4">Ketentuan & Persiapan</h3>

                <ul class="space-y-4 text-sm text-slate-700 leading-relaxed">
                  <li class="flex gap-3">
                    <span class="text-primary mt-1">✔</span>
                    Gunakan
                    <b>Google Chrome versi terbaru</b>
                    untuk pengalaman terbaik.
                  </li>

                  <li class="flex gap-3">
                    <span class="text-primary mt-1">✔</span>
                    Pastikan
                    <b>koneksi internet stabil</b>
                    selama pengerjaan tryout.
                  </li>

                  <li class="flex gap-3">
                    <span class="text-primary mt-1">✔</span>
                    Siapkan
                    <b>alat tulis</b>
                    (pulpen, pensil, kertas coretan).
                  </li>

                  <li class="flex gap-3">
                    <span class="text-primary mt-1">✔</span>
                    Pastikan perangkat dalam kondisi
                    <b>baterai cukup</b>
                    .
                  </li>

                  <li class="flex gap-3">
                    <span class="text-primary mt-1">✔</span>
                    Setelah dimulai,
                    <b>waktu berjalan terus</b>
                    dan tidak bisa dihentikan.
                  </li>

                  <li class="flex gap-3">
                    <span class="text-primary mt-1">✔</span>
                    <b>Berdoa</b>
                    , kerjakan dengan
                    <b>jujur dan mandiri</b>
                    .
                  </li>
                </ul>
              </section>

              <!-- Konfirmasi -->
              <section class="bg-white rounded-xl border border-[#5F9598]/20 p-6">
                <div v-if="statusPeriode === 'belum_mulai'" class="text-center space-y-3">
                  <div class="text-lg font-semibold text-[#1D546D]">Tryout akan dimulai dalam:</div>
                  <div class="text-xl font-bold text-slate-800">
                    {{ countdownText }}
                  </div>
                </div>

                <div v-else-if="statusPeriode === 'selesai'" class="text-center">
                  <div class="text-lg font-semibold text-red-600">Periode pengerjaan tryout telah selesai.</div>
                </div>

                <div v-else class="border-t pt-6">
                  <label class="flex items-start gap-3 text-sm text-slate-700 mb-6">
                    <input type="checkbox" class="mt-1" v-model="confirmed" />
                    <span>Saya telah membaca dan memahami seluruh ketentuan tryout.</span>
                  </label>

                  <div class="flex flex-col sm:flex-row gap-3">
                    <RouterLink
                      to="/tryout"
                      class="flex-1 px-6 py-3 rounded-lg border text-center text-slate-700 hover:bg-slate-100"
                    >
                      Kembali
                    </RouterLink>

                    <button
                      @click="startTryout"
                      :disabled="!confirmed"
                      class="flex-1 px-6 py-3 rounded-lg bg-[#1D546D] text-white text-center font-semibold hover:brightness-110 disabled:opacity-50"
                    >
                      Mulai Tryout
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
    </div>
  </AppShell>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue"
import { useRoute, useRouter, RouterLink } from "vue-router"
import api from "@/services/api"

import AppShell from "../components/layout/AppShell.vue"

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)

const tryout = ref({
  nama: "",
  jenjang: "",
  mapel: "",
  jumlah_soal: 0,
  durasi: 0
})

const confirmed = ref(false)

const now = ref(new Date())
const intervalRef = ref(null)

const statusPeriode = computed(() => {
  if (!tryout.value.mulai || !tryout.value.selesai) return "loading"

  const mulai = new Date(tryout.value.mulai)
  const selesai = new Date(tryout.value.selesai)

  if (now.value < mulai) return "belum_mulai"
  if (now.value > selesai) return "selesai"
  return "aktif"
})

const countdownText = computed(() => {
  if (statusPeriode.value !== "belum_mulai") return ""

  const mulai = new Date(tryout.value.mulai)
  const diff = mulai - now.value

  if (diff <= 0) return ""

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)

  return `${days} hari ${hours} jam ${minutes} menit`
})

function formatTanggal(tanggal) {
  if (!tanggal) return "-"
  const date = new Date(tanggal)
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

async function fetchTryout() {
  try {
    isLoading.value = true
    const res = await api.get(`/user/tryout/${route.params.id}`)
    tryout.value = res.data.data
  } catch (error) {
    console.error("Gagal memuat tryout:", error)
  } finally {
    isLoading.value = false
  }
}

async function startTryout() {
  const res = await api.post(`/user/tryout/${route.params.id}/start`)
  console.log("Start tryout response:", res.data)
  router.push(`/tryout/kerjakan/${route.params.id}`)
}

onMounted(() => {
  fetchTryout()
  intervalRef.value = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (intervalRef.value) clearInterval(intervalRef.value)
})
</script>
