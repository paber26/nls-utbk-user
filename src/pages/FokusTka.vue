<template>
  <div class="bg-slate-100 font-poppins min-h-screen">
    <div class="flex min-h-screen">
      <Sidebar />

      <div class="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        <!-- Animated Gradient Blobs -->
        <div class="blob blob1"></div>
        <div class="blob blob2"></div>

        <div class="relative w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-[#061E29] via-[#1D546D] to-[#5F9598]"></div>

          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/10"></div>

          <!-- Content -->
          <div class="relative z-10 text-center text-white px-12 py-16 flex flex-col items-center">
            <div class="text-7xl mb-6 floating-icon">🎯</div>

            <h1 class="text-5xl font-extrabold mb-4 tracking-tight">Target PTN</h1>

            <p class="text-white/90 text-lg leading-relaxed mb-10 max-w-2xl">
              Halaman ini akan membantu kamu menyusun strategi berdasarkan target kampus dan program studi. Fokusnya
              bukan hanya belajar, tetapi memastikan skor tryout bergerak ke rentang yang kamu butuhkan.
            </p>

            <!-- Feature Preview -->
            <div class="grid md:grid-cols-3 gap-6 w-full mb-10">
              <div class="feature-card">
                <h3 class="font-semibold mb-2">🏛️ Daftar PTN Target</h3>
                <p class="text-sm text-white/80">Simpan kampus dan prodi incaran dalam satu panel strategi.</p>
              </div>

              <div class="feature-card delay-1">
                <h3 class="font-semibold mb-2">📈 Tracking Skor</h3>
                <p class="text-sm text-white/80">Bandingkan progres skor dengan target aman yang kamu tetapkan.</p>
              </div>

              <div class="feature-card delay-2">
                <h3 class="font-semibold mb-2">🗺️ Rencana Belajar</h3>
                <p class="text-sm text-white/80">Susun prioritas belajar yang mendukung kampus tujuanmu.</p>
              </div>
            </div>

            <div
              class="bg-white text-[#1D546D] font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Segera hadir: target kampus dan strategi skor
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

<style scoped>
.blob {
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 9999px;
  filter: blur(80px);
  opacity: 0.35;
  animation: floatBlob 12s ease-in-out infinite;
}

.blob1 {
  top: -120px;
  right: -120px;
  background: #6366f1;
}

.blob2 {
  bottom: -120px;
  left: -120px;
  background: #3b82f6;
  animation-delay: 4s;
}

@keyframes floatBlob {
  0%,
  100% {
    transform: translate(0px, 0px) scale(1);
  }
  50% {
    transform: translate(40px, -40px) scale(1.1);
  }
}

.floating-icon {
  animation: floatIcon 4s ease-in-out infinite;
}

@keyframes floatIcon {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
}

.feature-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 20px;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.delay-1 {
  animation-delay: 0.5s;
}

.delay-2 {
  animation-delay: 1s;
}
</style>
