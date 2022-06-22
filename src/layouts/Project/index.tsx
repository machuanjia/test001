/*
 * @Author: D.Y.M
 * @Date: 2022-03-02 16:39:11
 * @LastEditTime: 2022-06-15 11:12:19
 * @FilePath: /main/src/layouts/Project/index.tsx
 * @Description: 
 */
import React, { useContext, useEffect, useState } from 'react'

import { CheckOutlined } from '@ant-design/icons'
import { useMount } from 'ahooks'
import { Popover } from 'antd'
import { Icon, SimpleCheckList, Text } from 'otter-pro'
import { ut } from 'otter-pro/es/i18n'
import { useHistory } from 'react-router-dom'

import { useGlobalModel, useGlobalService, useProjectModel, useProjectService } from '@/models'

import { MainContext } from '../context'
import styles from './index.module.less'

const Project = () => {
  const { t } = ut()
  const { list, page, pageSize } = useProjectModel()
  const { getProjectsService } = useProjectService()
  const { setGlobalProjectService } = useGlobalService()
  const { projectId } = useGlobalModel()
  const history = useHistory()
  const [projectName,setProjectName] = useState('')
  const { isCollapsed } = useContext(MainContext)
  useMount(() => {
    getProjectsService({
      page,
      page_size: pageSize,
    })
  })

  const setPID = (item) => {
    setGlobalProjectService(item.id)
  }

  const handleProject = (item) => {
    setPID(item)
    window.location.href = `${location.origin}/projects/${item.id}/dashboard`
    // if (systemPaths.indexOf(location.pathname) === -1) {
    //   const array = location.pathname.split('/')
    //   array[2] = item.id
    //   window.location.href = `${location.origin}${array.join('/')}`
    // }
  }

  useEffect(() => {
    if (list) {
      if (list.length > 0) {
        const activeId = localStorage.getItem('activeProject')
        const active = list.find((n)=>{return n.id === activeId})
        if(active){
          setProjectName(active.title)
        }
        setGlobalProjectService(activeId)
      }
    }
  }, [list])

  const handleProjects = () => {
    history.push('/projects/index')
  }

  const PopContext = (() => {
    return <section className=" w-52 flex flex-col">
      <div className=" flex-1 max-h-96 overflow-y-auto overflow-x-hidden">
        <SimpleCheckList
          list={list}
          selected={projectId}
          onItemClick={handleProject}
          Suffix={CheckOutlined}
          truncate
        />
      </div>
      <footer
        onClick={handleProjects}
        className="border-t border-solid border-medium p-2 pl-4 flex justify-start items-center text-secondary cursor-pointer hover:text-primary"
      >
        <Text type="link">{t('project.viewAll')}</Text>
      </footer>
    </section>
  })
  return (
    <Popover content={PopContext} title={null} placement={isCollapsed ? 'rightTop' : 'bottom'} overlayClassName="pop-wrap">
      <div className={`${styles['project-wrap']} ${!isCollapsed && styles['project-wrap-open']}`}>
        <div className={styles['project-bread']}>
          <Icon name="project" /> {!isCollapsed && <span className='ml-2 max-w-6xl whitespace-nowrap overflow-ellipsis overflow-hidden'>{projectName || '项目'}</span>}
        </div>
      </div>
    </Popover>
  )
}

export default Project
