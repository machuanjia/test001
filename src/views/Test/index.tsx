/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 13:57:38
 * @LastEditTime: 2022-02-24 19:03:21
 * @FilePath: /main/src/views/Test/index.tsx
 * @Description:
 */
import React from 'react'

import { RouteViewer } from '@/routes'

const Test = ({route}) => {
  return  <RouteViewer routers={route.children} />
}
export default Test
