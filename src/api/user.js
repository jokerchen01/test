import request from '@/utils/request'

/* export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}users */

export function login(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

/* export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
} */

export function logout() {
  return request({
    url: 'users/logout',
    method: 'post'
  })
}
