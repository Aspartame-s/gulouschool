import request from '@/utils/http'

//通讯录部门列表（获取详情）
//eduUnitId 当前点击的教育单位的id 必传
//id 自身的id（传此参数获取自身详情）
//pid 最上级 默认是0 （父级id）必传
export const getAddressbookDeplList = (eduUnitId, id, pid) => {
    return request({
        url: `/addressbook-dept?eduUnitId=${eduUnitId}&id=${id}&pid=${pid}`,
        method: 'get'
    })
}

//部门新增
export const appendDept = (data) => {
    return request({
        url: '/addressbook-dept',
        method: 'post',
        data
    })
}

//部门删除
export const deleteDept = (id) => {
    return request({
        url: '/addressbook-dept',
        method: 'delete',
        params: {
            id: id
        }
    })
}