import Vue from 'vue'
import Router from 'vue-router'

import PageHome from '@/components/PageHome'
import PageColor from '@/components/PageColor'
import PageImage from '@/components/PageImage'
import PageVideo from '@/components/PageVideo'
import PageText from '@/components/PageText'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:endpoint?',
      name: 'PageHome',
      component: PageHome
    },
    {
      path: '/color',
      name: 'PageColor',
      component: PageColor
    },
    {
      path: '/image',
      name: 'PageImage',
      component: PageImage
    },
    {
      path: '/video',
      name: 'PageVideo',
      component: PageVideo
    },
    {
      path: '/text',
      name: 'PageText',
      component: PageText
    }

  ]
})
