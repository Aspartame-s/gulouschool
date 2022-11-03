import request from '@/utils/http'

//获取教育单位列表
export const getEduUnitList = (id = '', pid = 0) => {
    return request({
        url: `/edu-unit?id=${id}&pid=${pid}`,
        methods: 'get'
    })
}