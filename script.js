import http from "k6/http"
import { sleep } from "k6"

export const options = {
  vus: 1000, // 1000 virtual user
  duration: "30s" // selama 1 menit
}

export default function () {
  http.get("https://apinlskuy.next-level-study.com/api/wilayah/provinsi")
  sleep(1)
}
