import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TestPage from '../views/Tests/TestPage.vue'
import TestWalkthrough from '../views/Tests/TestWalkthrough/index.vue'
import TestСreation from '../views/Tests/TestСreation/index.vue'
import TestLibrary from '../views/Tests/TestLibrary/index.vue'
import OtherPage from '../views/Other/OtherPage.vue'
import Composition from '../views/Other/Composition/index.vue'
import CustomDirectives from '../views/Other/CustomDirectives/index.vue'
import Staff from '../views/Other/Staff/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tests',
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
        path: ':name?',
        component: TestWalkthrough
      },
      {
        path: ':pathMatch(.*)*',
        redirect: { name: 'TestPage' }  // TODO: какое то фуфло
      }
    ],
    redirect: { name: 'TestWalkthrough' }   // TODO: может можно сделать лучше
  },
  {
    path: '/other',
    name: 'OtherPage',
    component: OtherPage,
    children: [
      {
        path: 'composition/:page?',
        component: Composition
      },
      {
        path: 'customdirectives',
        component: CustomDirectives
      },
      {
        path: 'staff',
        component: Staff
      },
      {
        path: ':pathMatch(.*)*',
        redirect: { name: 'OtherPage' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/tests' // TODO: не работает именованый маршрут
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
