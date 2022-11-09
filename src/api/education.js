import request from '@/utils/http'

//获取教育单位列表
export const getEduUnitList = (id = '', pid = 0, query = '') => {
    return request({
        url: `/edu-unit?id=${id}&pid=${pid}&queryName=${query}`,
        method: 'get'
    })
}

//教育单位新增
export const addEduUnit = (data) => {
    return request({
        url: '/edu-unit',
        method: 'post',
        data
    })
}

//教育单位修改
export const editEduUnit = (data) => {
    return request({
        url: '/edu-unit',
        method: 'put',
        data
    })
}

//冻结单位
export const freezeEduUnit = (data) => {
    return request({
        url: '/edu-unit/freezing',
        method: 'put',
        data
    })
}