import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/czs-web/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/czs-web/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/czs-web/user/logout',
    method: 'post'
  })
}
export function getAuthMenu(token) {
  return request({
    url: '/dashboard',
    method: 'get',
    params: { token }
  })
}
export function getList(params) {
  return request({
    url: '/czs-web/user/listUser',
    method: 'get',
    params
  })
}
