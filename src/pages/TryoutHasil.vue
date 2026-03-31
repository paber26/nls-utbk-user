<template>
  <!-- root wrapper (use div instead of body so KaTeX can target it reliably) -->
  <div ref="root" class="bg-bgsoft font-poppins overflow-hidden">
    <div class="flex min-h-screen w-full">
      <Sidebar></Sidebar>

      <!-- ================= MAIN ================= -->
      <main class="flex-1 min-w-0 overflow-x-hidden">
        <!-- Topbar -->
        <header class="bg-white border-b px-4 md:px-6 py-4">
          <h1 class="text-lg font-semibold text-slate-800">Hasil Tryout</h1>
          <p class="text-sm text-slate-500">Ringkasan hasil pengerjaan tryout</p>
        </header>

        <!-- Content -->
        <div class="px-4 md:px-6 py-6 w-full">
          <!-- Loading State -->
          <div v-if="loading" class="flex flex-col items-center justify-center py-20">
            <div class="w-12 h-12 border-4 border-[#5F9598]/25 border-t-[#1D546D] rounded-full animate-spin"></div>
            <p class="mt-4 text-slate-500">Memuat hasil tryout...</p>
          </div>

          <!-- Content After Loaded -->
          <div v-else>
            <!-- ================= INFO TRYOUT ================= -->
            <section class="bg-white rounded-xl border p-6 mb-6">
              <span class="inline-block text-xs bg-[#5F9598]/12 text-[#1D546D] px-2 py-1 rounded mb-2">
                {{ badgeLabel }}
              </span>
              <h2 class="text-xl font-semibold text-slate-800">
                {{ hasil?.paket }}
              </h2>
              <p class="text-sm text-slate-500">
                Waktu: {{ hasil?.durasi_menit }} menit • Jumlah soal: {{ hasil?.jumlah_soal }}
              </p>
            </section>

            <!-- ================= SUMMARY NILAI ================= -->
            <section class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="bg-white rounded-xl border p-4 text-center">
                <p class="text-sm text-slate-500">Nilai Poin</p>
                <p class="text-3xl font-bold text-primary mt-1">{{ ringkasan.nilai_poin }}</p>
              </div>

              <div class="bg-white rounded-xl border p-4 text-center">
                <p class="text-sm text-slate-500">Benar</p>
                <p class="text-3xl font-bold text-emerald-600 mt-1">{{ ringkasan.benar }}</p>
              </div>

              <div class="bg-white rounded-xl border p-4 text-center">
                <p class="text-sm text-slate-500">Salah</p>
                <p class="text-3xl font-bold text-red-500 mt-1">{{ ringkasan.salah }}</p>
              </div>

              <div class="bg-white rounded-xl border p-4 text-center">
                <p class="text-sm text-slate-500">Tidak Dijawab</p>
                <p class="text-3xl font-bold text-slate-400 mt-1">{{ ringkasan.kosong }}</p>
              </div>
            </section>

            <!-- ================= PERINGKAT ================= -->
            <!-- <section class="bg-white rounded-xl border p-6 mb-6">
            <h3 class="font-semibold text-slate-800 mb-2">Peringkat</h3>
            <p class="text-sm text-slate-600">
              Peringkat Nasional:
              <b>#12</b>
              dari
              <b>1.245</b>
              peserta
            </p>
            <p class="text-sm text-slate-600 mt-1">
              Peringkat Sekolah:
              <b>#1</b>
            </p>
          </section> -->

            <!-- ================= NAVIGASI JAWABAN ================= -->
            <section class="bg-white rounded-xl border p-6 mb-6">
              <h3 class="font-semibold text-slate-800 mb-4">Ringkasan Jawaban</h3>

              <div v-for="(items, komponen) in groupedNavigasi" :key="komponen" class="mb-6 last:mb-0">
                <h4 class="text-sm font-medium text-slate-600 mb-3">{{ komponen }}</h4>
                <div class="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  <button
                    v-for="n in items"
                    :key="n.nomor"
                    @click="scrollToSoal(n.nomor)"
                    class="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform"
                    :class="{
                      'bg-emerald-500': n.status === 'benar',
                      'bg-red-500': n.status === 'salah',
                      'bg-slate-300 text-slate-700': n.status === 'kosong'
                    }"
                  >
                    {{ n.nomor }}
                  </button>
                </div>
              </div>

              <div class="flex gap-4 text-sm mt-4">
                <div class="flex items-center gap-2">
                  <span class="w-4 h-4 bg-emerald-500 rounded"></span>
                  Benar
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-4 h-4 bg-red-500 rounded"></span>
                  Salah
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-4 h-4 bg-slate-300 rounded"></span>
                  Tidak Dijawab
                </div>
              </div>
            </section>

            <!-- ================= PEMBAHASAN ================= -->
            <section class="bg-white rounded-xl border p-6 mb-6">
              <h3 class="font-semibold text-slate-800 mb-4">Pembahasan</h3>

              <div v-if="canShowPembahasan">
                <div v-if="detailPembahasan.length" class="space-y-6">
                  <article
                    v-for="(item, index) in detailPembahasan"
                    :key="item.id || item.nomor || item.no_soal || index"
                    :id="`soal-${getNomor(item, index)}`"
                    class="border border-slate-200 rounded-xl p-5"
                  >
                    <div class="flex items-center justify-between gap-3 mb-4">
                      <h4 class="font-semibold text-sm sm:text-base flex flex-wrap items-center gap-2">
                        Soal {{ getNomor(item, index) }}
                        <span
                          v-if="item.komponen_nama"
                          class="text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-medium bg-[#1D546D]/10 text-[#1D546D]"
                        >
                          {{ item.komponen_nama }}
                        </span>
                      </h4>
                      <span
                        class="text-xs font-medium px-3 py-1 rounded-full"
                        :class="isJawabanBenar(item) ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'"
                      >
                        {{ isJawabanBenar(item) ? "Benar" : "Belum Tepat" }}
                      </span>
                    </div>

                    <div
                      v-if="getPertanyaan(item)"
                      class="prose prose-slate max-w-none text-slate-700 mb-4"
                      v-html="getPertanyaan(item)"
                    ></div>

                    <div v-if="getPilihan(item).length" class="space-y-2 mb-4">
                      <div
                        v-for="(opsi, opsiIndex) in getPilihan(item)"
                        :key="opsi.key || opsi.label || opsiIndex"
                        class="rounded-lg border px-4 py-3"
                        :class="getPilihanClass(item, opsi)"
                      >
                        <div class="flex items-start gap-3">
                          <span class="font-semibold text-sm">{{ getPilihanLabel(opsi, opsiIndex) }}</span>
                          <div class="flex-1" v-html="getPilihanText(opsi)"></div>
                        </div>
                      </div>
                    </div>

                    <div class="grid gap-3 md:grid-cols-2 mb-4">
                      <div class="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
                        <p class="text-xs uppercase tracking-wide text-slate-500 mb-1">Jawaban Anda</p>
                        <p class="text-slate-700">{{ getJawabanPeserta(item) }}</p>
                      </div>

                      <div class="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3">
                        <p class="text-xs uppercase tracking-wide text-emerald-600 mb-1">Jawaban Benar</p>
                        <p class="text-emerald-700">{{ getJawabanBenar(item) }}</p>
                      </div>
                    </div>

                    <div class="rounded-xl bg-[#F3F4F4] border border-[#5F9598]/20 px-4 py-4">
                      <p class="text-sm font-semibold text-[#1D546D] mb-2">Pembahasan</p>
                      <div
                        v-if="getPembahasan(item)"
                        class="prose prose-slate max-w-none text-slate-700"
                        v-html="getPembahasan(item)"
                      ></div>
                      <p v-else class="text-sm text-slate-500">Pembahasan belum tersedia.</p>
                    </div>
                  </article>
                </div>

                <p v-else class="text-sm text-slate-500">Pembahasan belum tersedia.</p>
              </div>

              <div v-else class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center">
                <p class="text-slate-700 font-medium">Terima kasih sudah mengikuti simulasi UTBK di Next Level Study</p>
              </div>
            </section>

            <!-- ================= AKSI ================= -->
            <section class="bg-white rounded-xl border p-6">
              <div class="flex flex-col sm:flex-row gap-4">
                <RouterLink to="/tryout" class="flex-1 text-center px-6 py-3 rounded-lg border hover:bg-slate-100">
                  Kembali ke Tryout
                </RouterLink>

                <a
                  href="peringkat.html"
                  class="flex-1 text-center px-6 py-3 rounded-lg bg-primary text-white hover:brightness-110"
                >
                  Lihat Peringkat
                </a>
              </div>
            </section>
          </div>
        </div>

      <!-- FLOATING ACTION BUTTONS -->
      <div
        class="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40"
        :class="{ 'opacity-0 pointer-events-none': showList }"
      >
        <button
          @click="showList = true"
          class="bg-[#1D546D] text-white pr-4 pl-3.5 py-2.5 rounded-full shadow-lg hover:bg-[#154053] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm font-medium flex items-center gap-2 border border-[#1D546D]"
        >
          <svg class="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          Daftar Jawaban
        </button>

        <button
          @click="scrollToTop"
          class="bg-yellow-400 text-white p-3 rounded-full shadow-lg hover:bg-yellow-500 ring-4 ring-yellow-100 hover:ring-yellow-200 transition-all flex items-center justify-center hover:-translate-y-0.5 active:translate-y-0 border border-yellow-500/50"
        >
          <svg class="w-5 h-5 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </button>
      </div>

      <!-- MODAL DAFTAR JAWABAN -->
      <div
        v-if="showList"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        @click="showList = false"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden transform scale-100 transition-transform"
          @click.stop
        >
          <div class="px-5 sm:px-6 py-4 border-b flex justify-between items-center bg-slate-50">
            <div>
              <h3 class="font-semibold text-lg text-slate-800">Daftar Jawaban</h3>
              <p class="text-xs text-slate-500 mt-0.5">Pilih nomor untuk melihat pembahasan detail</p>
            </div>
            <button
              @click="showList = false"
              class="text-slate-400 hover:text-red-500 bg-white hover:bg-red-50 rounded-full p-2 transition-all border shadow-sm"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="p-4 sm:p-6 overflow-y-auto custom-scrollbar bg-slate-50/30">
            <div class="space-y-6">
              <div v-for="(items, komponen) in groupedNavigasi" :key="komponen" class="space-y-3">
                <div class="flex items-center gap-2">
                  <div class="h-2 w-2 rounded-full bg-[#1D546D]"></div>
                  <h4 class="text-sm font-semibold text-slate-700">{{ komponen }}</h4>
                </div>

                <div class="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 sm:gap-3">
                  <button
                    v-for="n in items"
                    :key="n.nomor"
                    @click="scrollToSoal(n.nomor)"
                    class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-white font-medium hover:scale-105 hover:shadow-md transition-all border"
                    :class="{
                      'bg-emerald-500 border-emerald-600': n.status === 'benar',
                      'bg-red-500 border-red-600': n.status === 'salah',
                      'bg-slate-300 border-slate-400 text-slate-700': n.status === 'kosong'
                    }"
                  >
                    {{ n.nomor }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, nextTick } from "vue"
import { RouterLink } from "vue-router"
import { useRoute } from "vue-router"

import Sidebar from "../components/layout/Sidebar.vue"
import api from "../services/api"
// math rendering
import katex from "katex"
import renderMathInElement from "katex/contrib/auto-render"
import "katex/dist/katex.min.css"

const route = useRoute()
const id = route.params.id
// console.log("ini attempt id", attemptId)

const hasil = ref(null)
const ringkasan = ref({
  nilai_poin: 0,
  benar: 0,
  salah: 0,
  kosong: 0
})
const navigasi = ref([])

const groupedNavigasi = computed(() => {
  const groups = {}
  navigasi.value.forEach((item) => {
    const comp = item.komponen || "Lainnya"
    if (!groups[comp]) {
      groups[comp] = []
    }
    groups[comp].push(item)
  })
  return groups
})
const pembahasanData = ref([])
const root = ref(null) // reference to main wrapper for KaTeX

const showList = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const scrollToSoal = (soalNomor) => {
  const element = document.getElementById(`soal-${soalNomor}`)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  showList.value = false
}

const loading = ref(true)
const PEMBAHASAN_ENDPOINT = `/user/tryout/hasil/${id}/pembahasan`

// show pembahasan either when the API explicitly allows it or when we
// already have detail data (handles cases where the flag isn't set)
const canShowPembahasan = computed(() => {
  return (
    hasil.value?.show_pembahasan === true ||
    (Array.isArray(detailPembahasan.value) && detailPembahasan.value.length > 0)
  )
})

const badgeLabel = computed(() => {
  const kategori = hasil.value?.kategori || hasil.value?.mapel || hasil.value?.subtest
  return kategori ? `UTBK • ${kategori}` : "Simulasi UTBK"
})

const extractPembahasanArray = (payload) => {
  const data = payload || {}
  const candidates = [
    data.answers, // observed in network logs
    data.pembahasan,
    data.detail_pembahasan,
    data.detail_hasil,
    data.detail,
    data.details,
    data.soal,
    data.soal_list,
    data.jawaban,
    data.items
  ]

  const found = candidates.find(Array.isArray)
  if (!found) {
    console.warn("extractPembahasanArray: no array found in payload", data)
  }
  return found || []
}

const detailPembahasan = computed(() => pembahasanData.value)

// convert any LaTeX enclosed in $...$ or $$...$$ inside an HTML
// string into KaTeX markup. this is run when we build the content that will
// be injected with v-html, so the math is already rendered and we don't rely
// on later DOM post-processing.
function processLatex(html) {
  if (html == null) return ""
  let out = String(html)
  // display math first
  out = out.replace(/\$\$([^$]+?)\$\$/gs, (match, expr) => {
    try {
      return katex.renderToString(expr, { displayMode: true, throwOnError: false })
    } catch {
      return match
    }
  })
  // inline math
  out = out.replace(/\$([^$]+?)\$/g, (match, expr) => {
    try {
      return katex.renderToString(expr, { throwOnError: false })
    } catch {
      return match
    }
  })
  return out
}

// fallback auto-render in case any math slips through; kept for debugging
function renderKatex() {
  console.log("renderKatex fallback invoked")
  nextTick(() => {
    const el = root.value || document.body
    renderMathInElement(el, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    })
  })
}

watch(
  () => [detailPembahasan.value.length, hasil.value],
  async (newVals, oldVals) => {
    console.log("fallback watcher triggered", { newVals, oldVals })
    await nextTick()
    renderKatex()
  },
  { flush: "post" }
)

const getNomor = (item, index) => item?.nomor || item?.no_soal || item?.urutan || index + 1

const getPertanyaan = (item) => processLatex(item?.pertanyaan || item?.soal || item?.question || "")

const getPembahasan = (item) => processLatex(item?.pembahasan || item?.explanation || item?.bahasan || "")

const getJawabanPeserta = (item) =>
  item?.jawaban_user || item?.jawaban_peserta || item?.jawaban || item?.user_answer || "Tidak dijawab"

const getJawabanBenar = (item) =>
  item?.jawaban_benar || item?.kunci_jawaban || item?.correct_answer || item?.kunci || "-"

const isJawabanBenar = (item) => {
  if (typeof item?.benar === "boolean") return item.benar
  if (typeof item?.is_correct === "boolean") return item.is_correct
  return String(getJawabanPeserta(item)).trim() === String(getJawabanBenar(item)).trim()
}

const getPilihan = (item) => {
  const opsi = item?.opsi || item?.pilihan || item?.options
  return Array.isArray(opsi) ? opsi : []
}

const getPilihanLabel = (opsi, index) => {
  return opsi?.key || opsi?.label || String.fromCharCode(65 + index)
}

const getPilihanText = (opsi) => {
  return processLatex(opsi?.text || opsi?.isi || opsi?.value || opsi?.label || "")
}

const normalizeJawaban = (value) => {
  if (Array.isArray(value)) return value.map((item) => String(item).trim())
  if (value && typeof value === "object") return Object.values(value).map((item) => String(item).trim())
  return [String(value || "").trim()]
}

const getPilihanClass = (item, opsi) => {
  const label = String(opsi?.key || opsi?.label || "").trim()
  const jawabanPeserta = normalizeJawaban(getJawabanPeserta(item))
  const jawabanBenar = normalizeJawaban(getJawabanBenar(item))

  if (label && jawabanBenar.includes(label)) {
    return "border-emerald-300 bg-emerald-50 text-emerald-800"
  }

  if (label && jawabanPeserta.includes(label)) {
    return "border-red-300 bg-red-50 text-red-700"
  }

  return "border-slate-200 bg-white text-slate-700"
}

const loadRingkasan = async () => {
  const res = await api.get(`/user/tryout/hasil/${id}`)
  console.log("Hasil tryout data:", res)

  hasil.value = res.data
  ringkasan.value.nilai_poin = res.data.nilai_poin
  ringkasan.value.benar = res.data.benar
  ringkasan.value.salah = res.data.salah
  ringkasan.value.kosong = res.data.kosong
  navigasi.value = res.data.navigasi
}

const loadPembahasan = async () => {
  const res = await api.get(PEMBAHASAN_ENDPOINT)
  console.log("Pembahasan tryout data:", res)
  pembahasanData.value = extractPembahasanArray(res.data)
}

const loadHasil = async () => {
  loading.value = true
  pembahasanData.value = []

  try {
    await loadRingkasan()

    // always attempt to fetch pembahasan data so we can display it when
    // available, regardless of the backend flag
    try {
      await loadPembahasan()
    } catch (err) {
      // ignore errors – it's okay if pembahasan is missing
      console.warn("Error loading pembahasan:", err)
    }

    // wait for DOM to reflect the new pembahasan container, then render
    await nextTick()
    renderKatex()
  } catch (e) {
    console.error("Gagal memuat hasil tryout", e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadHasil()
  // initial render in case some static text contains math
  renderKatex()
})
</script>
