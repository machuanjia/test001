/*
 * @Author: D.Y.M
 * @Date: 2021-12-16 10:02:59
 * @LastEditTime: 2022-06-21 15:51:18
 * @FilePath: /main/src/views/App/index.tsx
 * @Description:
 */
import { useContext, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import { MainContext } from '@/layouts/context'
import { useGlobalModel } from '@/models'

const AppView = ({ route }) => {
  const history = useHistory()
  const { projectId } = useGlobalModel()
  const { isStepVisible,isCollapsed } = useContext(MainContext)
  useEffect(() => {
    const timer = null
    const containers = [
      'otter',
      'otterData',
      'otterExperiment',
      'otterModel',
      'otterTest',
      'otterPublish',
    ]
    if (projectId) {
      if (route.meta) {
        if (route.meta.redirect) {
          history.push(route.meta.redirect)
        }
        containers.map((id: string) => {
          if (id === route.meta.container) {
            document.getElementById(id).className = `app-wrap ${isStepVisible && 'app-wrap-step'} ${!isCollapsed && 'app-wrap-open'}`
          } else {
            document.getElementById(id).className = 'app-wrap hidden'
          }
        })
      }
    }

    return () => {
      clearTimeout(timer)
      if (route.meta) {
        containers.map((id: string) => {
          if (id === 'otter') {
            document.getElementById(id).className = `app-wrap ${isStepVisible && 'app-wrap-step'} ${!isCollapsed && 'app-wrap-open'}`
          } else {
            document.getElementById(id).className = 'app-wrap hidden'
          }
        })
      }
    }
  }, [route, projectId, history,isStepVisible,isCollapsed])

  return null
}
export default AppView
