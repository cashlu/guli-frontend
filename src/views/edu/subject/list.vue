<template>
    <div class="app-container">
        <el-input
            v-model="filterText"
            placeholder="Filter keyword"
            style="margin-bottom: 30px"
        />

        <el-tree
            ref="tree2"
            :data="subjectList"
            :props="defaultProps"
            :filter-node-method="filterNode"
            class="filter-tree"
            default-expand-all
        />
    </div>
</template>

<script>
import subject from '@/api/edu/subject'

export default {
    data() {
        return {
            filterText: '',
            subjectList: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree2.filter(val)
        }
    },

    methods: {
        filterNode(value, data) {
            if (!value) return true
            // 不区分大小写的搜索功能
            return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
        },

        getSubjectList() {
            subject.getSubjectList()
                .then(response => {
                    this.subjectList = response.data.list
                })
        }
    },
    created() {
        this.getSubjectList()
    }
}
</script>

