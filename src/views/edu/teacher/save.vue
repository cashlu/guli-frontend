<template>
    <div id="app">
        <el-form label-width="120px">
            <el-form-item label="讲师名称">
                <el-input v-model="teacher.name"/>
            </el-form-item>
            <el-form-item label="讲师头像" name="image">
                <!-- 头像缩略图 -->
                <pan-thumb :image="teacher.avatar"/>
                <!-- 文件上传按钮 -->
                <el-button type="primary" icon="el-icon-upload" @click="imageCropperShow=true">更换头像</el-button>

                <image-cropper v-show="imageCropperShow"
                               :width="300"
                               :heigh="300"
                               :key="imageCropperKey"
                               :url="BASE_API + '/eduoss/fileoss'"
                               field="file"
                               @close="cropperClose"
                               @crop-upload-success="cropSuccess">
                </image-cropper>
            </el-form-item>
            <el-form-item label="讲师排序">
                <el-input-number v-model="teacher.sort" controls-position="right" :min="0"/>
            </el-form-item>
            <el-form-item label="讲师头衔">
                <el-select v-model="teacher.level" clearable placeholder="请选择">
                    <!--
                      数据类型一定要和取出的json中的一致，否则没法回填
                      因此，这里value使用动态绑定的值，保证其数据类型是number
                    -->
                    <el-option :value="1" label="高级讲师"/>
                    <el-option :value="2" label="首席讲师"/>
                </el-select>
            </el-form-item>
            <el-form-item label="讲师资历">
                <el-input v-model="teacher.career"/>
            </el-form-item>



            <el-form-item label="讲师简介">
                <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
            </el-form-item>



            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import teacher from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
    // 引入申明组件的名称，换成全小写减号分隔，就是标签的名称
    components: { PanThumb, ImageCropper },
    data() {
        return {
            teacher: {
                name: '',
                sort: 0,
                level: null,
                career: '',
                intro: '',
                avatar: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
            },
            saveBtnDisabled: false,
            imageCropperShow: false,
            imageCropperKey: 0,
            BASE_API: process.env.VUE_APP_BASE_API, // 获取配置文件中配置的地址及端口号，固定写法，可参考request.js
        }
    },
    methods: {
        // 用一个方法实现保存和修改，是为了复用同一个表单
        saveOrUpdate() {
            // 判断是添加还是修改
            if (this.teacher.id) {
                this.updateTeacher()
            } else {
                this.saveTeacher()
            }
        },

        saveTeacher() {
            teacher.saveTeacher(this.teacher)
                .then(response => {
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message: '添加讲师成功'
                    })
                    // 回到讲师列表
                    this.$router.push({ path: '/teacher/table' })
                })
        },

        // 根据ID获取讲师信息，用于修改的数据回显。
        getTeacherInfoById(id) {
            teacher.getTeacherInfo(id)
                .then(response => {
                    this.teacher = response.data.teacher
                })
        },

        // 修改讲师信息
        updateTeacher() {
            teacher.updateTeacher(this.teacher)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '修改讲师成功'
                    })
                    this.$router.push({ path: '/teacher/table' })
                })
        },
        // 上传头像窗口关闭的方法
        cropperClose(){
            this.imageCropperShow = false
            // 将上传窗口初始化
            this.imageCropperKey += 1
        },
        // 上传头像成功的方法
        cropSuccess(data){
            this.teacher.avatar = data.url
            this.cropperClose()

        },
    },
    created() {
        // console.log(this.$route.params)
        // console.log(this.$route.params.id)
        // 判断路径中是否有讲师ID，如果有，则代表是修改讲师信息，需要查询讲师数据做回显；如果没有，则为新增讲师。
        if (this.$route.params && this.$route.params.id) {
            let id = this.$route.params.id
            this.getTeacherInfoById(id)
        }
    }
    // watch:{
    //     $route(to, from) {
    //         console.log('原路由：' + from)
    //         console.log("现路由：" + to)
    //     }
    // }
}
</script>

<style>
</style>
