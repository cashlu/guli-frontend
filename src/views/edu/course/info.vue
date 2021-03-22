<template>
<div id="info">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="1" finish-status="success" process-status="wait" align-center style="margin-bottom: 40px;">
        <el-step title="填写课程基本信息"></el-step>
        <el-step title="创建课程大纲"></el-step>
        <el-step title="最终发布"></el-step>
    </el-steps>

    <el-form label-width="120px">
        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
        </el-form-item>
    </el-form></div>
</template>

<script>
export default {
    name: 'info',
    data(){
        return{
            active: 0,
            saveBtnDisabled: false,

        }
    },
    methods:{
        next() {
            // if (this.active++ > 2) this.active = 0;
            // 跳转到第二步
            this.$router.push({path: '/course/chapter/1'})
        }

    },
    created() {
    }
}
</script>

<style scoped>

</style>
