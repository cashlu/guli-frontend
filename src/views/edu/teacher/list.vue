<template>
    <div id="app">
        <el-form :inline="true" :model="teacherQuery" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="teacherQuery.name" placeholder="讲师姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
                    <el-option label="高级讲师" value="1"></el-option>
                    <el-option label="首席讲师" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="添加时间">
                <el-date-picker v-model="teacherQuery.begin"
                                type="datetime"
                                placeholder="选择开始时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                default-time="00:00:00"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="teacherQuery.end"
                                type="datetime"
                                placeholder="选择截止时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                default-time="00:00:00"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList()">查询</el-button>
                <el-button type="default" @click="resetData()">清空</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list"
                  stripe
                  style="width: 100%"
        >
            <el-table-column type="index"
                             label="ID"
                             width="100"
            >
            </el-table-column>
            <el-table-column prop="name"
                             label="姓名"
                             width="180"
            >
            </el-table-column>
            <el-table-column prop="career"
                             label="资历"
                             width="180"
            >
            </el-table-column>
            <el-table-column prop="level"
                             label="头衔"
                             width="180"
            >
                <template slot-scope="scope">
                    {{ scope.row.level === 1 ? '高级讲师' : '首席讲师' }}
                </template>
            </el-table-column>
            <!--            <el-table-column prop="intro"-->
            <!--                             label="简介"-->
            <!--                             width="500"-->
            <!--            >-->
            <!--            </el-table-column>-->

            <!--            <el-table-column label="头像"-->
            <!--                             width="180"-->
            <!--            >-->
            <!--                <template slot-scope="scope">-->
            <!--                    <img :src="scope.row.avatar">-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <el-table-column prop="gmtCreate"
                             label="添加时间"
                             width="180"
            >
            </el-table-column>
            <el-table-column label="操作"
                             width="180"
            >
                <template slot-scope="scope">
                    <!-- 跳转到修改页面（和save使用的是同一个页面）-->
                    <!-- 跳转到edit页面后（也是save页面），需要做数据回显，回显在逻辑在save页面中定义。 -->
                    <router-link :to="'/teacher/edit/' + scope.row.id">
                        <el-button size="mini" type="primary">修改</el-button>
                    </router-link>
                    <el-button size="mini" type="danger" @click="deleteTeacherById(scope.row.id)">删除</el-button>
                </template>

            </el-table-column>
        </el-table>
        <el-pagination style="text-align: center"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="page"
                       :page-sizes="[5, 10, 20, 50]"
                       :page-size="5"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
// 引入teacher.js
import teacher from '@/api/edu/teacher.js'

export default {
    data() {
        return {
            page: 1, // 当前页（current）
            limit: 5, // 每页记录数
            teacherQuery: {}, // 条件封装的对象
            list: null, // 查询结果集合
            total: 0   // 总记录数
        }
    },
    methods: {
        // 获取讲师列表
        // 带有默认值的参数page和size，是为了兼容分页功能。
        getList(page = 1, size = this.limit) {
            this.page = page
            this.limit = size
            teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
                //请求成功
                .then(response => {
                    this.list = response.data.rows
                    this.total = response.data.total
                })
                //请求失败
                .catch(error => {
                    console.log(error)
                })
        },
        handleSizeChange(val) {
            this.getList(this.page, val)
        },
        handleCurrentChange(val) {
            this.getList(val)
        },
        resetData() {
            this.teacherQuery = {}
            this.getList()
        },
        deleteTeacherById(id) {
            this.$confirm('此操作将永久删除该讲师, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 调用删除讲师的方法
                teacher.deleteTeacherById(id)
                    .then(response => {
                        console.log(response)
                        this.getList()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    })
                // request对操作失败做了封装，可以不用写catch分支
                // .catch(error => {
                //     console.log(error)
                // })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })

        }
    },
    created() {
        this.getList()
    }

}
</script>

<style>
</style>
