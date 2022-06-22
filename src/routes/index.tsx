/*
 * @Author: D.Y.M
 * @Date: 2021-10-19 16:03:39
 * @LastEditTime: 2022-05-05 14:40:46
 * @FilePath: /main/src/routes/index.tsx
 * @Description:
 */

import { Suspense } from 'react'

import { compact } from 'lodash'
import { NotFound, ProcessLoading } from 'otter-pro'
import { Route, Switch } from 'react-router-dom'

// import type { IRoute } from '@/interfaces'
import useAppModel from '@/models/app/app.model'

import staticRoutes from './static'

export const generateRoutes = (routes: any, permissions = [], isNotFond = true) => {
  return routes ? (
    <Switch>
      {routes.map((route: any, i) => (
        <Route
          key={route.meta.key || i}
          path={route.path}
          exact={route.meta.exact}
          strict={route.meta.strict}
          render={(props) => {
            if (!route.meta.permission || permissions.includes(route.meta.permission)) {
              return <route.component {...props} route={route} />
            }
            return <></>//<Route component={NoPermission} />
          }}
        />
      ))}
      {isNotFond && <Route component={NotFound} />}
    </Switch>
  ) : null
}

export const getPermissionsRouters = (menus, permissions, parentPath = '') => {
  if (menus && menus.length > 0) {
    return compact(
      menus.map((item) => {
        item.path = parentPath + item.path
        const { path, meta, children, permission } = item
        if (!meta || !path) {
          throw new Error('route must have meta path component')
        }
        if (!meta.key || !meta.name) {
          throw new Error('route meta must have key name')
        }
        if (permissions.includes(meta.permission) || !permission) {
          const nav: any = { path, meta }
          if (children && children.length > 0) {
            const childList = compact(getPermissionsRouters(children, permissions, path))
            if (childList.length > 0) {
              childList.map((n: any) => {
                n.parent = { ...nav }
              })
              nav.children = childList
            }
            return nav
          }
          return nav
        }
      }),
    )
  }
  return []
}

export const RouteViewer = ({ routers }) => {
  const { permissions } = useAppModel()
  return <>{generateRoutes(routers, permissions, false)}</>
}

export const StaticRoutes = () => {
  return <Suspense fallback={<ProcessLoading />}>{generateRoutes(staticRoutes)}</Suspense>
}
