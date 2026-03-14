<template>
  <div class="bg-slate-100 font-poppins min-h-screen">
    <div class="flex min-h-screen">
      <Sidebar />

      <div class="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        <div class="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/30 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl"></div>

        <!-- Main Card -->
        <div class="relative w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">
          <!-- Gradient Background -->
          <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-sky-900 to-cyan-600"></div>

          <!-- Overlay Pattern Effect -->
          <div class="absolute inset-0 bg-black/10"></div>

          <!-- Content -->
          <div class="relative z-10 text-center text-white px-12 py-16 flex flex-col items-center">
            <div class="text-7xl mb-6 animate-bounce">📘</div>

            <h1 class="text-5xl font-extrabold mb-4 tracking-tight">Fokus UTBK</h1>

            <p class="text-white/90 text-lg leading-relaxed mb-10 max-w-2xl">
              Halaman ini disiapkan sebagai pusat strategi belajar UTBK. Kamu akan diarahkan untuk belajar berdasarkan
              subtes, tingkat kesulitan, dan target kampus, bukan sekadar mengerjakan soal sebanyak mungkin.
            </p>

            <!-- Feature Preview Boxes -->
            <div class="grid md:grid-cols-3 gap-6 w-full mb-10">
              <div class="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30">
                <h3 class="font-semibold mb-2">🎯 Rencana Belajar</h3>
                <p class="text-sm text-white/80">Prioritas mingguan berdasarkan subtes yang paling lemah.</p>
              </div>

              <div class="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30">
                <h3 class="font-semibold mb-2">📊 Analisis Subtes</h3>
                <p class="text-sm text-white/80">Lihat blok soal yang paling sering menurunkan skor total.</p>
              </div>

              <div class="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30">
                <h3 class="font-semibold mb-2">📚 Paket Drill</h3>
                <p class="text-sm text-white/80">Latihan singkat untuk literasi, kuantitatif, dan penalaran.</p>
              </div>
            </div>

            <div class="bg-white text-sky-700 font-semibold px-8 py-3 rounded-full shadow-lg">
              Segera jadi pusat strategi belajar UTBK
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/layout/Sidebar.vue"
</script>
