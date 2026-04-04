<template>
  <!-- ================= LENGKAPI DATA ================= -->
  <section id="profileForm" class="min-h-screen flex items-start justify-center px-6 py-12">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
      <div class="flex justify-center mb-6">
        <img v-if="user.avatar" :src="user.avatar" alt="Avatar" class="w-24 h-24 rounded-full object-cover" />
      </div>
      <h1 class="text-2xl font-bold text-slate-800 mb-2">Lengkapi Data Peserta</h1>
      <p v-if="user.email" class="text-sm text-slate-600 mb-2">
        Login menggunakan:
        <span class="font-medium">{{ user.email }}</span>
      </p>
      <p class="text-sm text-slate-500 mb-8">
        Data ini diperlukan untuk keperluan tryout, sertifikat, dan pengumuman hasil.
      </p>

      <form @submit.prevent="submitForm" class="space-y-8">
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="text-sm font-medium mb-1 block">Nama Lengkap</label>
            <input required type="text" v-model="form.nama_lengkap" class="w-full mt-1 px-4 py-2 border rounded-lg" />
          </div>

          <div class="relative">
            <label class="text-sm font-medium mb-1 block">Asal Sekolah</label>
            <input
              type="text"
              v-model="sekolahQuery"
              placeholder="Ketik nama sekolah..."
              class="w-full mt-1 px-4 py-2 border rounded-lg"
              @focus="showSekolah = true"
              @input="showSekolah = true"
              @blur="handleBlur"
            />

            <ul
              v-if="showSekolah && filteredSekolah.length"
              class="absolute z-10 w-full bg-white border rounded-lg mt-1 max-h-56 overflow-auto"
            >
              <li
                v-for="s in filteredSekolah"
                :key="s.id"
                class="px-4 py-2 hover:bg-[#F3F4F4] cursor-pointer text-sm"
                @click="selectSekolah(s)"
              >
                {{ s.nama }} ({{ s.status }})
              </li>
            </ul>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="text-sm font-medium mb-1 block">Kelas</label>
            <select required v-model="form.kelas" class="w-full mt-1 px-4 py-2 border rounded-lg">
              <option value="">Pilih Kelas</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>
          </div>

          <div class="mt-4 mb-3">
            <h2 class="text-sm font-semibold text-slate-700">Tempat Tinggal Siswa</h2>
            <p class="text-xs text-slate-500">(Diisi sesuai domisili saat ini, bukan alamat sekolah)</p>
          </div>
          <div>
            <label class="text-sm font-medium mb-1 block">Provinsi</label>
            <select
              ref="provinsiSelect"
              v-model="selectedProvinsi"
              @change="onProvinsiChange"
              class="w-full mt-1 px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Pilih Provinsi</option>
              <option v-for="prov in provinsiList" :key="prov.id" :value="prov.id">{{ prov.name }}</option>
            </select>
            <div v-if="loadingProvinsi" class="text-xs text-gray-500 mt-1">Memuat provinsi...</div>
          </div>

          <div>
            <label class="text-sm font-medium mb-1 block">Kabupaten/Kota</label>
            <select
              ref="kabupatenSelect"
              v-model="selectedKabupaten"
              @change="onKabupatenChange"
              class="w-full mt-1 px-4 py-2 border rounded-lg"
              :disabled="!selectedProvinsi"
              required
            >
              <option value="">Pilih Kabupaten/Kota</option>
              <option v-for="kab in kabupatenList" :key="kab.id" :value="kab.id">{{ kab.name }}</option>
            </select>
            <div v-if="loadingKabupaten" class="text-xs text-gray-500 mt-1">Memuat kabupaten/kota...</div>
          </div>

          <div>
            <label class="text-sm font-medium mb-1 block">Kecamatan</label>
            <select
              ref="kecamatanSelect"
              v-model="selectedKecamatan"
              class="w-full mt-1 px-4 py-2 border rounded-lg"
              :disabled="!selectedKabupaten"
              required
            >
              <option value="">Pilih Kecamatan</option>
              <option v-for="kec in kecamatanList" :key="kec.id" :value="kec.id">{{ kec.name }}</option>
            </select>
            <div v-if="loadingKecamatan" class="text-xs text-gray-500 mt-1">Memuat kecamatan...</div>
          </div>
        </div>

        <div>
          <label class="text-sm font-medium mb-1 block">Nomor WhatsApp Aktif</label>
          <input
            required
            type="text"
            v-model="form.whatsapp"
            placeholder="08xxxxxxxxxx"
            class="w-full mt-1 px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label class="text-sm font-medium mb-1 block">Minat Tryout</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" value="Matematika" v-model="form.minat" />
              Matematika
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" value="Fisika" v-model="form.minat" />
              Fisika
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" value="Kimia" v-model="form.minat" />
              Kimia
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" value="Biologi" v-model="form.minat" />
              Biologi
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" value="Informatika" v-model="form.minat" />
              Informatika
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" value="Astronomi" v-model="form.minat" />
              Astronomi
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" value="Kebumian" v-model="form.minat" />
              Kebumian
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" value="Ekonomi" v-model="form.minat" />
              Ekonomi
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" value="Geografi" v-model="form.minat" />
              Geografi
            </label>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full mt-4 bg-[#1D546D] text-white py-3 rounded-xl font-semibold hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span v-if="isSubmitting" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          {{ isSubmitting ? 'Menyimpan...' : 'Simpan & Lanjut ke Dashboard' }}
        </button>
      </form>
      <div class="mt-6 text-center">
        <button type="button" @click="handleLogout" class="text-sm text-slate-500 hover:text-red-600 transition">
          Logout / Kembali ke Login
        </button>
      </div>
    </div>
  </section>

  <!-- ================= POPUP NOTIFICATION ================= -->
  <Transition name="fade">
    <div v-if="showPopup" class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div 
        class="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100"
        :class="popupType === 'success' ? 'border-t-4 border-emerald-500' : 'border-t-4 border-rose-500'"
      >
        <div class="flex flex-col items-center text-center">
          <div v-if="popupType === 'success'" class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div v-else class="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h3 class="text-xl font-bold text-slate-800 mb-2">{{ popupTitle }}</h3>
          <p class="text-slate-600 mb-6">{{ popupMessage }}</p>
          
          <button 
            @click="closePopup"
            class="w-full py-3 px-6 rounded-xl font-semibold transition-all"
            :class="popupType === 'success' ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-200'"
          >
            {{ popupType === 'success' ? 'Lanjut ke Dashboard' : 'Tutup' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import { reactive, ref, onMounted, computed, watch } from "vue"
import api from "@/services/api"

const form = reactive({
  nama_lengkap: "",
  sekolah_id: "",
  kelas: "",
  provinsi: "",
  kota: "",
  kecamatan: "",
  whatsapp: "",
  minat: []
})

const user = reactive({
  avatar: "",
  name: "",
  email: ""
})

const sekolahList = reactive([])

const sekolahQuery = ref("")
const showSekolah = ref(false)

const redirecting = ref(false)
const isSubmitting = ref(false)

// Popup state
const showPopup = ref(false)
const popupType = ref("success") // success | error
const popupTitle = ref("")
const popupMessage = ref("")

const openPopup = (type, title, message) => {
  popupType.value = type
  popupTitle.value = title
  popupMessage.value = message
  showPopup.value = true
}

const closePopup = () => {
  showPopup.value = false
  if (popupType.value === "success") {
    window.location.href = "/"
  }
}

onMounted(async () => {
  try {
    const response = await api.get("/me")
    if (response && response.data) {
      user.avatar = response.data.avatar || ""
      user.name = response.data.name || ""
      user.email = response.data.email || ""
    }
    console.log("User data:", response.data)

    // Prefill form jika sudah ada data profil
    form.nama_lengkap = response.data.nama_lengkap || ""
    form.sekolah_id = response.data.sekolah_id || ""
    form.kelas = response.data.kelas || ""
    form.whatsapp = response.data.whatsapp || ""
    form.minat = response.data.minat || []

    // Prefill wilayah by searching names in the lists
    if (response.data.provinsi) {
      const prov = provinsiList.value.find(p => p.name === response.data.provinsi)
      if (prov) {
        selectedProvinsi.value = prov.id
        await loadKabupaten(prov.id)
        
        if (response.data.kota) {
          const kab = kabupatenList.value.find(k => k.name === response.data.kota)
          if (kab) {
            selectedKabupaten.value = kab.id
            await loadKecamatan(kab.id)
            
            if (response.data.kecamatan) {
              const kec = kecamatanList.value.find(k => k.name === response.data.kecamatan)
              if (kec) {
                selectedKecamatan.value = kec.id
              }
            }
          }
        }
      }
    }

    // Prefill nama sekolah jika tersedia
    if (response.data.sekolah) {
      sekolahQuery.value = response.data.sekolah
    }
    
    if (response.data.profil_lengkap && !redirecting.value) {
      redirecting.value = true
      window.location.href = "/dashboard"
      return
    }

    // Load initial schools
    fetchSchools()
  } catch (err) {
    console.error("Failed to fetch user data:", err)
  }

  // Load provinsi list on mount
  await loadProvinsi()
})

const fetchSchools = async (query = "") => {
  try {
    const res = await api.get(`/sekolah?search=${query}`)
    if (res && res.data) {
      const list = res.data.data || res.data
      sekolahList.splice(0, sekolahList.length, ...list)
    }
  } catch (err) {
    console.error("Failed to fetch schools:", err)
  }
}

// Debounce sekolah search
let searchTimeout = null
watch(sekolahQuery, (newVal) => {
  if (searchTimeout) clearTimeout(searchTimeout)
  if (newVal.trim().length >= 2) {
    searchTimeout = setTimeout(() => {
      fetchSchools(newVal)
    }, 500)
  }
})

const provinsiList = ref([])
const kabupatenList = ref([])
const kecamatanList = ref([])

const selectedProvinsi = ref("")
const selectedKabupaten = ref("")
const selectedKecamatan = ref("")

const loadingProvinsi = ref(false)
const loadingKabupaten = ref(false)
const loadingKecamatan = ref(false)

const loadProvinsi = async () => {
  loadingProvinsi.value = true
  try {
    const res = await api.get("/wilayah/provinsi")
    provinsiList.value = res.data
  } catch (e) {
    console.error("Gagal memuat provinsi", e)
    provinsiList.value = []
  } finally {
    loadingProvinsi.value = false
  }
}

const loadKabupaten = async (provId) => {
  loadingKabupaten.value = true
  kabupatenList.value = []
  kecamatanList.value = []
  selectedKabupaten.value = ""
  selectedKecamatan.value = ""

  try {
    const res = await api.get(`/wilayah/kabupaten/${provId}`)
    kabupatenList.value = res.data
  } catch (e) {
    console.error("Gagal memuat kabupaten", e)
    kabupatenList.value = []
  } finally {
    loadingKabupaten.value = false
  }
}

const loadKecamatan = async (kabId) => {
  loadingKecamatan.value = true
  kecamatanList.value = []
  selectedKecamatan.value = ""

  try {
    const res = await api.get(`/wilayah/kecamatan/${kabId}`)
    kecamatanList.value = res.data
  } catch (e) {
    console.error("Gagal memuat kecamatan", e)
    kecamatanList.value = []
  } finally {
    loadingKecamatan.value = false
  }
}

const onProvinsiChange = () => {
  if (selectedProvinsi.value) {
    loadKabupaten(selectedProvinsi.value)
  } else {
    kabupatenList.value = []
    kecamatanList.value = []
    selectedKabupaten.value = ""
    selectedKecamatan.value = ""
  }
}

const onKabupatenChange = () => {
  if (selectedKabupaten.value) {
    loadKecamatan(selectedKabupaten.value)
  } else {
    kecamatanList.value = []
    selectedKecamatan.value = ""
  }
}

const filteredSekolah = computed(() => {
  return sekolahList.slice(0, 50)
})

const selectSekolah = (sekolah) => {
  sekolahQuery.value = sekolah.nama
  form.sekolah_id = sekolah.id
  showSekolah.value = false
}

const handleBlur = () => {
  setTimeout(() => {
    showSekolah.value = false
  }, 150)
}

const handleLogout = () => {
  localStorage.removeItem("auth_token")
  window.location.href = "/"
}

const submitForm = async () => {
  if (isSubmitting.value) return
  
  if (!form.sekolah_id) {
    openPopup("error", "Data Belum Lengkap", "Silakan pilih asal sekolah dari daftar yang tersedia.")
    return
  }

  const prov = provinsiList.value.find((p) => p.id === selectedProvinsi.value)
  const kab = kabupatenList.value.find((k) => k.id === selectedKabupaten.value)
  const kec = kecamatanList.value.find((k) => k.id === selectedKecamatan.value)

  form.provinsi = prov?.name || ""
  form.kota = kab?.name || ""
  form.kecamatan = kec?.name || ""

  isSubmitting.value = true
  try {
    const res = await api.post("/user/profile", form)

    // cek ulang status profil dari backend
    const me = await api.get("/me")

    if (me.data.profil_lengkap) {
      openPopup("success", "Berhasil!", "Profil Anda telah diperbarui. Selamat belajar!")
    } else {
      openPopup("error", "Gagal", "Profil belum lengkap, silakan lengkapi semua data.")
    }
  } catch (err) {
    openPopup("error", "Oops!", "Gagal menyimpan data, silakan coba lagi atau hubungi admin.")
    console.error(err)
  } finally {
    isSubmitting.value = false
  }
}
</script>
