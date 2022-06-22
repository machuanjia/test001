/*
 * @Author: D.Y.M
 * @Date: 2021-11-14 15:24:41
 * @LastEditTime: 2022-06-15 11:06:48
 * @FilePath: /main/src/models/app/app.service.ts
 * @Description:
 */

import { message } from 'antd'
import to from 'await-to-js'

import { getUserInfo, getDomains, getUserResources } from '@/apis'
import { permissionsListIdMap } from '@/constants'
import { getPermissionsRouters } from '@/routes'
import asyncRoutes from '@/routes/async'

import useAppModel from './app.model'

const useAppService = () => {
  const { setPermissions, setPermissionList, setRoutes, setInfo, setDomains, setLoading } =
    useAppModel()
  const getInfoService = async () => {
    const [err, data]: any = await to(getUserInfo())
    if (data) {
      setInfo(data)
      setLoading(false)
    }
    return [err, data]
  }

  const getDomainsService = async () => {
    const [err, data]: any = await to(getDomains())

    if (!err) {
      setDomains(data.domains)
    }

    return [err, data]
  }

  const getUserResourcesService = async (domainId: string, params: Record<string, unknown>) => {
    const [err, data]: any = await to(getUserResources(domainId, params))
    if (!err) {
      const { resources } = data
      setPermissionList(resources)
      const permissions = []
      if (resources) {
        resources.forEach((n) => {
          const temp = permissionsListIdMap[n.id]
          if (temp) {
            permissions.push(temp.key)
          }
        })
        setPermissions(permissions)
      } else {
        message.warning('没有当前项目权限')
      }
      const routes = getPermissionsRouters(asyncRoutes, permissions)
      setRoutes(routes)
    }

    return [err, data]
  }

  return { getInfoService, getDomainsService, getUserResourcesService }
}

export default useAppService
