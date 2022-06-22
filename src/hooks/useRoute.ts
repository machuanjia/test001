/*
 * @Author: D.Y.M
 * @Date: 2021-11-14 14:48:37
 * @LastEditTime: 2022-06-14 16:55:42
 * @FilePath: /main/src/hooks/useRoute.ts
 * @Description: 
 */
import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import type { IRoute } from '@/interfaces'
import { useAppModel } from '@/models'

export const useRoute =  () => {
    const { routes, setCurrentRoute, setBread } = useAppModel()
    const location = useLocation()

    const isPath = (path: string, template: string) => {
      if (path.indexOf('index') > -1) {
        if (path === template) {
          return true
        }
      } else {
        const pathArray = path.split('/')
        const templateArray = template.split('/')
        if (pathArray.length !== templateArray.length) {
          return false
        }
        templateArray.map((n, index) => {
          if (n.indexOf(':') > -1) {
            templateArray[index] = '-'
            pathArray[index] = '-'
          }
        })
        return pathArray.join() === templateArray.join()
      }
      return false
    }
    const findNode = (list: IRoute[], path: string) => {
      let node: any = null
      const loopNode = (list: IRoute[], path: string) => {
        list.map((n: IRoute) => {
          if (isPath(path, n.path)) {
            node = n
          } else if (n.children) {
            loopNode(n.children, path)
          }
        })
      }
      loopNode(list, path)
      return node
    }
    const setRoute = (pathname) => {
      const route = findNode(routes, pathname.replace(localStorage.getItem('activeProject'),':id'))
      if (route) {
        setCurrentRoute(route)
        setBread([{
          icon: route.meta.icon,
          name: route.meta.name,
        }])
      }
    }

    useEffect(() => {
      setRoute(location.pathname)
    }, [location, routes])
  }