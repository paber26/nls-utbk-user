<template>
  <div class="bg-slate-100 font-poppins">
    <div class="flex min-h-screen">
      <Sidebar></Sidebar>

      <!-- ================= MAIN CONTENT ================= -->
      <main class="flex-1">
        <TopbarTryout></TopbarTryout>

        <!-- Content -->
        <div class="px-6 py-8">
          <section
            class="mb-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 text-white px-6 py-7 md:px-8"
          >
            <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div class="max-w-2xl">
                <p class="text-sm uppercase tracking-[0.28em] text-sky-300">Simulasi UTBK</p>
                <h2 class="mt-3 text-2xl md:text-3xl font-bold">Pilih paket tryout yang paling relevan dengan targetmu</h2>
                <p class="mt-3 text-slate-300 leading-relaxed">
                  Kerjakan paket per subtes untuk drilling, lalu lanjutkan ke simulasi penuh saat ritme dan akurasi
                  mulai stabil.
                </p>
              </div>

              <div class="grid grid-cols-2 gap-3 text-sm">
                <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p class="text-slate-300">Mode</p>
                  <p class="mt-1 font-semibold">Drill + Full Test</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p class="text-slate-300">Evaluasi</p>
                  <p class="mt-1 font-semibold">Skor dan pembahasan</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Filter -->
          <section class="flex flex-wrap gap-3 mb-8">
            <button
              v-for="f in filters"
              :key="f"
              @click="activeFilter = f"
              :class="[
                'px-4 py-2 rounded-lg text-sm',
                activeFilter === f ? 'bg-indigo-500 text-white' : 'bg-white border'
              ]"
            >
              {{ f }}
            </button>
          </section>

          <!-- Loading -->
          <section v-if="loading" class="flex justify-center items-center py-20">
            <div class="text-center">
              <div
                class="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
              ></div>
              <p class="text-slate-500 text-sm">Memuat paket tryout...</p>
            </div>
          </section>

          <!-- Tryout List -->
          <section v-else-if="filteredTryouts.length" class="grid md:grid-cols-3 gap-6">
            <div v-for="item in filteredTryouts" :key="item.id" class="bg-white p-6 rounded-xl border">
              <span class="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                {{ getItemBadge(item) }}
              </span>

              <h3 class="font-medium mt-3 text-slate-800">
                {{ item.nama }}
              </h3>

              <p class="text-sm text-slate-500 mt-1">{{ item.jumlah_soal }} soal • {{ item.durasi }} menit</p>

              <!-- Status -->
              <span
                v-if="item.status === null"
                class="inline-block mt-3 text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded"
              >
                Belum Dikerjakan
              </span>

              <span
                v-else-if="item.status === 'submitted'"
                class="inline-block mt-3 text-xs text-green-600 bg-green-100 px-2 py-1 rounded"
              >
                Selesai
              </span>

              <span
                v-else-if="item.status === 'ongoing'"
                class="inline-block mt-3 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded"
              >
                Sedang Berjalan
              </span>

              <!-- Action Button -->
              <button
                v-if="item.status === null"
                @click="router.push(`/tryout/persiapan/${item.id}`)"
                class="mt-4 block w-full text-center bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Mulai Tryout
              </button>

              <RouterLink
                v-else-if="item.status === 'submitted'"
                :to="`/tryout/hasil/${item.id}`"
                class="mt-4 block w-full text-center border border-indigo-500 text-indigo-500 py-2 rounded-lg hover:bg-indigo-500 hover:text-white"
              >
                Lihat Hasil
              </RouterLink>

              <button
                v-else-if="item.status === 'ongoing'"
                @click="router.push(`/tryout/kerjakan/${item.id}`)"
                class="mt-4 block w-full text-center bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Lanjutkan
              </button>
            </div>
          </section>

          <section v-else class="bg-white border rounded-2xl p-10 text-center">
            <p class="text-lg font-semibold text-slate-800">Belum ada paket untuk filter ini</p>
            <p class="mt-2 text-sm text-slate-500">
              Coba pilih filter lain atau tunggu batch tryout UTBK berikutnya dibuka.
            </p>
          </section>

          <!-- ================= UPCOMING TRYOUT (DUMMY) ================= -->
          <section class="mt-14">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-xl font-semibold text-slate-800">🚀 Tryout Segera Hadir</h2>
                <p class="text-sm text-slate-500 mt-1">
                  Batch berikutnya disiapkan untuk simulasi penuh UTBK, paket literasi, dan drilling penalaran
                  matematika. Pantau terus agar tidak tertinggal pembukaan aksesnya.
                </p>
              </div>
              <span class="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">Coming Soon</span>
            </div>

            <div class="grid md:grid-cols-3 gap-6">
              <div
                v-for="item in dummyUpcoming"
                :key="item.id"
                class="relative bg-gradient-to-br from-white to-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition duration-300"
              >
                <div class="absolute top-4 right-4 text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                  Upcoming
                </div>

                <span class="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                  {{ item.kategori }} • {{ item.mapel }}
                </span>

                <h3 class="font-semibold mt-4 text-slate-800 leading-snug">
                  {{ item.nama }}
                </h3>

                <p class="text-sm text-slate-500 mt-2">{{ item.jumlah_soal }} soal • {{ item.durasi }} menit</p>

                <div class="mt-5">
                  <button disabled class="w-full bg-slate-300 text-white py-2 rounded-xl cursor-not-allowed text-sm">
                    Menunggu Pembukaan Batch
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue"
import { RouterLink, useRouter } from "vue-router"
import api from "@/services/api"

import Sidebar from "../components/layout/Sidebar.vue"
import TopbarTryout from "../components/layout/TopbarTryout.vue"

const router = useRouter()

const tryouts = ref([])

const dummyUpcoming = [
  {
    id: "upcoming-1",
    nama: "Simulasi Penuh UTBK 01",
    mapel: "Multi Subtes",
    kategori: "Full Test",
    jumlah_soal: 30,
    durasi: 120
  },
  {
    id: "upcoming-2",
    nama: "Drill Literasi Bahasa Indonesia",
    mapel: "Literasi Indonesia",
    kategori: "Subtes",
    jumlah_soal: 25,
    durasi: 90
  },
  {
    id: "upcoming-3",
    nama: "Booster Penalaran Matematika",
    mapel: "Penalaran Matematika",
    kategori: "Booster",
    jumlah_soal: 35,
    durasi: 120
  }
]
const loading = ref(false)
const activeFilter = ref("Semua")

const filters = computed(() => {
  const uniqueMapel = [
    ...new Set(
      tryouts.value
        .map((item) => item.mapel || item.kategori || item.subtest || item.nama)
        .filter(Boolean)
    )
  ]

  return ["Semua", ...uniqueMapel]
})

async function fetchTryouts() {
  try {
    loading.value = true
    const res = await api.get("/user/tryout")
    tryouts.value = res.data.data

    if (!filters.value.includes(activeFilter.value)) {
      activeFilter.value = "Semua"
    }

    console.log("Tryout data:", tryouts.value)
  } catch (err) {
    console.error("Gagal mengambil tryout:", err)
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 600)
  }
}

const filteredTryouts = computed(() => {
  if (activeFilter.value === "Semua") return tryouts.value
  return tryouts.value.filter((t) => {
    const label = t.mapel || t.kategori || t.subtest || t.nama
    return label === activeFilter.value
  })
})

const getItemBadge = (item) => {
  const level = item.jenjang || item.kategori || "Simulasi"
  const mapel = item.mapel || item.subtest || "UTBK"
  return `${level} • ${mapel}`
}

onMounted(() => {
  fetchTryouts()
})
</script>
