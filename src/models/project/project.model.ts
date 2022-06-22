/*
 * @Author: D.Y.M
 * @Date: 2021-11-14 11:58:41
 * @LastEditTime: 2022-03-22 14:10:58
 * @Description:
 */
import { useState } from 'react'

import { createModel } from 'hox'

function useProject() {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [permissionList, setPermissionList] = useState([])
  const [rolesList, setRolesList] = useState([])
  const [detail, setDetail] = useState(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(200)

  return {
    list,
    setList,
    permissionList,
    setPermissionList,
    rolesList,
    setRolesList,
    detail,
    setDetail,
    total,
    setTotal,
    page,
    setPage,
    pageSize,
    setPageSize,
    loading,
    setLoading,
  }
}

export default createModel(useProject)
