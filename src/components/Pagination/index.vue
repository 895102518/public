<template>
    <div class="paging">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="count"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    props: { 
        count: {
            type: Number
        },
        currentPage: {
            type: Number
        } 
    },

    methods: {
        // 点击页面切换页面获取数据
        handleCurrentChange(currentPage) {
            this.$emit('update:currentPage',currentPage);
            this.$emit("handleCurrentChange", currentPage);
        }
    },
    data() {
        return {
            // currentPage: 1, //初始页
            list: [],
        };
    }
};
</script>

<style scoped>
.paging {
    width: 100%;
    text-align: center;
    padding-top: 30px;
}
</style>
