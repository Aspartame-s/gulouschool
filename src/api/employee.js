import request from '@/utils/http'

//根据部门id查询员工(包含子部门)
export const getAllEmployeeList = (deptId) => {
    return request({
        url: `/employee?deptId=${deptId}`,
        method: 'get'
    })
}

//删除人员
export const deleteEmployee = (id) => {
    return request({
        url: `/employee`,
        method: 'delete',
        params: {
            id: id
        }
    })
}

//批量删除人员
export const deleteEmployees = (str) => {
    return request({
        url: `/employee/batch`,
        method: 'delete',
        params: {
            ids: str
        }
    })
}