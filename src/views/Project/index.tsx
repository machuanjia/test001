/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 13:57:38
 * @LastEditTime: 2022-06-15 10:39:06
 * @FilePath: /main/src/views/Project/index.tsx
 * @Description:
 */
import React, { useEffect } from 'react'

import { useRedirect } from 'otter-pro/es/hooks'

import { RouteViewer } from '@/routes'

const Projects = ({ route }) => {
  const [redirect] = useRedirect()
  useEffect(() => {
    redirect('/projects', '/projects/index')
  }, [redirect])
  return (
    <RouteViewer routers={route.children} />
  )
}

export default Projects
