<template>
    <div>
        <!-- changeResult，changeTime，checkResult，deviceId -->
        <el-dialog
            :visible="oldshow"
            @close="close"
            width="90%"
            title="历史记录"
            :close-on-click-modal="clickmodal"
        >
            <el-table
                style="margin-top:20px"
                border
                fit
                :data="oldlist"
                highlight-current-row
                element-loading-text="Loading"
            >
                <el-table-column align="center" label="设备名称">
                    <template slot-scope="scope">
                        <span>{{ scope.row.deviceName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="设备型号">
                    <template slot-scope="scope">
                        <span>{{ scope.row.deviceType}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="设备编号">
                    <template slot-scope="scope">
                        <span>{{ scope.row.deviceNo}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="煤安编号">
                    <template slot-scope="scope">
                        <span>{{ scope.row.coalSafetyNo }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="制造厂家">
                    <template slot-scope="scope">
                        <span>{{ scope.row.producer }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="使用地点">
                    <template slot-scope="scope">
                        <span>{{ scope.row.usePlace }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="入井时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.intoWellTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="入井验收人及验收结果">
                    <template slot-scope="scope">
                        <span>{{ scope.row.acceptorResult }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="安装时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.installTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="安装验收人及验收结果">
                    <template slot-scope="scope">
                        <span>{{ scope.row.installResult }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="干燥剂更换时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.desiccantReplaceTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="更换人及更换结果">
                    <template slot-scope="scope">
                        <span>{{ scope.row.changeResult ? scope.row.changeResult:'无' }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="设备检修时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.checkTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="检修人及检修结果">
                    <template slot-scope="scope">
                        <span>{{ scope.row.checkResult?scope.row.checkResult:'无' }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="防爆合格证更换周期">
                    <template slot-scope="scope">
                        <span>{{ scope.row.changeTime?scope.row.changeTime:'无' }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="设备状态">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.deviceStatusStr | setStayusColor"
                        >{{ scope.row.deviceStatusStr }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="设备升井时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.deviceUpTime?scope.row.deviceUpTime:'无' }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="备注">
                    <template slot-scope="scope">
                        <span>{{ scope.row.remark?scope.row.remark:'无' }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
export default {
    filters: {
        setStayusColor(status) {
            let color = "";
            switch (status) {
                case "在用":
                    color = "success";
                    break;
                case "备用":
                    color = "warning";
                    break;
                case "闲置":
                    color = "danger";
                    break;
            }
            return color;
        }
    },
    data() {
        return {
            clickmodal: false,
            deviceName: ""
        };
    },
    props: {
        oldshow: {
            type: Boolean
        },
        oldlist: {
            type: Array
        },
    },
    methods: {
        close() {
            this.$emit("update:oldshow", false);
        }
    }
};
</script>

<style scoped>
</style>
