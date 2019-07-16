<template>
    <div>
        <el-dialog :visible="show" @close="close" title="更换人信息" :close-on-click-modal="clickmodal">
            <el-form ref="form" :model="alertData" label-width="200px">
                <el-form-item label="更换人及更换结果" style="width:505px" prop="down_amount">
                    <el-input v-model="alertData.changeResult"></el-input>
                </el-form-item>
                <el-form-item label="检修人及检修结果" style="width:505px" prop="down_amount">
                    <el-input v-model="alertData.checkResult"></el-input>
                </el-form-item>
                <el-form-item label="防爆合格证更换周期" style="width:505px;">
                    <el-input v-model="alertData.changeTime"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="modifyShoplist">确定修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            clickmodal: false
        };
    },
    props: {
        show: {
            type: Boolean
        },
        alertData: {
            type: Object
        }
    },
    methods: {
        close() {
            this.$emit("update:show", false);
        },
        modifyShoplist(alertData) {
            this.$emit("handleupdata", this.alertData);
        }
    }
};
</script>

<style scoped>
</style>
