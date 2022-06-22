/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 16:35:49
 * @LastEditTime: 2022-06-10 19:34:39
 * @FilePath: /main/src/layouts/Main/index.tsx
 * @Description:
 */
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom'

import { useRoute } from '@/hooks'
import { useAppModel } from '@/models'
import { RouteViewer } from '@/routes'
import { getLocation } from '@/utils'

import Bread from '../Bread'
import Collapser from '../Collapser'
import { MainContext } from '../context'
import Help from '../Help'
import Logo from '../Logo'
import LongrunningTasks from '../LongrunningTasks'
import Nav from '../Nav'
import Notice from '../Notice'
import Preference from '../Preference'
import Project from '../Project'
import Step from '../Step'
import styles from './index.module.less'

const Main = ({ route }) => {
  const { currentRoute } = useAppModel()
  const history = useHistory()
  const location = useLocation()

  const [isStepVisible, setIsStepVisible] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  useLayoutEffect(()=>{
    if(localStorage.getItem("isCollapsed")){
      setIsCollapsed(localStorage.getItem("isCollapsed") === 'true')
    }
  })
  useRoute()
  useEffect(() => {
    if (location.pathname === '/') {
      history.push(getLocation('/'))
    }else if(currentRoute){
      history.push(getLocation(currentRoute.path))
    }
  }, [currentRoute, history])

  return (
    <>
        <MainContext.Provider value={{isStepVisible, setIsStepVisible,isCollapsed, setIsCollapsed}}>
          <section className="h-screen flex flex-row">
            <LongrunningTasks/>
            <nav className={`${styles['main-nav']} flex flex-col items-center ${isCollapsed && styles['main-nav-collapse']}`}>
              <header className="flex flex-col items-center w-full">
                <Logo />
                <Collapser/>
                <Project />
              </header>
              <div className=" flex-1 w-full">
                <Nav />
              </div>
              <footer className=" flex flex-col justify-center items-center w-full">
                <Notice />
                <Help />
                <Preference />
              </footer>
            </nav>
            <div id="otter" className={`app-wrap flex flex-col ${isStepVisible && 'app-wrap-step'} ${ !isCollapsed && 'app-wrap-open'}`}>
              <header className=" h-14 box-border flex flex-row items-center p-4 border-b border-solid border-medium">
                <Bread />
              </header>
              <div className={` flex-1 ${styles['main-body']}`}>
                <RouteViewer routers={route.children} />
              </div>
            </div>
            <Step/>
          </section>
        </MainContext.Provider>
    </>
  )
}
export default Main
