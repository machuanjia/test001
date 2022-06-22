import { useContext } from "react"

import { LeftOutlined } from "@ant-design/icons"

import { MainContext } from "../context"
import styles from './index.module.less'

const Collapser = ()=>{
    const {isCollapsed,setIsCollapsed} = useContext(MainContext)
    const handleCollapsed = ()=>{
        const temp = !isCollapsed
        setIsCollapsed(temp)
        localStorage.setItem("isCollapsed",temp.toString())
    }
    return <div className={`${styles.collapser} ${isCollapsed && styles['collapser-close']}`} onClick={handleCollapsed}><LeftOutlined /></div>
}

export default Collapser