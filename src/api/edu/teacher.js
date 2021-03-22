import request from '@/utils/request'

export default {
    // 讲师列表
    // 后端接口（条件、分页查询讲师列表）需要三个参数，current代表当前页，limit代表每页数据数量，teacherQuery代表查询条件。
    getTeacherListPage(current, limit, teacherQuery) {
        return request({
            // 用+号拼接字符串也可以
            // 注意这里用的是反引号
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            // teacherQuery条件对象，后端使用RequestBody获取前端发来的数据。
            // RequestBody是将参数通过JSON的格式，附加在请求体上传递给后端。
            // 因为是json的格式传递数据，所以这里使用data，代表将对象转换成json传递。
            // 还可以使用param:{}的形式，指定传递的参数及值。
            data: teacherQuery
        })
    },

    // 根据ID删除讲师
    deleteTeacherById(id) {
        return request({
            url: `/eduservice/teacher/${id}`,
            method: 'delete'
        })
    },

    // 添加讲师
    saveTeacher(teacher) {
        return request({
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher
        })
    },


    // 根据ID查询讲师
    getTeacherInfo(id){
        return request({
            url: `/eduservice/teacher/getTeacher/${id}`,
            method: 'get',
        })
    },

    // 修改讲师信息
    updateTeacher(teacher){
        return request({
            url: `/eduservice/teacher/updateTeacher`,
            method: 'post',
            data: teacher
        })
    },
}


