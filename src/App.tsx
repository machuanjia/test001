/*
 * @Author: D.Y.M
 * @Date: 2021-10-19 16:43:46
 * @LastEditTime: 2022-06-15 11:08:18
 * @FilePath: /main/src/App.tsx
 * @Description:
 */
import React, { useEffect } from 'react'

import { useMount } from 'ahooks'
import { useHistory } from 'react-router-dom'

import { StaticRoutes } from '@/routes'

import GlobalState from './layouts/GlobalState'
import { useAppModel, useAppService, useGlobalModel, useGlobalService } from './models'
import { getStateFromURl } from './utils'

const App = () => {
  const { domains, permissions, setPermissionList } = useAppModel()
  const { getInfoService, getDomainsService, getUserResourcesService } = useAppService()
  const { setGlobalProjectService, setGlobalService } = useGlobalService()
  const { projectId } = useGlobalModel()
  const history = useHistory()
  useMount(() => {
    getInfoService()
    getDomainsService()
  })
  const getPermissions = async () => {
    const domainId = domains.find((item) => item.title === '项目').id

    const [err, data] = await getUserResourcesService(domainId, { data_id: projectId })
    if (!err) {
      const { resources } = data

      setPermissionList(resources)
      if (!resources) {
        history.push('/projects/index')
        window.location.href = window.location.href
      }
    }
  }

  useEffect(() => {
    if (projectId && domains && domains.length > 0 && permissions.length === 0) {
      getPermissions()
    }
  }, [projectId, domains, permissions])

  useEffect(() => {
    // if(permissions.length > 0){
    setGlobalService({ loading: false })
    // }
  }, [permissions])

  useEffect(() => {
    const pdi = getStateFromURl('projects')
    if (pdi && pdi.length === 32) {
      setGlobalProjectService(pdi)
    }
  }, [])
  return (
    <>
      <GlobalState />
      <StaticRoutes />
    </>
  )
}

export default App
