<template>
  <div class="bg-slate-100 font-poppins">
    <div class="flex min-h-screen">
      <Sidebar />

      <!-- ================= MAIN CONTENT ================= -->
      <main class="flex-1">
        <TopbarDashboard />

        <div class="px-6 py-8">
          <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border p-8">
            <div v-if="initialLoading" class="flex items-center justify-center py-10">
              <div class="text-center">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p class="text-slate-500 text-sm">Memuat data profil...</p>
              </div>
            </div>
            <div v-else>
              <h1 class="text-2xl font-semibold text-slate-800 mb-6">Edit Profil Peserta</h1>

              <form @submit.prevent="updateProfil" class="space-y-5">
                <!-- Nama Lengkap -->
                <div>
                  <label class="block text-sm font-medium text-slate-600 mb-1">Nama Lengkap</label>
                  <input
                    v-model="form.nama_lengkap"
                    :placeholder="form.nama_lengkap || 'Masukkan nama lengkap'"
                    type="text"
                    class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                    required
                  />
                </div>

                <!-- Email (readonly) -->
                <div>
                  <label class="block text-sm font-medium text-slate-600 mb-1">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    disabled
                    class="w-full border rounded-lg px-4 py-2 bg-slate-100 text-slate-500"
                  />
                </div>

                <!-- Sekolah -->
                <div>
                  <label class="block text-sm font-medium text-slate-600 mb-1">Sekolah</label>
                  <input
                    v-model="sekolahQuery"
                    @focus="showSekolahDropdown = true"
                    type="text"
                    placeholder="Cari nama sekolah..."
                    class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />

                  <div
                    v-if="showSekolahDropdown && filteredSekolah.length"
                    class="border rounded-lg mt-1 bg-white max-h-40 overflow-y-auto shadow"
                  >
                    <div
                      v-for="item in filteredSekolah"
                      :key="item.id"
                      @click="selectSekolah(item)"
                      class="px-3 py-2 hover:bg-indigo-50 cursor-pointer text-sm"
                    >
                      {{ item.nama }}
                    </div>
                  </div>
                </div>

                <!-- Kelas & WhatsApp -->
                <div class="space-y-5">
                  <div>
                    <label class="block text-sm font-medium text-slate-600 mb-1">Kelas</label>
                    <select
                      v-model="form.kelas"
                      class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                    >
                      <option value="">Pilih Kelas</option>
                      <option value="X">X</option>
                      <option value="XI">XI</option>
                      <option value="XII">XII</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-slate-600 mb-1">WhatsApp</label>
                    <input
                      v-model="form.whatsapp"
                      :placeholder="form.whatsapp || 'Contoh: 08123456789'"
                      type="text"
                      class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                  </div>
                </div>

                <!-- Lokasi -->
                <div class="space-y-5">
                  <div>
                    <label class="block text-sm font-medium text-slate-600 mb-1">Provinsi</label>
                    <select
                      v-model="form.provinsi_id"
                      @change="loadKabupaten"
                      class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                    >
                      <option value="">Pilih Provinsi</option>
                      <option v-for="p in provinsiList" :key="p.id" :value="p.id">
                        {{ p.name }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-slate-600 mb-1">Kota / Kabupaten</label>
                    <select
                      v-model="form.kota_id"
                      @change="loadKecamatan"
                      class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                    >
                      <option value="">Pilih Kota/Kabupaten</option>
                      <option v-for="k in kabupatenList" :key="k.id" :value="k.id">
                        {{ k.name }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-slate-600 mb-1">Kecamatan</label>
                    <select
                      v-model="form.kecamatan_id"
                      class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                    >
                      <option value="">Pilih Kecamatan</option>
                      <option v-for="k in kecamatanList" :key="k.id" :value="k.id">
                        {{ k.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="pt-4">
                  <button
                    type="submit"
                    :disabled="loading"
                    class="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition disabled:opacity-60"
                  >
                    {{ loading ? "Menyimpan Perubahan..." : "Simpan Perubahan" }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Popup Notification -->
            <div v-if="popup.show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
                <h3
                  class="text-lg font-semibold mb-2"
                  :class="popup.type === 'success' ? 'text-green-600' : 'text-red-600'"
                >
                  {{ popup.title }}
                </h3>
                <p class="text-slate-600 text-sm mb-4">{{ popup.message }}</p>
                <button
                  @click="closePopup"
                  class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import api from "@/services/api"

import Sidebar from "../components/layout/Sidebar.vue"
import TopbarDashboard from "../components/layout/TopbarDashboard.vue"
import { computed } from "vue"
import { useRouter } from "vue-router"

const loading = ref(false)
const initialLoading = ref(true)
const router = useRouter()

const popup = ref({
  show: false,
  type: "success",
  title: "",
  message: ""
})

function closePopup() {
  popup.value.show = false
  if (popup.value.type === "success") {
    router.push("/")
  }
}

const sekolahList = ref([])
const sekolahQuery = ref("")
const showSekolahDropdown = ref(false)

const provinsiList = ref([])
const kabupatenList = ref([])
const kecamatanList = ref([])

const form = ref({
  nama_lengkap: "",
  email: "",
  sekolah_nama: "",
  kelas: "",
  whatsapp: "",
  provinsi: "",
  kota: "",
  kecamatan: "",
  provinsi_id: "",
  kota_id: "",
  kecamatan_id: "",
  sekolah_id: ""
})

const filteredSekolah = computed(() => {
  if (!sekolahQuery.value) return sekolahList.value.slice(0, 20)
  return sekolahList.value.filter((s) => s.nama.toLowerCase().includes(sekolahQuery.value.toLowerCase()))
})

async function fetchProfil() {
  try {
    initialLoading.value = true
    const res = await api.get("/user/profile")
    console.log("Profil berhasil diambil:", res.data)
    form.value = {
      ...form.value,
      ...res.data
    }
    if (res.data.sekolah_nama) {
      sekolahQuery.value = res.data.sekolah_nama
    }
  } catch (err) {
    console.error("Gagal mengambil profil:", err)
  } finally {
    initialLoading.value = false
  }
}

async function loadSekolah() {
  const res = await api.get("/sekolah")
  sekolahList.value = res.data.data || res.data
}

function selectSekolah(item) {
  form.value.sekolah_id = item.id
  sekolahQuery.value = item.nama
  showSekolahDropdown.value = false
}

async function loadProvinsi() {
  const res = await api.get("/wilayah/provinsi")
  provinsiList.value = res.data
}

async function loadKabupaten() {
  if (!form.value.provinsi_id) return
  const res = await api.get(`/wilayah/kabupaten/${form.value.provinsi_id}`)
  kabupatenList.value = res.data
  kecamatanList.value = []
  form.value.kota_id = ""
  form.value.kecamatan_id = ""
}

async function loadKecamatan() {
  if (!form.value.kota_id) return
  const res = await api.get(`/wilayah/kecamatan/${form.value.kota_id}`)
  kecamatanList.value = res.data
}

async function updateProfil() {
  // Validasi sebelum kirim
  if (
    !form.value.nama_lengkap ||
    !form.value.kelas ||
    !form.value.whatsapp ||
    !form.value.sekolah_id ||
    !form.value.provinsi_id ||
    !form.value.kota_id ||
    !form.value.kecamatan_id
  ) {
    popup.value = {
      show: true,
      type: "error",
      title: "Data Belum Lengkap",
      message: "Semua data wajib diisi sebelum menyimpan profil."
    }
    return
  }
  try {
    loading.value = true
    await api.put("/user/profile", form.value)
    popup.value = {
      show: true,
      type: "success",
      title: "Berhasil",
      message: "Profil berhasil diperbarui."
    }
  } catch (err) {
    console.error("Gagal update profil:", err)
    popup.value = {
      show: true,
      type: "error",
      title: "Terjadi Kesalahan",
      message: "Gagal menyimpan profil. Silakan coba lagi."
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadSekolah()
  await loadProvinsi()
  await fetchProfil()
})
</script>
