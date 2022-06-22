/*
 * @Author: D.Y.M
 * @Date: 2021-11-14 15:24:41
 * @LastEditTime: 2022-06-15 11:11:55
 * @FilePath: /main/src/models/project/project.service.ts
 * @Description:
 */
import to from 'await-to-js'
import { EntityAdapter } from 'otter-pro/es/entity'

import {
  getProjects,
  createProject,
  getProjectDetail,
  updateProjectDetail,
  deleteProject,
  getProjectRoles,
} from '@/apis'
import { useGlobalService } from '@/models'

import useProjectModel from './project.model'

const useProjectService = () => {
  const { setGlobalProjectService } = useGlobalService()

  const { list, total, setList, setPermissionList, setRolesList, setTotal, setLoading, setDetail } =
    useProjectModel()
  const getProjectsService = async (params = {}) => {
    const [err, data]: any = await to(getProjects(params))
    if (data) {
      const { projects = [], permissions = [] } = data
      setList(projects)
      setPermissionList(permissions)
      setTotal(data.total_size)
      if (!localStorage.getItem('activeProject')) {
        const defaultList = projects.filter((item) => item.is_default)
        setGlobalProjectService((defaultList.length > 0 ? defaultList : projects)[0].id)
      } else {
        const defaultProject = projects.find(
          (item) => item.id === localStorage.getItem('activeProject'),
        )
        if (!defaultProject && projects.length > 0) {
          setGlobalProjectService(projects[0].id)
        }
      }
    }
    setLoading(false)
    return [err, data]
  }
  const createProjectService = async (payload) => {
    const [err, data] = await to(createProject(payload))
    // if (data) {
    //   setList(EntityAdapter.create(data, list))
    //   setTotal(total + 1)
    // }
    return [err, data]
  }
  const getProjectDetailService = async (id: string) => {
    const [err, data] = await to(getProjectDetail(id))
    if (data) {
      setDetail(data)
    }
    return [err, data]
  }
  const updateProjectService = async (id: string, params, payload) => {
    const [err, data] = await to(updateProjectDetail(id, params, payload))
    if (data) {
      setList(EntityAdapter.update(data, list))
    }
    return [err, data]
  }
  const deleteProjectService = async (id: string) => {
    const [err, data] = await to(deleteProject(id))
    if (data) {
      setList(EntityAdapter.delete(id, list))
      setTotal(total - 1)
    }
    return [err, data]
  }

  const getProjectRolesService = async (domainId: string) => {
    const [err, data]: any = await to(getProjectRoles(domainId))

    if (!err) {
      setRolesList(data.roles)
    }

    return [err, data]
  }

  return {
    getProjectsService,
    createProjectService,
    getProjectDetailService,
    updateProjectService,
    deleteProjectService,
    getProjectRolesService,
  }
}

export default useProjectService
