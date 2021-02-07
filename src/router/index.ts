import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TestPage from '../views/TestPage.vue'
import TestWalkthrough from '../views/TestWalkthrough/index.vue'
import TestСreation from '../views/TestСreation/index.vue'
import TestLibrary from '../views/TestLibrary/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tests/:name?', // TODO: что то не то /tests/:name?
    name: 'TestPage',
    component: TestPage,
    children: [
      {
        path: '_create',
        component: TestСreation
      },
      {
        path: '_edit',
        name: 'TestEditing',
        component: TestСreation
      },
      {
        path: '_library',
        component: TestLibrary
      },
      {
        path: ':pathMatch(.*)*',
        component: TestWalkthrough
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
