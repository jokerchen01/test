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