<template>
  <div class="min-h-screen bg-[#F3F4F4] font-poppins text-slate-900">
    <div class="flex min-h-screen flex-col lg:flex-row">
      <section class="relative overflow-hidden bg-[#061E29] px-8 py-16 text-white flex flex-col justify-center lg:w-1/2 lg:px-16 xl:px-24">
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(95,149,152,0.32),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(29,84,109,0.45),_transparent_30%)]"
        ></div>
        <div class="relative z-10 flex w-full flex-col justify-between max-w-2xl mx-auto lg:mx-0">
          <div>
            <div
              class="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur animate-fade-in"
            >
              <img
                src="/nls-logo-300.png"
                alt="Next Level Study Logo"
                class="h-8 w-8 rounded-full bg-white/90 object-cover p-1"
              />
              <div>
                <p class="text-xs uppercase tracking-[0.26em] text-white/60">Next Level Study</p>
                <p class="text-sm font-medium text-[#5F9598]">Platform Persiapan SNBT</p>
              </div>
            </div>

            <div class="mt-14 max-w-2xl animate-slide-up" style="animation-delay: 0.1s;">
              <p class="text-sm uppercase tracking-[0.28em] text-[#5F9598]">Simulasi yang terarah</p>
              <h1 class="mt-4 text-4xl font-bold leading-tight md:text-5xl xl:text-[3.5rem]">
                Latihan SNBT yang terasa seperti dashboard belajar, bukan sekadar halaman login
              </h1>
              <p class="mt-6 max-w-xl text-base leading-relaxed text-white/74 md:text-lg">
                Masuk untuk mengakses tryout, membaca analisis hasil, dan menyusun ritme belajar menuju target skor SNBT
                yang lebih realistis.
              </p>
            </div>

            <div class="mt-14 grid gap-5 sm:grid-cols-3 animate-slide-up" style="animation-delay: 0.2s;">
              <article
                v-for="item in highlights"
                :key="item.title"
                class="rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur hover:bg-white/10 transition-colors"
              >
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">{{ item.eyebrow }}</p>
                <h2 class="mt-3 text-lg font-semibold">{{ item.title }}</h2>
                <p class="mt-2 text-sm leading-relaxed text-white/68">{{ item.description }}</p>
              </article>
            </div>
          </div>

          <div class="mt-16 animate-slide-up" style="animation-delay: 0.3s;">
            <div
              class="grid gap-6 rounded-[2rem] border border-white/10 bg-white/6 p-8 backdrop-blur xl:grid-cols-[1.2fr_1fr]"
            >
              <div>
                <p class="text-sm uppercase tracking-[0.22em] text-white/45 font-semibold">Kenapa Next Level Study</p>
                <h2 class="mt-3 text-2xl font-semibold">Belajar lebih rapi dari satu tempat</h2>
                <div class="mt-6 grid gap-3 sm:grid-cols-2">
                  <div
                    v-for="point in sellingPoints"
                    :key="point"
                    class="rounded-xl border border-white/8 bg-black/10 px-4 py-3.5 text-sm text-white/72 transition-all hover:border-white/20 hover:text-white"
                  >
                    {{ point }}
                  </div>
                </div>
              </div>

              <div class="rounded-2xl bg-[#5F9598] px-6 py-7 text-[#061E29] hover:bg-[#6CA8AB] transition-colors flex flex-col justify-center">
                <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#061E29]/60">Target Belajar</p>
                <div class="mt-6 space-y-5">
                  <div>
                    <p class="text-3xl font-bold">12+</p>
                    <p class="mt-1 text-sm font-medium text-[#061E29]/80">paket simulasi dan latihan bertahap</p>
                  </div>
                  <div>
                    <p class="text-3xl font-bold">3 fokus</p>
                    <p class="mt-1 text-sm font-medium text-[#061E29]/80">TPS, literasi, penalaran matematika</p>
                  </div>
                  <div class="hidden xl:block">
                    <p class="text-3xl font-bold">1 panel</p>
                    <p class="mt-1 text-sm font-medium text-[#061E29]/80">pantau hasil dan strategi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="flex flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:px-12 xl:px-20 animate-fade-in" style="animation-delay: 0.4s;">
        <div class="w-full max-w-md xl:max-w-lg">
          <div class="rounded-[2.5rem] border border-slate-200/60 bg-white p-8 sm:p-10 shadow-[0_24px_60px_rgba(6,30,41,0.06)]">
            <div class="mb-10">
              <p class="text-sm font-semibold uppercase tracking-[0.28em] text-[#5F9598]">Login Peserta</p>
              <h2 class="mt-4 text-3xl sm:text-4xl font-bold text-[#061E29]">Masuk ke dashboard SNBT</h2>
              <p class="mt-4 text-sm sm:text-base leading-relaxed text-slate-500">
                Gunakan email terdaftar atau lanjutkan dengan Google untuk mengakses akun tryout kamu.
              </p>
            </div>

            <form @submit.prevent="loginWithEmail" class="space-y-5">
              <div>
                <label class="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input
                  v-model="email"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  class="w-full rounded-2xl border border-slate-200 bg-[#F8F9FA] px-5 py-3.5 focus:border-[#5F9598] focus:bg-white focus:ring-4 focus:ring-[#5F9598]/20 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <input
                  v-model="password"
                  type="password"
                  required
                  placeholder="Masukkan password"
                  class="w-full rounded-2xl border border-slate-200 bg-[#F8F9FA] px-5 py-3.5 focus:border-[#5F9598] focus:bg-white focus:ring-4 focus:ring-[#5F9598]/20 focus:outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="mt-2 w-full rounded-2xl bg-[#1D546D] py-4 text-white font-semibold shadow-md transition-all hover:bg-[#154256] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
              >
                <span v-if="!loading">Masuk dengan Email</span>
                <span v-else>Memproses...</span>
              </button>
            </form>

            <div class="my-8 flex items-center gap-4">
              <div class="h-px flex-1 bg-slate-200"></div>
              <span class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Atau</span>
              <div class="h-px flex-1 bg-slate-200"></div>
            </div>

            <button
              @click="loginWithGoogle"
              class="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-slate-100 bg-white py-3.5 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-200"
            >
              <svg class="h-5 w-5" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.14 0 5.95 1.08 8.16 2.85l6.09-6.09C34.6 2.66 29.67 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.33 5.69C11.57 13.32 17.29 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.1 24.55c0-1.64-.15-3.21-.42-4.73H24v9.02h12.41c-.54 2.9-2.17 5.36-4.61 7.02l7.06 5.49C43.02 37.14 46.1 31.36 46.1 24.55z"
                />
                <path
                  fill="#FBBC05"
                  d="M9.89 28.91c-.48-1.44-.76-2.98-.76-4.57s.27-3.13.76-4.57l-7.33-5.69C.93 17.15 0 20.46 0 24.34c0 3.88.93 7.19 2.56 10.26l7.33-5.69z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c5.67 0 10.6-1.87 14.14-5.09l-7.06-5.49c-1.96 1.32-4.47 2.1-7.08 2.1-6.71 0-12.43-3.82-14.11-9.41l-7.33 5.69C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              <span class="font-semibold text-slate-700">Masuk dengan Google</span>
            </button>

            <div class="mt-10 rounded-2xl bg-slate-50/80 border border-slate-100 p-5">
              <p class="text-sm font-semibold text-slate-800">Akses peserta mencakup:</p>
              <div class="mt-4 grid gap-3 text-sm text-slate-600">
                <div v-for="access in accessItems" :key="access" class="flex items-start gap-3">
                  <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5F9598]/20 text-[#1D546D] mt-0.5">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                  </span>
                  <span class="leading-relaxed">{{ access }}</span>
                </div>
              </div>
            </div>

            <p class="mt-8 text-center text-xs leading-relaxed text-slate-400">
              Dengan masuk, Anda menyetujui
              <a href="#" class="text-slate-600 font-medium hover:text-[#1D546D] underline decoration-slate-300 underline-offset-2">Syarat & Ketentuan</a>
              serta
              <a href="#" class="text-slate-600 font-medium hover:text-[#1D546D] underline decoration-slate-300 underline-offset-2">Kebijakan Privasi</a>.
            </p>
          </div>
        </div>
      </section>
    </div>

    <div
      v-if="popup.show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#061E29]/45 px-6 backdrop-blur-sm"
    >
      <div
        class="w-full max-w-sm rounded-[1.75rem] border border-[#1D546D]/10 bg-white p-6 shadow-[0_24px_70px_rgba(6,30,41,0.20)]"
      >
        <div class="flex items-start gap-4">
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
            :class="popup.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-[#5F9598]/18 text-[#1D546D]'"
          >
            <span class="text-lg font-semibold">{{ popup.type === "error" ? "!" : "i" }}</span>
          </div>

          <div class="flex-1">
            <p class="text-lg font-semibold text-[#061E29]">{{ popup.title }}</p>
            <p class="mt-2 text-sm leading-relaxed text-slate-500">{{ popup.message }}</p>
          </div>
        </div>

        <button
          type="button"
          @click="closePopup"
          class="mt-6 w-full rounded-xl bg-[#1D546D] py-3 text-sm font-medium text-white transition hover:brightness-110"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"

const email = ref("")
const password = ref("")
const loading = ref(false)
const popup = ref({
  show: false,
  type: "info",
  title: "",
  message: ""
})

const showPopup = ({ type = "info", title, message }) => {
  popup.value = {
    show: true,
    type,
    title,
    message
  }
}

const closePopup = () => {
  popup.value.show = false
}

const highlights = [
  {
    eyebrow: "Tryout",
    title: "Simulasi bertahap",
    description: "Mulai dari drill subtes sampai simulasi penuh tanpa pindah platform."
  },
  {
    eyebrow: "Analisis",
    title: "Baca progresmu",
    description: "Lihat bagian yang masih menahan skor dan fokuskan latihan ke situ."
  },
  {
    eyebrow: "Strategi",
    title: "Belajar lebih terarah",
    description: "Gunakan hasil tryout untuk menyusun ritme belajar yang lebih realistis."
  }
]

const sellingPoints = [
  "Akses tryout aktif dan batch berikutnya",
  "Ringkasan hasil lengkap dengan pembahasan",
  "Monitoring progres dari satu dashboard",
  "Persiapan subtes SNBT dalam alur yang rapi"
]

const accessItems = [
  "Paket tryout SNBT dan simulasi penuh",
  "Hasil pengerjaan, pembahasan, dan ringkasan jawaban",
  "Target belajar, roadmap, dan fokus subtes"
]

const loginWithGoogle = () => {
  window.location.href = import.meta.env.VITE_API_URL + "/auth/google?role=user"
}

const loginWithEmail = async () => {
  try {
    loading.value = true

    const response = await axios.post(import.meta.env.VITE_API_URL + "/login", {
      email: email.value,
      password: password.value
    })

    const token = response.data.token

    localStorage.setItem("auth_token", token)

    window.location.href = "/"
  } catch (error) {
    showPopup({
      type: "error",
      title: "Login gagal",
      message: "Email atau password salah. Periksa kembali data login Anda lalu coba lagi."
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-slide-up {
  animation: fadeInUp 0.8s ease-out both;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out both;
}
</style>
