/*
 * @Author: D.Y.M
 * @Date: 2021-10-25 14:57:16
 * @LastEditTime: 2021-12-21 16:40:18
 * @FilePath: /mlplatform/web/main/src/apis/app.ts
 * @Description:
 */
import { request } from '@/utils'

/**
 * @description: 登录获取token
 * @param {*} params
 * @return {*}
 */
export const signIn = (params = {}) => {
  return request({
    url: '/signIn',
    method: 'get',
    params,
  })
}

/**
 * @description: 获取用户信息，权限
 * @param {*} params
 * @return {*}
 */
export const getUserInfo = (params = {}) => {
  return request({
    url: `/sessions:getUser`,
    method: 'get',
    params,
  })
}

export const getDomains = () => {
  return request({
    url: `/rbac/domains`,
    method: 'get',
  })
}

export const searchUsers = (params: Record<string, unknown>) => {
  return request({
    url: `/users`,
    method: 'get',
    params,
  })
}

export const getUserResources = (domainId: string, params: Record<string, unknown>) => {
  return request({
    url: `/rbac/domains/${domainId}/user_resources`,
    method: 'get',
    params,
  })
}
