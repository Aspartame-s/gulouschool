import request from '@/utils/http'

//根据部门id查询员工(包含子部门)
export const getAllEmployeeList = (deptId) => {
    return request({
        url: `/employee?deptId=${deptId}`,
        method: 'get'
    })
}