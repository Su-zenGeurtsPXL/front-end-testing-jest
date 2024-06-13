import Vue from 'vue'
import Router from 'vue-router'
import Page from '@/views/Page'
import HomeView from '@/views/HomeView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/page',
      name: 'Page',
      component: Page
    },
    {
      path: '/home',
      name: 'HomeView',
      component: HomeView
    }
  ]
})
