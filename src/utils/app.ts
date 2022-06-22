/*
 * @Author: D.Y.M
 * @Date: 2022-04-01 14:35:56
 * @LastEditTime: 2022-04-27 17:24:14
 * @FilePath: /main/src/utils/app.ts
 * @Description: 
 */
import { systemPaths } from '@/routes/async'

export const showAppLoading = () => {
  document.getElementById('global-loading').style.display = 'flex'
}

export const hideAppLoading = () => {
  document.getElementById('global-loading').style.display = 'none'
}

export const getLocation = (path: string) => {
  const project = localStorage.getItem('activeProject')
  if (!project) {
    return '/projects/index'
  }
  if (path === '/') {
    return `/projects/${project}/dashboard`
  } else {
    if (systemPaths.indexOf(path) === -1) {
      return path.replace(':id', project)
    } else {
      return path
    }
  }
}
