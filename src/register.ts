/*
 * @Author: D.Y
 * @Date: 2021-03-29 16:11:49
 * @LastEditTime: 2022-06-21 15:50:13
 * @LastEditors: Please set LastEditors
 * @FilePath: /main/src/register.ts
 * @Description:
 */
import {registerMicroApps, start, addGlobalUncaughtErrorHandler} from 'qiankun'

import { permissionsList } from '@/constants'

import { hideAppLoading, showAppLoading } from './utils'

registerMicroApps([
  {
    name: 'laiye-ml-data',
    entry: process.env.REACT_APP_DATA_ENTRY || `${window.origin}/app/app-data/`,
    container: '#otterData',
    activeRule: (location)=>{
      return location.pathname.indexOf('/data') > -1
    },
    loader: (loading) => {
      console.log(loading)
    },
    props: {permissionsList}
  },
  {
    name: 'laiye-ml-model',
    entry: process.env.REACT_APP_MODEL_ENTRY || `${window.origin}/app/app-model/`,
    container: '#otterModel',
    activeRule: (location)=>{
      return location.pathname.indexOf('/model') > -1
    },
    loader: (loading) => {
      console.log(loading)
    },
    props: {permissionsList}
  },
  {
    name: 'laiye-ml-experiment',
    entry: process.env.REACT_APP_EXPERIMENT_ENTRY || `${window.origin}/app/app-experiment/`,
    container: '#otterExperiment',
    activeRule: (location)=>{
      return location.pathname.indexOf('/experiment') > -1
    },
    loader: (loading) => {
      console.log(loading)
    },
    props: {permissionsList}
  },
], {
  // @ts-ignore
  beforeLoad: (app) => {
    console.log('before mount', app.name)
  },
  // @ts-ignore
  beforeMount: [(app) => {
    console.log('before mount', app.name)
    showAppLoading()
    // document.getElementById('global-loading').style.display = ""
  }],
  // @ts-ignore
  afterMount: [(app) => {
    console.log('after mount', app.name)
    hideAppLoading()
    // document.getElementById('global-loading').style.display = "none"
  }],
  // @ts-ignore
  beforeUnmount: [(app) => console.log('before unmount', app.name)],
  // @ts-ignore
  afterUnmount: [(app) => console.log('after unmount', app.name)],
},)

start({
  prefetch: 'all',
  sandbox: {experimentalStyleIsolation: true}, // strictStyleIsolation
})
addGlobalUncaughtErrorHandler((event) => console.log(event))