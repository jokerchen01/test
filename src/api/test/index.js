import requests from '@/utils/request'

export const getTest = () => requests({ url: '/home', method: 'get' })