/*
 * @Author: D.Y.M
 * @Date: 2021-10-21 16:06:54
<<<<<<< HEAD
 * @LastEditTime: 2022-06-10 19:01:42
=======
 * @LastEditTime: 2022-06-09 18:25:39
>>>>>>> a7bc01a09a0d10c895de377edeedac7833fc841f
 * @FilePath: /main/src/layouts/Help/index.tsx
 * @Description:
 */
import { useContext, useState } from 'react'

import { CloseOutlined } from '@ant-design/icons'
import { Avatar, Divider, Drawer } from 'antd'
import { Icon, Text } from 'otter-pro'

import url  from "../../assets/release1.0.png"
import { MainContext } from '../context'
import styles from './index.module.less'

const Help = () => {
  const [helpVisible, setHelpVisible] = useState(false)
  const { isCollapsed } = useContext(MainContext)
  const checkVisible = () => {
    setHelpVisible(!helpVisible)
  }
  return (
    <>
      <div className={`${styles['help-wrap']} ${isCollapsed && styles['help-wrap-close']}`} onClick={checkVisible}>
        <Text type="link">
          <Icon name="help" /> <span className={`${isCollapsed && 'hidden'}`}>帮助</span>
        </Text>
        <span className={`${styles['help-info']}`}>New</span>
      </div>

      <Drawer
        title={<span className={`${styles['help-title']} ${!isCollapsed && styles['help-title-open']}`}>帮助</span>}
        placement="left"
        closable={false}
        onClose={() => setHelpVisible(false)}
        visible={helpVisible}
        width={isCollapsed ? 378 : 547}
        className={`${styles['help-body']} ${!isCollapsed && styles['help-body-open']}`}
        mask={false}
        extra={
          <Text type="link">
            <CloseOutlined className={`${styles['help-close']} text-base`} onClick={checkVisible} />
          </Text>
        }
      >
        <section className='ml-2 flex flex-col'>
          <header className=' flex flex-row justify-center items-center'>
            <div className='flex-1 flex  flex-col justify-center items-center'>
              <Avatar style={{ backgroundColor: '#ffece8', color: '#fc766d ' }} icon={<Icon name="help" />} />
              <div className=' text-xs text-weak mt-2'>帮助中心</div>
            </div>
            <Divider type="vertical" className=' h-6' />
            <div className='flex-1 flex  flex-col justify-center items-center'>
              <Avatar style={{ backgroundColor: '#e6f5ee', color: '#67cfaa ' }} icon={<Icon name="user" />} />
              <div className=' text-xs text-weak mt-2'>客户中心</div>
            </div>
            <Divider type="vertical" className=' h-6' />
            <div className='flex-1 flex  flex-col justify-center items-center'>
              <Avatar style={{ backgroundColor: '#f0f6ff', color: '#6c8fd9 ' }} icon={<Icon name="publish" />} />
              <div className=' text-xs text-weak mt-2'>应用市场</div>
            </div>
          </header>
          <div className='mt-6 flex-1 overflow-x-hidden overflow-y-auto'>
            <section className='border-b border-medium mb-6'>
              <header>
                <Text type='link' className=' text-lg'>V1.2.0 机器学习平台V1.2.0</Text>
                <aside className=' text-holder text-xs mt-1'>5月9日~6月8日</aside>
              </header>
              <div className='mt-4 overflow-auto'>
                <img src={url} />
                <div className=" mt-2 text-medium text-base">更新：</div>
                <div className='mt-4'>
                  <div className=" mt-2 text-medium text-base">数据合成：</div>
                  <div className=" mt-2 text-medium text-sm">1. 【新增】数据合成代码通过持续集成自动化上线kubeflow平台，支持版本管理。</div>
                  <div className=" mt-2 text-medium text-sm">2. 【新增】创建、运行、停止数据合成任务，获取数据合成任务进度，支持跳转到kubeflow平台查看日志。</div>
                  <div className=" mt-2 text-medium text-sm">3. 【新增】支持通用文字AI能力的数据合成，合成结果上传到数据合成类型数据集，支持展示示例数据。</div>
                </div>

                <Divider/>

                <div className='mt-4'>
                  <div className=" mt-2 text-medium text-base">模型管理：</div>
                  <div className=" mt-2 text-medium text-sm">1. 【新增】模型仓库增删改查。</div>
                  <div className=" mt-2 text-medium text-sm">2. 【新增】一个仓库存储多个模型版本，支持查看模型对应的kubeflow训练任务，支持跳转到运维平台一键上线。</div>
                </div>
                <Divider/>

                <div className='mt-4'>
                  <div className=" mt-2 text-medium text-base">标注任务：</div>
                  <div className=" mt-2 text-medium text-sm">1. 【新增】标注任务支持展示用户维度的标注、质检、验收相关数据统计，支持导出excel，用于核算外包费用。</div>
                  <div className=" mt-2 text-medium text-sm">2. 【新增】支持文字检测能力和无框线表格能力的标注和预标注。</div>
                  <div className=" mt-2 text-medium text-sm">3. 【新增】新建标注任务时支持跳过数据集中已标注的数据，只标注增量数据。</div>
                  <div className=" mt-2 text-medium text-sm">4. 【优化】质检不通过的数据只能由之前的标注者重标，重标后的数据只能由之前的质检人质检。</div>
                  <div className=" mt-2 text-medium text-sm">5. 【优化】提交标注任务时自动给数据集打标签</div>
                </div>

                <div className='mt-4'>
                  <div className=" mt-2 text-medium text-base">数据集：</div>
                  <div className=" mt-2 text-medium text-sm">1. 【新增】支持根据AI能力、语种、合成/真实数据搜索数据集，搜索结果可被kubeflow训练任务使用。</div>
                  <div className=" mt-2 text-medium text-sm">2. 【新增】数据集页面支持预览视图。</div>
                  <div className=" mt-2 text-medium text-sm">3. 【优化】支持通过名称搜索数据。</div>
                  <div className=" mt-2 text-medium text-sm">4. 【优化】导出数据集支持指定AI能力。</div>
                </div>

                <div className='mt-4'>
                  <div className=" mt-2 text-medium text-base">其他：</div>
                  <div className=" mt-2 text-medium text-sm">1. 【新增】RBAC：支持为项目添加管理员角色的成员。</div>
                  <div className=" mt-2 text-medium text-sm">2. 【优化】项目支持通过名称搜索。</div>
                  <div className=" mt-2 text-medium text-sm">3. 【新增】GPU服务器支持弹性扩展。</div>
                </div>


              </div>
              <footer className='mt-4 mb-4'>




                {/* <Text type='primaryLink'>查看更多</Text> */}
              </footer>
            </section>
          </div>
        </section>
      </Drawer>
    </>
  )
}

export default Help
