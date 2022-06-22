/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 16:12:45
 * @LastEditTime: 2022-06-21 18:18:29
 * @FilePath: /main/src/routes/async.tsx
 * @Description:
 */
import { lazy } from 'react'

import { Icon } from 'otter-pro'
import i18n from 'otter-pro/es/i18n'

const routes = [
  {
    path: '/teams',
    meta: {
      key: 'Team',
      name: i18n.t('routes.team'),
      icon: <Icon name="team" />,
    },
    component: lazy(() => import('@/views/Team')),
  },
  {
    path: '/projects',
    meta: {
      key: 'Project',
      name: i18n.t('routes.project'),
      icon: <Icon name="project" />,
    },
    component: lazy(() => import('@/views/Project/index')),
    children: [
      {
        path: '/index',
        meta: {
          key: 'Project',
          name: i18n.t('routes.project'),
          icon: <Icon name="project" />,
        },
        component: lazy(() => import('@/views/Project/List')),
      },
      {
        path: '/:id',
        meta: {
          key: 'Project',
          name: i18n.t('routes.project'),
          icon: <Icon name="project" />,
        },
        component: lazy(() => import('@/views/Project/Detail')),
        children: [
          {
            path: '/engine',
            meta: {
              key: 'Engine',
              name: '引擎管理',
              icon: <Icon name="setting" />,
            },
            component: lazy(() => import('@/views/Project/engine')),
          },
          {
            path: '/dashboard',
            meta: {
              key: 'Dashboard',
              name: i18n.t('routes.dashboard'),
              icon: <Icon name="dashboard" />,
              permission: 'dashboard*',
            },
            component: lazy(() => import('@/views/Dashboard')),
          },
          {
            path: '/data',
            component: lazy(() => import('@/views/App')),
            meta: {
              key: 'otterData',
              name: i18n.t('routes.data'),
              container: 'otterData',
              icon: <Icon name="data" />,
              permission: 'data*',
            },
            children: [
              {
                path: '/lake',
                component: lazy(() => import('@/views/App')),
                meta: {
                  key: 'otterDataLake',
                  name: i18n.t('routes.dataLake'),
                  container: 'otterData',
                  icon: <Icon name="lake" />,
                  permission: 'lake*',
                },
              },
              {
                path: '/set/index',
                component: lazy(() => import('@/views/App')),
                meta: {
                  key: 'otterDataSet',
                  name: i18n.t('routes.dataSet'),
                  container: 'otterData',
                  icon: <Icon name="set" />,
                  permission: 'set*',
                },
              },
              {
                path: '/task/index',
                component: lazy(() => import('@/views/App')),
                meta: {
                  key: 'otterDataTasks',
                  name: i18n.t('routes.dataTask'),
                  container: 'otterData',
                  icon: <Icon name="annotations" />,
                  permission: 'task*',
                },
              },
              {
                path: '/synthesis/index',
                component: lazy(() => import('@/views/App')),
                meta: {
                  key: 'otterDataSynthesis',
                  name: i18n.t('routes.dataSynthesis'),
                  container: 'otterData',
                  icon: <Icon name="annotations" />,
                  permission: 'synthesis*',
                },
              },
            ],
          },
          {
            path: '/experiment',
            meta: {
              key: 'Experiment',
              name: '实验',
              container: 'otterExperiment',
              icon: <Icon name="experiment" />,
              permission: 'experiment*',
            },
            component: lazy(() => import('@/views/App')),
            children:[{
              path: '/training/index',
              component: lazy(() => import('@/views/App')),
              meta: {
                key: 'otterExperimentTask',
                name: "训练任务",
                container: 'otterExperiment',
                icon: <Icon name="experiment" />,
                permission: 'experiment*',
              },
            },]
          },
          {
            path: '/model',
            meta: {
              key: 'Model',
              name: '模型',
              container: 'otterModel',
              icon: <Icon name="model" />,
            },
            component: lazy(() => import('@/views/App')),
            children: [
              {
                path: '/repo',
                component: lazy(() => import('@/views/App')),
                meta: {
                  key: 'otterModelList',
                  name: '模型仓库',
                  container: 'otterModel',
                  icon: <Icon name="annotations" />,
                },
              },
            ],
          },
          {
            path: '/testing',
            meta: {
              key: 'Test',
              name: '测试',
              icon: <Icon name="test" />,
              permission: 'test*',
            },
            component: lazy(() => import('@/views/Effect')),
            children: [
              {
                path: '/effect',
                meta: {
                  key: 'Effect',
                  name: '测试任务',
                  icon: <Icon name="effect" />,
                  permission: 'testingTask*', // ---------------------
                },
                component: lazy(() => import('@/views/Effect')),
              },
            ],
          },
          {
            path: '/publish',
            meta: {
              key: 'Publish',
              name: '发布',
              icon: <Icon name="publish" />,
              permission: 'publish*',
            },
            component: lazy(() => import('@/views/Publish')),
          },
          {
            path: '/percipience',
            meta: {
              key: 'Percipience',
              name: '洞察',
              icon: <Icon name="penetrate" />,
              permission: 'foresee*',
            },
            component: lazy(() => import('@/views/Penetrate')),
          },
        ],
      },
    ],
  },
]

export const systemPaths = ['/teams', '/projects', '/projects/index']

export default routes
