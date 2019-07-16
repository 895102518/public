<template>
    <div class="all">
        <!-- v-loading="listLoading" -->
        <el-table
            style="margin-top:20px"
            :data="list"
            border
            fit
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
                    <span>{{ scope.row.installResult?scope.row.installResult:'无' }}</span>
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
            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button
                        type="info"
                        size="mini"
                        @click="handleEditInfo(scope.row.deviceHistoryId)"
                    >修改</el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        @click="handleDelAccount(scope.row.deviceHistoryId)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 弹框的组件 -->
        <modifyalert
            :show.sync="show"
            :alertData="alertData"
            :operatoroptions="operatoroptions"
            @handleupdata="handleupdata"
        ></modifyalert>

        <!-- 分页器组件 -->
        <pagination
            @handleCurrentChange="handleCurrentChange"
            :count="count"
            :currentPage.sync="currentPage"
        ></pagination>
    </div>
</template>

<script>
import { findPage, findOne, upcomingdelete, editdata } from "@/api/pending/pending";
import modifyalert from "./components/modifyalert";
import pagination from "@/components/Pagination";

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
            list: [],
            status: "",
            currentPage: 1,
            operatoroptions: [],
            show: false,
            listLoading: false,
            alertData: {
                type: ""
            },
            pagepostdata: "",
            count: null
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 得到页面数据
        getData() {
            this.listLoading = true;
            findPage({ pageIndex: 1, pageSize: 10 }).then(res => {
                this.listLoading = false;
                this.list = res.queryResult.dataList;
                this.count = res.queryResult.rowCount;
            });
        },

        // 点击修改 获取pid信息
        handleEditInfo(deviceHistoryId) {
            this.show = true;
            findOne({ deviceHistoryId }).then(res => {
                this.alertData = res;
                this.show = true;
            });
        },

        //修改账户信息
        handleupdata(e) {
            if (
                e.changeResult == "" ||
                e.changeTime == "" ||
                e.checkResult == ""
            ) {
                this.$message({ message: "请填写完整", type: "warning" });
                return;
            }
            editdata(e).then(res => {
                this.getData();
                this.show = false;
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
            });
        },

        // 在数组中删除当前行
        handleDelAccount(index) {
            let delTitle = "此操作将删除当前代办设备,是否继续?";
            let delDesc = "删除成功";
            this.$confirm(delTitle, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                upcomingdelete({ deviceHistoryId: index }).then(res => {
                    this.list.splice(index, 1);
                    this.getData();
                    this.$message({
                        type: "success",
                        message: delDesc
                    });
                });
            });
        },
        // 组件传出的事件  传当前页码获取该页码数据
        handleCurrentChange(e) {
            let data;
            if (this.pagepostdata) {
                data = JSON.parse(this.pagepostdata);
                data.pageIndex = e;
            } else {
                data = {
                    pageIndex: e,
                    pageSize: 10
                };
            }
            findPage(data).then(res => {
                this.list = res.queryResult.dataList;
            });
        }
    },
    components: {
        modifyalert,
        pagination
    }
};
</script>

<style scope>
.all {
    padding: 30px;
}
.order-container {
    padding: 30px;
}
.btn {
    width: 150px;
    height: 40px;
    margin-left: 40px;
}
.todetail {
    text-decoration: underline;
    color: rgb(20, 121, 236);
}
.todetail:hover {
    cursor: pointer;
}
.down {
    position: relative;
    top: 55px;
    border-radius: 5px;
    padding: 10px;
    background: rgb(81, 172, 224);
    color: white;
    border: 1px solid rgb(81, 172, 224);
}
</style>
