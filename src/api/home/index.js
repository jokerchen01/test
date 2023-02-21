import requests from '@/utils/request'

export const reqTarget = () => requests({ url: '/zhibiao', method: 'get' })

export const reqHotOpintions = () => requests({ url: '/hotOpintions', method: 'get' })

export const reqHotWord = () => requests({ url: '/hotword', method: 'get' })
