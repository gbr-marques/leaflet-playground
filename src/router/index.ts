import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import AdminDashboard from '@/components/Admin/AdminDashboard.vue'
import AdminForm from '@/components/Admin/AdminForm.vue'
import AdminUsers from '@/components/Admin/AdminUsers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      children: [
        { path: '', name: 'dashboard', component: AdminDashboard },
        { path: 'form', name: 'form', component: AdminForm },
        { path: 'markers', name: 'markers', component: AdminForm },
        { path: 'users', name: 'users', component: AdminUsers },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
