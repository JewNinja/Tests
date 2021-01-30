import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TestPage from '../views/TestPage.vue'
import Test from '../views/Test.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tests/:name?', // TODO: что то не то /tests/:name?
    name: 'TestPage',
    component: TestPage,
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'Tests',
  //   component: Tests
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
