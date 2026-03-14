import { defineStore } from "pinia"

export const useTryoutStore = defineStore("tryout", {
  state: () => ({
    // Cache semua soal per tryout
    // Struktur:
    // {
    //   [nomor]: {
    //     tipe,
    //     total_soal,
    //     pertanyaan,
    //     opsi,
    //     peserta
    //   }
    // }
    questionsCache: {},

    // Simpan jawaban peserta per nomor
    // {
    //   [nomor]: value
    // }
    answersMap: {},

    // Metadata tryout
    totalSoal: 0,
    currentNumber: 1
  }),

  actions: {
    setQuestion(nomor, data) {
      this.questionsCache[nomor] = data
    },

    getQuestion(nomor) {
      return this.questionsCache[nomor] || null
    },

    setAnswer(nomor, value) {
      this.answersMap[nomor] = value
    },

    getAnswer(nomor) {
      return this.answersMap[nomor] || null
    },

    setTotalSoal(total) {
      this.totalSoal = total
    },

    setCurrentNumber(n) {
      this.currentNumber = n
    },

    resetTryout() {
      this.questionsCache = {}
      this.answersMap = {}
      this.totalSoal = 0
      this.currentNumber = 1
    }
  }
})
