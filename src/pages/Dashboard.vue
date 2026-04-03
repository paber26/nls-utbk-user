<template>
  <div class="bg-bgsoft font-poppins min-h-screen">
    <div class="flex min-h-screen">
      <Sidebar />

      <main class="flex-1">
        <TopbarDashboard />

        <div class="px-6 py-10 max-w-6xl mx-auto space-y-8">
          <section class="rounded-3xl overflow-hidden bg-[#061E29] text-white relative">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(95,149,152,0.28),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(29,84,109,0.24),_transparent_34%)]"></div>
            <div class="relative px-8 py-10 md:px-10 md:py-12 grid lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
              <div>
                <p class="text-sm uppercase tracking-[0.3em] text-[#5F9598]">Next Level Study SNBT</p>
                <h1 class="mt-4 text-3xl md:text-5xl font-bold leading-tight">
                  Platform latihan SNBT untuk bantu kamu tembus PTN target
                </h1>
                <p class="mt-4 max-w-2xl text-slate-300 text-base md:text-lg leading-relaxed">
                  Fokus pada tryout terukur, evaluasi komponen, dan strategi belajar yang realistis supaya progresmu
                  terasa dari minggu ke minggu.
                </p>

                <div class="mt-8 flex flex-wrap gap-3">
                  <RouterLink
                    to="/tryout"
                    class="px-5 py-3 rounded-xl bg-[#5F9598] text-[#061E29] font-semibold hover:brightness-105 transition"
                  >
                    Mulai Tryout
                  </RouterLink>
                  <RouterLink
                    to="/fokus-snbt"
                    class="px-5 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
                  >
                    Lihat Strategi Belajar
                  </RouterLink>
                </div>
              </div>

              <div class="grid gap-4">
                <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p class="text-sm text-white/75">Target skor mingguan</p>
                  <p class="mt-2 text-3xl font-bold">695+</p>
                  <p class="mt-2 text-sm text-white/60">Naikkan fokus pada literasi dan penalaran matematika.</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p class="text-sm text-white/75">Paket aktif</p>
                    <p class="mt-2 text-2xl font-bold">12</p>
                  </div>
                  <div class="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p class="text-sm text-white/75">Progress</p>
                    <p class="mt-2 text-2xl font-bold">74%</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="grid lg:grid-cols-3 gap-6">
            <article class="bg-white border rounded-2xl p-6">
              <p class="text-sm text-slate-500">Langkah 1</p>
              <h2 class="mt-2 text-xl font-semibold text-slate-800">Petakan kemampuan awal</h2>
              <p class="mt-3 text-slate-600 leading-relaxed">
                Kerjakan tryout diagnostik untuk melihat komponen mana yang paling banyak menahan skor kamu.
              </p>
            </article>

            <article class="bg-white border rounded-2xl p-6">
              <p class="text-sm text-slate-500">Langkah 2</p>
              <h2 class="mt-2 text-xl font-semibold text-slate-800">Perbaiki per komponen</h2>
              <p class="mt-3 text-slate-600 leading-relaxed">
                Belajar dengan target kecil yang jelas: akurasi soal, kecepatan membaca, dan manajemen waktu.
              </p>
            </article>

            <article class="bg-white border rounded-2xl p-6">
              <p class="text-sm text-slate-500">Langkah 3</p>
              <h2 class="mt-2 text-xl font-semibold text-slate-800">Ulangi simulasi berkala</h2>
              <p class="mt-3 text-slate-600 leading-relaxed">
                Pantau apakah strategi belajar kamu benar-benar berdampak terhadap skor total dan konsistensinya.
              </p>
            </article>
          </section>

          <section class="grid lg:grid-cols-[1.3fr_1fr] gap-6">
            <div class="bg-white border rounded-2xl p-6">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <h2 class="text-2xl font-semibold text-slate-800">Fokus latihan minggu ini</h2>
                  <p class="mt-2 text-slate-500">Susun prioritas dari komponen yang paling sering menurunkan skor.</p>
                </div>
                <span class="px-3 py-1 rounded-full bg-[#5F9598]/15 text-[#1D546D] text-sm font-medium">Prioritas</span>
              </div>

              <div class="mt-6 grid md:grid-cols-2 gap-4">
                <div class="rounded-2xl bg-slate-50 border p-5">
                  <p class="text-sm text-slate-500">TPS</p>
                  <h3 class="mt-2 font-semibold text-slate-800">Penalaran Umum</h3>
                  <p class="mt-2 text-sm text-slate-600">Latih inferensi, logika argumen, dan ketelitian membaca tabel.</p>
                </div>

                <div class="rounded-2xl bg-slate-50 border p-5">
                  <p class="text-sm text-slate-500">Literasi</p>
                  <h3 class="mt-2 font-semibold text-slate-800">Bahasa Indonesia & Inggris</h3>
                  <p class="mt-2 text-sm text-slate-600">Perkuat kemampuan memahami ide utama, nada penulis, dan informasi implisit.</p>
                </div>

                <div class="rounded-2xl bg-slate-50 border p-5">
                  <p class="text-sm text-slate-500">Kuantitatif</p>
                  <h3 class="mt-2 font-semibold text-slate-800">Pengetahuan Kuantitatif</h3>
                  <p class="mt-2 text-sm text-slate-600">Fokus ke rasio, persentase, pola, dan interpretasi data numerik.</p>
                </div>

                <div class="rounded-2xl bg-slate-50 border p-5">
                  <p class="text-sm text-slate-500">Strategi</p>
                  <h3 class="mt-2 font-semibold text-slate-800">Manajemen waktu</h3>
                  <p class="mt-2 text-sm text-slate-600">Jangan habiskan waktu terlalu lama di satu soal; utamakan soal dengan peluang benar tinggi.</p>
                </div>
              </div>
            </div>

            <div class="bg-white border rounded-2xl p-6">
              <h2 class="text-2xl font-semibold text-slate-800">Roadmap 4 Minggu</h2>
              <div class="mt-6 space-y-4">
                <div class="rounded-2xl bg-slate-50 border p-4">
                  <p class="text-sm font-medium text-[#1D546D]">Minggu 1</p>
                  <p class="mt-2 text-sm text-slate-600">Tryout diagnostik dan baca pola salah terbanyak.</p>
                </div>
                <div class="rounded-2xl bg-slate-50 border p-4">
                  <p class="text-sm font-medium text-[#1D546D]">Minggu 2</p>
                  <p class="mt-2 text-sm text-slate-600">Latihan komponen lemah dengan sesi singkat tapi konsisten.</p>
                </div>
                <div class="rounded-2xl bg-slate-50 border p-4">
                  <p class="text-sm font-medium text-[#1D546D]">Minggu 3</p>
                  <p class="mt-2 text-sm text-slate-600">Simulasi penuh dan evaluasi pacing tiap blok soal.</p>
                </div>
                <div class="rounded-2xl bg-slate-50 border p-4">
                  <p class="text-sm font-medium text-[#1D546D]">Minggu 4</p>
                  <p class="mt-2 text-sm text-slate-600">Ulangi tryout dan bandingkan peningkatan akurasi serta skor total.</p>
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
import { RouterLink } from "vue-router"

import Sidebar from "../components/layout/Sidebar.vue"
import TopbarDashboard from "../components/layout/TopbarDashboard.vue"
</script>
