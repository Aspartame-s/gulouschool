import request from '@/utils/http'

//获取教育单位列表
export const getEduUnitList = () => {
    return request({
        url: '/edu-unit',
        methods: 'get'
    })
}