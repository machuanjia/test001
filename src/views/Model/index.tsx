/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 13:57:38
 * @LastEditTime: 2022-02-28 14:58:34
 * @FilePath: /main/src/views/Model/index.tsx
 * @Description:
 */
import React from 'react'

import { RouteViewer } from '@/routes'

const Model = ({ route }) => {
  return <RouteViewer routers={route.children} />
}
export default Model
