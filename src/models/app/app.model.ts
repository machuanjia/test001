/*
 * @Author: D.Y.M
 * @Date: 2021-11-14 11:58:41
 * @LastEditTime: 2022-03-23 19:31:35
 * @Description:
 */
import { useState } from 'react'

import { createModel } from 'hox'

function useApp() {
  const [token, setToken] = useState('')
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [routes, setRoutes] = useState([])
  const [currentRoute, setCurrentRoute] = useState(null)
  const [bread, setBread] = useState([])
  const [info, setInfo] = useState(null)
  const [longrunningTask, setLongrunningTask] = useState({ id: '', process: 0, isVisible: false })
  const [errors, setErrors] = useState([])
  const [domains, setDomains] = useState([])
  const [permissionList, setPermissionList] = useState([])

  return {
    token,
    setToken,
    permissions,
    setPermissions,
    loading,
    setLoading,
    routes,
    setRoutes,
    currentRoute,
    setCurrentRoute,
    bread,
    setBread,
    info,
    setInfo,
    longrunningTask,
    setLongrunningTask,
    errors,
    setErrors,
    domains,
    setDomains,
    permissionList,
    setPermissionList,
  }
}

export default createModel(useApp)
