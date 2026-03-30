<template>
  <div class="min-h-screen bg-bgsoft flex select-none" @copy.prevent @cut.prevent @contextmenu.prevent>
    <!-- Sidebar (optional placeholder) -->
    <aside
      class="bg-white border-r w-72 flex-shrink-0 flex flex-col fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:static lg:translate-x-0"
      :class="showDaftarSoal ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <div class="p-4 font-bold text-[#1D546D] border-b bg-slate-50 flex items-center justify-between">
        <span>Daftar Soal</span>
        <span class="text-xs font-normal text-slate-500 bg-white border px-2 py-0.5 rounded">{{ totalSoal }} Total</span>
      </div>
      <div class="p-4 overflow-y-auto flex-1 space-y-6">
        <div v-if="activeKomponenNama && groupedSoalList[activeKomponenNama]">
          <div class="mb-3 text-sm font-semibold text-slate-700 flex items-center justify-between">
            <div class="flex items-center gap-2">
               <div class="w-1.5 h-1.5 rounded-full bg-[#1D546D]"></div>
               <span class="leading-tight">{{ activeKomponenNama }}</span>
            </div>
          </div>
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="n in groupedSoalList[activeKomponenNama].items"
              :key="n"
              class="relative w-10 h-10 rounded border text-sm font-semibold transition-all hover:brightness-95 hover:shadow-sm"
              :class="statusClass(n)"
              @click="openQuestion(n)"
            >
              {{ n }}
              <span v-if="opened[n]" class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-slate-200 border border-white"></span>
            </button>
          </div>
        </div>
        <div v-else class="text-center text-slate-400 text-sm py-10">
          Memuat subtes...
        </div>
      </div>
    </aside>
    <div
      v-if="showDaftarSoal"
      class="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
      @click="showDaftarSoal = false"
    ></div>

    <!-- Main Content -->
    <main class="flex-1 p-6 lg:ml-0">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <div class="mb-3 font-semibold text-[#1D546D] px-2 py-0.5 bg-[#1D546D]/10 rounded inline-block text-sm">
            Subtes: {{ activeKomponenNama || '-' }}
          </div>
          <br/>
          <div class="mb-1 text-sm text-slate-500 inline-block">
            Peserta:
            <span class="font-medium text-slate-700">{{ pesertaNama }}</span>
          </div>
          <h2 class="text-lg font-semibold">Soal nomor {{ currentNumber }}</h2>
          <div class="text-sm text-slate-500">
            Ukuran font soal:
            <button class="mx-1" @click="fontSize = 'text-sm'">A</button>
            <button class="mx-1" @click="fontSize = 'text-base'">A</button>
            <button class="mx-1" @click="fontSize = 'text-lg'">A</button>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <span class="px-4 py-2 rounded-full border border-red-400 text-red-500">Sisa Waktu: {{ timer }}</span>

          <button class="px-4 py-2 bg-[#1D546D] text-white rounded lg:hidden" @click="showDaftarSoal = !showDaftarSoal">
            Daftar Soal
          </button>

          <button
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            @click="showFinishPopup = true"
          >
            Akhiri Subtes
          </button>
        </div>
      </div>

      <!-- Question Card -->
      <div class="bg-white rounded-xl p-6 border">
        <div v-if="isLoadingQuestion" class="flex justify-center items-center py-10">
          <div class="animate-spin rounded-full h-8 w-8 border-4 border-[#1D546D] border-t-transparent"></div>
        </div>
        <div v-else ref="contentContainer" :key="'question-container-' + currentNumber">
          <div ref="soalContainer" :class="fontSize" class="leading-relaxed mb-6" v-html="soalText"></div>

          <!-- Pilihan Ganda -->
          <div v-if="tipeSoal === 'pg'" key="ans-pg" class="space-y-5">
            <div
              v-for="(opt, index) in options"
              :key="opt.key"
              class="border rounded-xl p-4 bg-slate-50 hover:bg-slate-100 transition"
            >
              <label class="flex items-start gap-4 cursor-pointer w-full">
                <input
                  type="radio"
                  :name="'soal-' + currentNumber"
                  v-model="singleAnswer"
                  :value="opt.key"
                  class="mt-1 accent-[#1D546D]"
                  @change="onAnswerChange"
                />
                <div class="flex items-start gap-3 w-full">
                  <div
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F4] text-[#1D546D] font-semibold"
                  >
                    {{ String.fromCharCode(65 + index) }}
                  </div>
                  <div :class="fontSize" class="leading-relaxed" v-html="opt.text"></div>
                </div>
              </label>
            </div>
          </div>

          <!-- PG Majemuk -->
          <div v-else-if="tipeSoal === 'pg_majemuk'" key="ans-pg-majemuk" class="space-y-5">
            <div
              v-for="(opt, index) in options"
              :key="opt.key"
              class="border rounded-xl p-4 bg-slate-50 hover:bg-slate-100 transition"
            >
              <label class="flex items-start gap-4 cursor-pointer w-full">
                <input
                  type="checkbox"
                  :value="opt.key"
                  v-model="answersMap[currentNumber]"
                  @change="onAnswerChange"
                  class="mt-1 accent-[#1D546D]"
                />
                <div class="flex items-start gap-3 w-full">
                  <div
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F4] text-[#1D546D] font-semibold"
                  >
                    {{ String.fromCharCode(65 + index) }}
                  </div>
                  <div :class="fontSize" class="leading-relaxed" v-html="opt.text"></div>
                </div>
              </label>
            </div>
          </div>

          <!-- PG Kompleks (Improved UI) -->
          <div v-else-if="showOptions && tipeSoal === 'pg_kompleks'" key="ans-pg-kompleks" class="space-y-5">
            <div
              v-for="(opt, index) in options"
              :key="opt.key"
              class="border rounded-xl p-4 bg-slate-50 hover:bg-slate-100 transition"
            >
              <div class="flex items-start gap-4">
                <div
                  class="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F4] text-[#1D546D] font-semibold"
                >
                  {{ String.fromCharCode(65 + index) }}
                </div>

                <div class="flex-1">
                  <p :class="fontSize" class="mb-3 leading-relaxed">
                    {{ opt.text }}
                  </p>

                  <div class="flex gap-8">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        :name="'pgk-' + opt.key"
                        value="1"
                        v-model="answersMap[currentNumber][opt.key]"
                        @change="onAnswerChange"
                        class="accent-green-600"
                      />
                      <span class="text-green-600 font-medium">Benar</span>
                    </label>

                    <label class="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        :name="'pgk-' + opt.key"
                        value="0"
                        v-model="answersMap[currentNumber][opt.key]"
                        @change="onAnswerChange"
                        class="accent-red-600"
                      />
                      <span class="text-red-600 font-medium">Salah</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Isian -->
          <div v-else-if="showIsian" key="ans-isian" class="space-y-4">
            <input
              type="text"
              :key="'input-isian-' + currentNumber"
              v-model="textAnswer"
              @blur="onAnswerChange"
              placeholder="Ketik jawaban Anda di sini"
              class="w-full border rounded px-4 py-2"
            />
          </div>

          <!-- Footer Navigation -->
          <div class="relative flex items-center justify-center mt-8">
            <button
              v-if="soalListDalamKomponen.indexOf(currentNumber) > 0"
              class="absolute left-0 px-6 py-2 bg-red-500 text-white rounded"
              @click="prevQuestion"
            >
              Soal sebelumnya
            </button>

            <button
              :class="
                flagged[currentNumber]
                  ? 'px-8 py-2 rounded-full bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition'
                  : 'px-8 py-2 border-2 border-yellow-400 text-yellow-500 font-semibold rounded-full bg-white hover:bg-yellow-50 transition'
              "
              @click="toggleFlag"
            >
              {{ flagged[currentNumber] ? "Batal ragu-ragu" : "Ragu-ragu" }}
            </button>

            <button
              v-if="soalListDalamKomponen.indexOf(currentNumber) !== -1 && soalListDalamKomponen.indexOf(currentNumber) < soalListDalamKomponen.length - 1"
              class="absolute right-0 px-6 py-2 bg-[#1D546D] text-white rounded"
              @click="nextQuestion"
            >
              Soal berikutnya
            </button>
          </div>
        </div>
      </div>
    </main>
    <!-- Warning Popup -->
    <div v-if="showWarningPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md text-center shadow-xl">
        <h3 class="text-lg font-semibold text-red-600 mb-3">Peringatan!</h3>
        <p class="text-slate-600 mb-4">
          Anda terdeteksi keluar dari tab pengerjaan.
          <br />
          Harap tetap berada di halaman tryout.
        </p>
        <p class="text-sm text-slate-500 mb-6">Peringatan ke-{{ warningCount }}</p>
        <button
          class="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          @click="handleWarningConfirm"
        >
          Saya Mengerti
        </button>
      </div>
    </div>

    <!-- Finish Confirmation Popup -->
    <div v-if="showFinishPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md text-center shadow-xl">
        <h3 class="text-lg font-semibold text-red-600 mb-3">Akhiri Subtes?</h3>
        <p class="text-slate-600 mb-6">
          Waktu pengerjaan untuk subtes <b>{{ activeKomponenNama }}</b> masih tersedia.
          <br />
          Anda yakin ingin mengakhiri lebih awal?
          <br /><br />
          <span class="text-sm text-red-500">Subtes yang telah diakhiri tidak dapat diulangi kembali!</span>
        </p>
        <div class="flex justify-center gap-4">
          <button class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition" @click="showFinishPopup = false">
            Batal
          </button>
          <button
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            @click="handleFinishConfirm"
          >
            Ya, Akhiri
          </button>
        </div>
      </div>
    </div>

    <!-- Global Alert Popup -->
    <div v-if="showAlertPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md text-center shadow-xl">
        <h3 class="text-lg font-semibold mb-3" :class="alertType === 'success' ? 'text-green-600' : 'text-red-600'">
          {{ alertType === "success" ? "Berhasil" : "Terjadi Kesalahan" }}
        </h3>
        <p class="text-slate-600 mb-6">
          {{ alertMessage }}
        </p>
        <button
          class="px-6 py-2 text-white rounded transition"
          :class="alertType === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'"
          @click="handleAlertClose"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from "vue"
import katex from "katex"
import renderMathInElement from "katex/contrib/auto-render"
import "katex/dist/katex.min.css"
import { useRoute } from "vue-router"
import api from "@/services/api"
import { useTryoutStore } from "@/stores/tryoutStore"

const route = useRoute()
const tryoutId = route.params.id
const tryoutStore = useTryoutStore()

const STORAGE_KEY = `tryout-progress-${tryoutId}`

const totalSoal = ref(0)
const currentNumber = ref(1)

const opened = ref({})
const flagged = ref({})
const answered = ref({})
const answersMap = ref({})

const fontSize = ref("text-base")
const answers = ref([])
const singleAnswer = ref("")
const textAnswer = ref("")
const soalText = ref("")
const isLoadingQuestion = ref(false)

const showDaftarSoal = ref(false)
const showFinishPopup = ref(false)
const showAlertPopup = ref(false)
const alertMessage = ref("")
const alertType = ref("success") // success | error
const endTryoutAfterAlert = ref(false)

const pesertaNama = ref("")
const options = ref([])

const soalContainer = ref(null)
const contentContainer = ref(null)

// Cache soal yang sudah pernah di-fetch (key: nomor soal)
// const questionsCache = ref({})

const timer = ref("00:00")
let countdownInterval = null

const activeKomponenNama = ref("")
const loadingNext = ref(false)

const soalListDalamKomponen = computed(() => {
  if (!activeKomponenNama.value || !groupedSoalList.value[activeKomponenNama.value]) return []
  return groupedSoalList.value[activeKomponenNama.value].items
})

// ===== Anti-Cheat & Fullscreen Logic =====
const warningCount = ref(0)
const WARNING_KEY = `tryout-warning-${tryoutId}`
const showWarningPopup = ref(false)
let fullscreenRequested = false
let lastWarningTime = 0
const WARNING_COOLDOWN = 3000 // 1 second to prevent double trigger

function requestFullscreen() {
  const elem = document.documentElement
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen()
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    const now = Date.now()
    if (now - lastWarningTime < WARNING_COOLDOWN) return
    lastWarningTime = now

    warningCount.value++
    localStorage.setItem(WARNING_KEY, warningCount.value)
    showWarningPopup.value = true

    if (warningCount.value >= 100) {
      finishTryout()
    }
  }
}

function handleWindowBlur() {
  const now = Date.now()
  if (now - lastWarningTime < WARNING_COOLDOWN) return
  lastWarningTime = now

  warningCount.value++
  localStorage.setItem(WARNING_KEY, warningCount.value)
  showWarningPopup.value = true

  if (warningCount.value >= 100) {
    finishTryout()
  }
}

function handleWarningConfirm() {
  showWarningPopup.value = false

  // Re-request fullscreen if user exited
  const elem = document.documentElement
  if (!document.fullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    }
  }
}

function renderKatex() {
  nextTick(() => {
    if (!contentContainer.value) return

    renderMathInElement(contentContainer.value, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    })
  })
}

const tipeSoal = ref("pg") // pg | pg_kompleks | isian

async function fetchAllQuestions() {
  isLoadingQuestion.value = true

  console.log("Fetching all questions for tryout ID:", tryoutId)
  const res = await api.get(`/user/tryout/${tryoutId}/questions`)
  console.log("Questions response:", res.data)

  // Pastikan benar-benar array
  let list = []

  if (Array.isArray(res.data)) {
    list = res.data
  } else if (Array.isArray(res.data.data)) {
    list = res.data.data
  } else if (Array.isArray(res.data.data?.data)) {
    list = res.data.data.data
  }

  if (!Array.isArray(list)) {
    console.error("Questions response is not array:", res.data)
    isLoadingQuestion.value = false
    return
  }

  totalSoal.value = list.length

  list.forEach((q, index) => {
    const nomor = index + 1

    let tipe = "isian"

    if (q.tipe) {
      // Gunakan tipe dari backend langsung
      tipe = q.tipe
    } else if (Array.isArray(q.opsi)) {
      if (q.opsi.length > 1) {
        tipe = "pg_kompleks"
      } else if (q.opsi.length === 1) {
        tipe = "pg"
      }
    }

    tryoutStore.questionsCache[nomor] = {
      tipe,
      total_soal: list.length,
      pertanyaan: q.pertanyaan,
      opsi: q.opsi,
      peserta: q.peserta,
      komponen_nama: q.komponen_nama
    }
  })

  isLoadingQuestion.value = false
}

const groupedSoalList = computed(() => {
  const groups = {}

  for (let n = 1; n <= totalSoal.value; n++) {
    const q = tryoutStore.questionsCache[n]
    if (!q) continue

    const namaKomponen = q.komponen_nama || "Lainnya"
    if (!groups[namaKomponen]) {
      groups[namaKomponen] = {
        nama: namaKomponen,
        items: []
      }
    }
    groups[namaKomponen].items.push(n)
  }

  return groups
})

const showOptions = computed(() => {
  return tipeSoal.value === "pg" || tipeSoal.value === "pg_majemuk" || tipeSoal.value === "pg_kompleks"
})

const showIsian = computed(() => {
  return tipeSoal.value === "isian"
})

async function fetchQuestion(n) {
  isLoadingQuestion.value = true
  // ===== CEK CACHE DULU =====
  if (tryoutStore.questionsCache[n]) {
    const cached = tryoutStore.questionsCache[n]

    tipeSoal.value = cached.tipe
    totalSoal.value = cached.total_soal
    soalText.value = cached.pertanyaan
    options.value = cached.opsi || []
    pesertaNama.value = cached.peserta

    // Ensure answersMap slot exists to prevent undefined errors
    if (!answersMap.value[n]) {
      if (tipeSoal.value === "pg") {
        answersMap.value[n] = []
      } else if (tipeSoal.value === "pg_majemuk") {
        answersMap.value[n] = []
      } else if (tipeSoal.value === "isian") {
        answersMap.value[n] = []
      } else if (tipeSoal.value === "pg_kompleks") {
        answersMap.value[n] = {}
      }
    }

    restoreAnswerState(n)
    renderKatex()
    isLoadingQuestion.value = false
    return
  }

  isLoadingQuestion.value = false
  return
}

async function saveAnswer(finalAnswer) {
  const tessimpan = await api.post(`/user/tryout/${tryoutId}/answer`, {
    nomor: currentNumber.value,
    jawaban: finalAnswer
  })
  console.log("Save answer response:", tessimpan)
}

function normalizeAnswer() {
  if (tipeSoal.value === "pg") {
    return singleAnswer.value ? [singleAnswer.value] : []
  }

  if (tipeSoal.value === "pg_majemuk") {
    return answersMap.value[currentNumber.value] || []
  }

  if (tipeSoal.value === "isian") {
    return textAnswer.value ? [textAnswer.value] : []
  }

  if (tipeSoal.value === "pg_kompleks") {
    return answersMap.value[currentNumber.value] || {}
  }

  return []
}

function restoreAnswerState(n) {
  const saved = answersMap.value[n]

  if (saved) {
    if (tipeSoal.value === "pg") {
      singleAnswer.value = saved[0] || ""
    } else if (tipeSoal.value === "isian") {
      textAnswer.value = saved[0] || ""
    }
  } else {
    singleAnswer.value = ""
    textAnswer.value = ""
  }
}

function saveProgress() {
  const payload = {
    currentNumber: currentNumber.value,
    opened: opened.value,
    flagged: flagged.value,
    answered: answered.value,
    answersMap: answersMap.value
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return

  try {
    const data = JSON.parse(raw)
    currentNumber.value = data.currentNumber || 1
    opened.value = data.opened || {}
    flagged.value = data.flagged || {}
    answered.value = data.answered || {}
    answersMap.value = data.answersMap || {}
  } catch (e) {
    console.warn("Failed to load progress", e)
  }
}

function openQuestion(n) {
  currentNumber.value = n
  opened.value[n] = true
  fetchQuestion(n)
  saveProgress()
}

function onAnswerChange() {
  answered.value[currentNumber.value] = true
  answersMap.value[currentNumber.value] = normalizeAnswer()
  saveProgress()
  saveAnswer(normalizeAnswer())
}

function toggleFlag() {
  flagged.value[currentNumber.value] = !flagged.value[currentNumber.value]
  saveProgress()
}

function statusClass(n) {
  if (currentNumber.value === n) return "bg-[#1D546D] text-white"
  if (flagged.value[n]) return "bg-yellow-400 text-white"
  if (answered.value[n]) return "bg-green-500 text-white"
  if (opened.value[n]) return "bg-black text-white"
  return "bg-white"
}

onMounted(async () => {
  // Restore warning count from localStorage
  const savedWarning = localStorage.getItem(WARNING_KEY)
  if (savedWarning) {
    warningCount.value = parseInt(savedWarning)
  }

  // Always try to request fullscreen on mount
  setTimeout(() => {
    if (!document.fullscreenElement) {
      requestFullscreen()
    }
  }, 500)

  document.addEventListener("visibilitychange", handleVisibilityChange)
  document.addEventListener("copy", (e) => e.preventDefault())
  document.addEventListener("cut", (e) => e.preventDefault())
  document.addEventListener("contextmenu", (e) => e.preventDefault())
  window.addEventListener("blur", handleWindowBlur)

  loadProgress()

  // Cek apakah tryout masih bisa dikerjakan
  try {
    const res = await api.get(`/user/tryout/${tryoutId}/remaining-time`)
    console.log("Remaining time response:", res.data)
    const remaining = Math.floor(res.data.sisa_detik)

    if (remaining <= 0) {
      alertType.value = "error"
      alertMessage.value = "Waktu tryout sudah berakhir atau tryout sudah disubmit."
      showAlertPopup.value = true

      setTimeout(() => {
        window.location.href = "/tryout"
      }, 1500)

      return
    }
  } catch (e) {
    console.error("Failed to validate tryout time", e)
  }

  await fetchAllQuestions()
  await startCountdown()

  if (soalListDalamKomponen.value.length > 0) {
     if (!soalListDalamKomponen.value.includes(currentNumber.value)) {
         openQuestion(soalListDalamKomponen.value[0])
     } else {
         fetchQuestion(currentNumber.value)
     }
  }
  
  renderKatex()
})

onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", handleVisibilityChange)
  document.removeEventListener("copy", (e) => e.preventDefault())
  document.removeEventListener("cut", (e) => e.preventDefault())
  document.removeEventListener("contextmenu", (e) => e.preventDefault())
  window.removeEventListener("blur", handleWindowBlur)

  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})

function formatTime(totalSeconds) {
  totalSeconds = Math.max(0, Math.floor(totalSeconds))

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

async function startCountdown() {
  try {
    const res = await api.get(`/user/tryout/${tryoutId}/remaining-time`)
    let remaining = Math.floor(res.data.sisa_detik)
    
    activeKomponenNama.value = res.data.komponen_nama || '-'
    
    // Jika waktu tryout sudah habis sebelum halaman dibuka
    if (remaining <= 0 && !res.data.komponen_id) {
      alertType.value = "error"
      alertMessage.value = "Waktu tryout sudah berakhir atau tryout sudah diselesaikan. Anda akan diarahkan keluar."
      showAlertPopup.value = true

      setTimeout(() => {
        window.location.href = "/tryout"
      }, 1500)

      return
    }

    if (remaining <= 0 && res.data.komponen_id) {
        // jika refres di posisi detik 0 maka panggil alert waktu habis
        handleTimeUp()
        return
    }

    console.log("Remaining time (seconds):", remaining)
    timer.value = formatTime(remaining)

    if (countdownInterval) {
      clearInterval(countdownInterval)
    }

    countdownInterval = setInterval(() => {
      if (remaining > 0) {
        remaining--
        timer.value = formatTime(remaining)
      } else {
        clearInterval(countdownInterval)
        handleTimeUp()
      }
    }, 1000)
  } catch (e) {
    console.error("Failed to start countdown", e)
  }
}

function prevQuestion() {
  const arr = soalListDalamKomponen.value;
  const idx = arr.indexOf(currentNumber.value);
  if (idx > 0) {
    openQuestion(arr[idx - 1]);
  }
}

function nextQuestion() {
  const arr = soalListDalamKomponen.value;
  const idx = arr.indexOf(currentNumber.value);
  if (idx !== -1 && idx < arr.length - 1) {
    openQuestion(arr[idx + 1]);
  }
}

function handleFinishConfirm() {
  showFinishPopup.value = false
  moveToNextKomponen()
}

function handleAlertClose() {
  showAlertPopup.value = false

  if (endTryoutAfterAlert.value) {
    endTryoutAfterAlert.value = false
    finishTryout()
    return
  }

  if (alertType.value === "success") {
    window.location.href = "/tryout/hasil/" + tryoutId
  }
}

function handleTimeUp() {
  alertType.value = "error"
  alertMessage.value = "Waktu pengerjaan untuk subtes ini telah habis. Klik OK untuk menyimpan jawaban dan melanjutkan ke subtes berikutnya."
  showAlertPopup.value = true
  endTryoutAfterAlert.value = true
}

async function moveToNextKomponen() {
  if (loadingNext.value) return
  loadingNext.value = true
  
  try {
    const res = await api.post(`/user/tryout/${tryoutId}/next-komponen`)
    
    if (res.data.is_finished) {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(WARNING_KEY)
      alertType.value = "success"
      alertMessage.value = "Tryout berhasil diselesaikan!"
      showAlertPopup.value = true
    } else {
      // Pindah ke subtes selanjutnya
      await startCountdown()

      if (soalListDalamKomponen.value.length > 0) {
        openQuestion(soalListDalamKomponen.value[0])
      }
    }
  } catch (e) {
    alertType.value = "error"
    alertMessage.value = "Gagal memproses alur subtes"
    showAlertPopup.value = true
    console.error(e)
  } finally {
    loadingNext.value = false
  }
}

async function finishTryout() {
  moveToNextKomponen()
}
</script>
