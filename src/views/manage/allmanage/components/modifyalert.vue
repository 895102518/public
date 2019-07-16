<template>
    <div>
        <!-- changeResult，changeTime，checkResult，deviceId -->
        <el-dialog :visible="show" @close="close" title="修改设备信息" :close-on-click-modal= 'clickmodal'>
            <el-form ref="form" :model="alertData" label-width="200px" >
                <el-form-item label="设备所属类别" style="width:505px" prop="down_amount">
                    <el-select v-model="alertData.categoryId" placeholder="请选择">
                    <el-option
                        v-for="item in operatoroptions"
                        :key="item.categoryId"
                        :label="item.categoryName"
                        :value="item.categoryId"
                    ></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="设备名称" style="width:505px" prop="down_amount">
                    <el-input v-model="alertData.deviceName"></el-input>
                </el-form-item>
                <el-form-item label="设备型号" style="width:505px" prop="down_amount">
                    <el-input v-model="alertData.deviceType"></el-input>
                </el-form-item>
                <el-form-item label="设备编号" style="width:550px;">
                    <el-input v-model="alertData.deviceNo"></el-input>
                </el-form-item>
                <el-form-item label="煤安编号" style="width:550px;">
                    <el-input v-model="alertData.coalSafetyNo"></el-input>
                </el-form-item>
                <el-form-item label="制造厂家" style="width:550px;">
                    <el-input v-model="alertData.producer"></el-input>
                </el-form-item>
                <el-form-item label="使用地点" style="width:550px;">
                    <el-input v-model="alertData.usePlace"></el-input>
                </el-form-item>
                <el-form-item label="入井时间" style="width:550px;">
                    <el-date-picker
                        v-model="alertData.intoWellTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="入井验收人及验收结果" style="width:550px;">
                    <el-input v-model="alertData.acceptorResult"></el-input>
                </el-form-item>
                <el-form-item label="安装时间" style="width:550px;">
                    <el-date-picker
                        v-model="alertData.installTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="安装验收人及验收结果" style="width:550px;">
                    <el-input v-model="alertData.installResult"></el-input>
                </el-form-item>
                <el-form-item label="干燥剂更换时间" style="width:550px;">
                    <el-date-picker
                        v-model="alertData.desiccantReplaceTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                    ></el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="更换人及更换结果" style="width:550px;">
                    <el-input v-model="alertData.wx_appid"></el-input>
                </el-form-item> -->
                <el-form-item label="设备检修时间" style="width:550px;">
                    <el-date-picker
                        v-model="alertData.checkTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="设备状态" style="width:550px;">
                    <el-select v-model="alertData.deviceStatusStr" placeholder="请选择">
                        <el-option label="在用" value="0"></el-option>
                        <el-option label="闲置" value="1"></el-option>
                        <el-option label="备用" value="2"></el-option>
                    </el-select>
                    <!-- <el-input v-model="alertData.deviceStatusStr"></el-input> -->
                </el-form-item>
                <el-form-item label="设备升井时间" style="width:550px;">
                    <el-date-picker
                        v-model="alertData.deviceUpTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="备注" style="width:550px;">
                    <el-input v-model="alertData.remark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="modifyShoplist">确定修改用户</el-button>
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
    props:{
        show: {
            type: Boolean
        },
        alertData: {
            type: Object
        },
        operatoroptions:{
            type: Array
        }
    },
    methods:{

        close() {
            this.$emit("update:show", false);
        },
        modifyShoplist(alertData){
            this.$emit('handleupdata',this.alertData)
        }
    }
};
</script>

<style scoped>
</style>
