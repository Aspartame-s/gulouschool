import request from '@/utils/http'

//通讯录部门列表（获取详情）
//eduUnitId 当前点击的教育单位的id 必传
//id 自身的id（传此参数获取自身详情）
//pid 最上级 默认是0 （父级id）必传
export const getAddressbookDeplList = (eduUnitId, id = '', pid = '', query='') => {
    return request({
        url: `/addressbook-dept?eduUnitId=${eduUnitId}&id=${id}&pid=${pid}&queryName=${query}`,
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

//部门编辑
export const editDept = (data) => {
    return request({
        url: '/addressbook-dept',
        method: 'put',
        data
    })
}

//批量导入通讯录
export const importAddressBook = (data) => {
    return request({
        url: '/employee/excel-batch-import',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}