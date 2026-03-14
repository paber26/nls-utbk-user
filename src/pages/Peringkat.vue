<template>
  <div class="bg-bgsoft font-poppins">
    <div class="flex min-h-screen">
      <Sidebar></Sidebar>
      <!-- ================= MAIN ================= -->
      <main class="flex-1">
        <TopbarPeringkat></TopbarPeringkat>

        <!-- Content -->
        <div class="px-6 py-8 flex items-center justify-center min-h-[70vh] relative overflow-hidden">
          <!-- Animated Background Blobs -->
          <div class="absolute -top-32 -left-32 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            class="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse"
          ></div>

          <div class="relative bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full border">
            <div class="text-6xl mb-6 animate-bounce">🏆</div>

            <h1 class="text-4xl font-bold text-slate-800 mb-4">Peringkat Simulasi UTBK</h1>

            <p class="text-slate-500 text-lg leading-relaxed mb-8">
              Kami sedang menyiapkan leaderboard yang menampilkan peringkat per paket, per subtes, dan per batch agar
              evaluasi kompetisimu terasa lebih relevan dibanding sekadar skor mentah.
            </p>

            <div class="bg-gradient-to-r from-indigo-500 to-sky-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg">
              🚀 Coming Soon 2026
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/layout/Sidebar.vue"
import TopbarPeringkat from "../components/layout/TopbarPeringkat.vue"
</script>
