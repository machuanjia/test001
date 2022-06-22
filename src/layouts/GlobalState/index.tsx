/*
 * @Author: D.Y.M
 * @Date: 2022-03-02 11:00:34
 * @LastEditTime: 2022-04-28 10:06:38
 * @FilePath: /main/src/layouts/GlobalState/index.tsx
 * @Description: 
 */

import { useMount } from 'ahooks'

import { useAppModel } from '@/models'
import globalActions from '@/models/global/global'
import { hideAppLoading, showAppLoading } from '@/utils'

const GlobalState = () => {
    const { setLongrunningTask } = useAppModel()
    useMount(()=>{
        globalActions.onGlobalStateChange((state) => {
            if (state.loading) {
                showAppLoading()
            } else {
                hideAppLoading()
            }
            setLongrunningTask(state.longrunning)
        })  
    })
    return <></>
}
export default GlobalState