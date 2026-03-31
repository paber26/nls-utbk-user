import { createRouter, createWebHistory } from "vue-router"

import OAuthCallback from "../pages/Autentifikasi/OAuthCallback.vue"

import Home from "../pages/Home.vue"
import About from "../pages/About.vue"
import Dashboard from "../pages/Dashboard.vue"
import Tryout from "../pages/Tryout.vue"
import Persiapan from "../pages/TryoutPersiapan.vue"
import Kerjakan from "../pages/Kerjakan.vue"
import Peringkat from "../pages/Peringkat.vue"
import Editprofil from "../pages/EditProfil.vue"
import TryoutHasil from "../pages/TryoutHasil.vue"
import FokusTka from "../pages/FokusTka.vue"
import FokusUtbk from "../pages/FokusUtbk.vue"

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/tryout",
    name: "Tryout",
    component: Tryout
  },
  {
    path: "/peringkat",
    name: "Peringkat",
    component: Peringkat
  },
  {
    path: "/edit-profil",
    name: "Editprofil",
    component: Editprofil
  },
  {
    path: "/tryout/persiapan/:id",
    name: "Persiapan",
    component: Persiapan
  },
  {
    path: "/tryout/kerjakan/:id",
    name: "Kerjakan",
    component: Kerjakan
  },
  {
    path: "/tryout/hasil/:id",
    name: "TryoutHasil",
    component: TryoutHasil
  },
  {
    path: "/target-ptn",
    alias: "/fokus-tka",
    name: "TargetPtn",
    component: FokusTka
  },
  {
    path: "/fokus-utbk",
    name: "FokusUtbk",
    component: FokusUtbk
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/oauth/callback",
    name: "oauth-callback",
    component: OAuthCallback
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
