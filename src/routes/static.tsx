/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 15:49:54
 * @LastEditTime: 2022-03-02 15:05:47
 * @FilePath: /main/src/routes/static.tsx
 * @Description:
 */
import { lazy } from 'react'

import i18n from 'i18next'

import asyncRoute from './async'

const routes = [
  {
    path: '/login',
    meta: {
      key: 'Login',
      name: i18n.t('router.login'),
      isHidden: true,
    },
    component: lazy(() => import('@/views/Login')),
  },
  {
    path: '/logout',
    meta: {
      key: 'Login',
      name: i18n.t('router.login'),
      isHidden: true,
    },
    component: lazy(() => import('@/views/Logout')),
  },
  {
    path: '/redirect',
    meta: {
      key: 'Login',
      name: i18n.t('router.login'),
      isHidden: true,
    },
    component: lazy(() => import('@/views/Redirect')),
  },
  {
    path: '/404',
    meta: {
      key: '404',
      name: "404",
      isHidden: true,
    },
    component: lazy(() => import('@/views/NotFond')),
  },
  {
    path: '/',
    meta: {
      key: 'Main',
      name: i18n.t('router.main'),
      isHidden: true,
    },
    component: lazy(() => import('@/layouts/Main')),
    children: asyncRoute,
  },
]

export default routes
