/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 15:09:45
 * @LastEditTime: 2022-06-15 14:58:32
 * @FilePath: /main/src/views/Project/List.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'

import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useMount } from 'ahooks'
import { Button, Input, message, Switch } from 'antd'
import {
  Text,
  Icon,
  ContentLayout,
  Empty,
  OtterTable,
  OtterTableActionDelete,
  OtterTableActions,
  OtterTableFieldCreator,
  OtterTableFieldDate,
  OtterTableFieldDescription,
  OtterTableFieldTitle,
  OtterTableTitle,
} from 'otter-pro'
import { useDeleteConfirm } from 'otter-pro/es/hooks'
import { ut } from 'otter-pro/es/i18n'
import { useHistory } from 'react-router-dom'

import type { IProject } from '@/interfaces'
import { useGlobalModel, useGlobalService, useProjectModel, useProjectService } from '@/models'

import ProjectCollection from './components/Collection'
import ProjectDetail from './components/Detail'
import { ProjectContext } from './context'

const { Search } = Input
const Project = () => {
  const { t } = ut()
  const history = useHistory()
  const [isProjectCollectionVisible, setIsProjectCollectionVisible] = useState(false)
  const [isProjectDetailVisible, setIsProjectDetailVisible] = useState(false)
  const [activeProjectId, setActiveProjectId] = useState('')
  const { getProjectsService, deleteProjectService } = useProjectService()
  const { list, page, pageSize, loading, total, permissionList, setPage } = useProjectModel()
  const { setGlobalProjectService } = useGlobalService()
  const { projectId } = useGlobalModel()
  const [DeleteConfirm] = useDeleteConfirm()
  const [searchText, setSearchText] = useState('')

  useMount(() => {
    getProjectsService({
      page,
      page_size: pageSize,
    })
  })
  useEffect(() => {
    localStorage.setItem('activeProject', projectId)
  }, [])
  const onSearch = (val) => {
    setSearchText(val)
    let params = {}
    if (val) {
      setPage(1)
      params = {
        'filter_args.title': val,
        'filter_args.description': val,
      }
    }
    getProjectsService({
      page: 1,
      page_size: pageSize,
      ...params,
    })
  }

  const handleCreate = () => {
    setIsProjectCollectionVisible(true)
  }

  const handleEngine = (entity: IProject) => {
    history.push(`/projects/${entity.id}/engine`)
  }

  const Actions = () => {
    return (
      <div className="flex flex-row items-center">
        <Search
          className="search mr-2"
          enterButton={<SearchOutlined />}
          defaultValue={searchText}
          placeholder={t('common.placeholder.title')}
          onSearch={onSearch}
          allowClear
        />
        <Button className="icon-center" type="primary" onClick={handleCreate}>
          <PlusOutlined />
          {t('common.actions.create')}
        </Button>
      </div>
    )
  }

  const handleSetting = (id: string) => {
    setActiveProjectId(id)
    setIsProjectDetailVisible(true)
  }

  const handleDelete = (entity: IProject) => {
    DeleteConfirm({
      content: t('project.msg.delete', { title: entity.title }),
      handleOk: async () => {
        const [err] = await deleteProjectService(entity.id)
        if (err) {
          message.error(t('project.msg.deleteFailed'))
        } else {
          message.success(t('project.msg.deleteSuccess'))
        }
      },
    })
  }

  const handleStatus = (id) => {
    setGlobalProjectService(id)
    window.location.href = window.location.href
  }

  // const pageChange = (p, ps)=>{
  //   getEntities({
  //     page:p,
  //     page_size: ps,
  //   })
  // }

  const columns = [
    {
      title: t('common.list.title'),
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => {
        return (
          <div className="min-width-150">
            <OtterTableFieldTitle title={text} />
          </div>
        )
      },
    },
    {
      title: t('common.list.description'),
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => {
        return <OtterTableFieldDescription description={text} />
      },
    },
    {
      title: t('common.list.creator'),
      dataIndex: 'creator',
      key: 'creator',
      width: 200,
      render: (text: string, record: any) => {
        return <OtterTableFieldCreator name={record?.create_operation?.creator?.name} />
      },
    },
    {
      title: t('common.list.createTime'),
      dataIndex: 'create_time',
      key: 'create_time',
      width: 200,
      render: (text: string, record: any) => {
        return <OtterTableFieldDate date={record?.create_operation?.create_time} />
      },
    },
    {
      title: t('common.list.status'),
      dataIndex: 'active',
      key: 'active',
      width: 120,
      render: (text: string, record: any) => {
        return (
          <Switch
            checked={record.id === projectId}
            onChange={() => {
              handleStatus(record.id)
            }}
          />
        )
      },
    },
    {
      title: t('common.list.actions'),
      dataIndex: 'actions',
      key: 'actions',
      width: 250,
      render: (text: string, record: any) => {
        return (
          <OtterTableActions>
            {(permissionList[record.id]?.list_member || permissionList[record.id]?.update) && (
              <Text
                type="primaryLink"
                onClick={() => {
                  handleSetting(record.id)
                }}
              >
                <Icon className="mr-1" name="setting" />
                设置
              </Text>
            )}
            <Text
              type="primaryLink"
              onClick={() => {
                handleEngine(record)
              }}
            >
              <Icon className="mr-1" name="setting" />
              引擎管理
            </Text>
            {!record.is_default && permissionList[record.id]?.delete && record.id !== projectId && (
              <OtterTableActionDelete
                onDelete={() => {
                  handleDelete(record)
                }}
              />
            )}
          </OtterTableActions>
        )
      },
    },
  ]

  const handleChangePage = (page) => {
    setPage(page)
  }

  return (
    <ProjectContext.Provider
      value={{
        isProjectCollectionVisible,
        setIsProjectCollectionVisible,
        isProjectDetailVisible,
        setIsProjectDetailVisible,
        activeProjectId,
        setActiveProjectId,
      }}
    >
      <ContentLayout
        hLeft={<OtterTableTitle title={t('project.name')} count={total} />}
        hRight={<Actions />}
      >
        <OtterTable
          locale={{
            emptyText: <Empty title="项目" description="项目是组织业务基本单位。" />,
          }}
          loading={loading}
          dataSource={list}
          columns={columns}
          current={page}
          onPaginationChange={handleChangePage}
        />
        <ProjectCollection />
        <ProjectDetail />
      </ContentLayout>
    </ProjectContext.Provider>
  )
}
export default Project
