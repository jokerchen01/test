import requests from '@/utils/request'


export const reqEventSearch = () => requests({ url: '/event_search', method: 'get' })

export const reqEventSearchID = (params) => requests({ url: '/event_search/id', method: 'get',params })

export const reqEventSearchState = (params) => requests({ url: '/event_search/state', method: 'get',params })

export const reqEventInfo = (params) => requests({ url: '/event_info', method: 'get',params })

export const reqEventDetail = (data) => requests({ url: '/event_info/detail', method: 'post',data })

export const reqEventProperties = () => requests({ url: '/event_properties', method: 'get' })

export const reqEventLevel = () => requests({ url: '/event_level', method: 'get' })

export const reqEventStreet= () => requests({ url: '/event_street', method: 'get' })

export const reqEventUserInfo = (data) => requests({ url: '/users/user_info', method: 'post',data })

export const reqEventUserChangeInfo = (data) => requests({ url: '/users/user_change', method: 'post',data })

export const reqEventSaveState = (data) => requests({ url: '/event_info/save_state', method: 'post',data })

export const reqAllEvent = () => requests({ url: '/event_info/all_event', method: 'get' })

export const reqAllUsers = () => requests({ url: '/users/all_users', method: 'get' })

export const reqUsersDelete = (params) => requests({ url: '/users/all_delete', method: 'delete',params })

export const reqNewUser = (data) => requests({ url: '/users/new_user', method: 'post',data })

export const reqEventProcess = (data) => requests({ url: '/event_process/process_detail', method: 'post',data })

export const reqEventProcessInfo = (params) => requests({ url: '/event_process', method: 'get',params })

export const reqEventAllProcess = (params) => requests({ url: '/event_process/all_process', method: 'get',params })