<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F3F4F4] via-white to-[#5F9598]/12 px-6"
  >
    <div class="max-w-2xl w-full bg-white rounded-2xl shadow-xl border p-10 text-center">
      <div class="mb-6">
        <div
          class="w-16 h-16 mx-auto bg-[#F3F4F4] text-[#1D546D] flex items-center justify-center rounded-full text-2xl font-bold"
        >
          🎓
        </div>
      </div>

      <h1 class="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Aktivasi Program SNBT Next Level Study</h1>

      <p class="text-slate-600 leading-relaxed mb-6">
        Akun Anda belum dihubungkan ke batch tryout atau program SNBT Next Level Study yang sedang berjalan.
      </p>

      <div class="text-left space-y-4 text-slate-700">
        <div class="flex items-start gap-3">
          <div class="w-6 h-6 flex items-center justify-center bg-[#1D546D] text-white rounded-full text-sm">1</div>
          <p>
            Siswa menghubungi
            <strong>admin sekolah, mentor, atau PIC program</strong>
            untuk mengajukan aktivasi akun.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-6 h-6 flex items-center justify-center bg-[#1D546D] text-white rounded-full text-sm">2</div>
          <p>
            PIC akan menghubungi
            <strong>Tim Next Level Study (NLS)</strong>
            untuk verifikasi paket belajar atau batch tryout yang sesuai.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-6 h-6 flex items-center justify-center bg-[#1D546D] text-white rounded-full text-sm">3</div>
          <p>
            Tim Next Level Study akan melakukan verifikasi dan
            <strong>mengaktifkan akun peserta</strong>
            agar Anda bisa mengakses dashboard, tryout, dan analisis hasil.
          </p>
        </div>
      </div>

      <div class="mt-8 p-4 bg-[#F3F4F4] rounded-lg text-sm text-[#1D546D]">
        Setelah akun aktif, Anda dapat langsung mengerjakan tryout SNBT dan memantau progres persiapan SNBT.
      </div>

      <div class="mt-6 text-center">
        <button type="button" @click="handleLogout" class="text-sm text-slate-500 hover:text-red-600 transition">
          Logout / Kembali ke Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const handleLogout = () => {
  localStorage.removeItem("auth_token")
  window.location.href = "/"
}
</script>
