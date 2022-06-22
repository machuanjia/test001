/*
 * @Author: lubenben lubenben@laiye.com
 * @Date: 2022-06-14 12:42:11
 * @LastEditors: lubenben lubenben@laiye.com
 * @LastEditTime: 2022-06-21 19:46:05
 * @FilePath: /mlplatform/web/main/src/views/Project/engine/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { useAppModel } from '@/models'

import { EngineContext } from '../context'
import AiEngineList from './components/List'

const AiEngine = () => {
  const { id } = useParams()
  const { bread, setBread } = useAppModel()
  const [projectId, setProjectId] = useState(id)
  const [isCollectionVisible, setIsCollectionVisible] = useState(false)

  const initId = () => (id ? setProjectId(id) : setProjectId(''))

  useLayoutEffect(() => {
    if (id && bread.length === 1) {
      setBread([
        { path: '/projects/index', icon: 'ss', name: 'sds', type: 'icon' },
        { path: '/engine', icon: 'ss', name: '引擎管理', type: 'title' },
      ])
    }
  }, [id, bread])

  useEffect(() => {
    initId()
  }, [id])

  return (
    <EngineContext.Provider
      value={{ projectId, setProjectId, isCollectionVisible, setIsCollectionVisible }}
    >
      <AiEngineList />
    </EngineContext.Provider>
  )
}

export default AiEngine
