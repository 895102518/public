<template>
    <div class="all">
        <el-row>
            <el-col :span="7">
                <span style="padding-right:10px">设备类别</span>
                <el-select v-model="categoryId" placeholder="请选择">
                    <el-option label="全部" value></el-option>
                    <el-option
                        v-for="item in operatoroptions"
                        :key="item.categoryId"
                        :label="item.categoryName"
                        :value="item.categoryId"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="7">
                <span style="padding-right:10px">设备检修时间</span>
                <el-date-picker
                    v-model="checkTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                ></el-date-picker>
            </el-col>
            <el-col :span="7">
                <span style="padding-right:10px">设备状态</span>
                <el-select v-model="deviceStatus" placeholder="请选择">
                    <el-option
                        v-for="item in stateoptions"
                        :key="item.value"
                        :label="item.type"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" style="width:120px" @click="handlesearch">搜索</el-button>
            </el-col>
        </el-row>
        <div style="height:30px"></div>
        <router-link to="/manage/addpages">
            <el-button type="primary" style="float:right;margin-bottom:20px">新增设备信息</el-button>
        </router-link>
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
                    <el-tag :type="scope.row.deviceStatusStr | setStayusColor">{{ scope.row.deviceStatusStr }}</el-tag>
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
            <el-table-column align="center" label="操作" width="300">
                <template slot-scope="scope">
                    <el-button type="info" size="mini" @click="handleEditInfo(scope.row.deviceId)">修改</el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        @click="handleDelAccount(scope.row.deviceId)"
                    >删除</el-button>
                    <el-button
                        type="warning"
                        size="mini"
                        @click="handleChangeOld(scope.row.deviceId)"
                    >历史记录</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="warning" style="margin-top:50px" @click="handleIntoexcel">导入excel表格</el-button>

        <!-- 弹框的组件 -->
        <modifyalert :show.sync="show"  :alertData="alertData" :operatoroptions="operatoroptions" @handleupdata="handleupdata"></modifyalert>
        <intoexcel :excelshow.sync="excelshow" :excelData="excelData" :operatoroptions="operatoroptions"></intoexcel>
        <olddata :oldshow.sync="oldshow" :oldlist="oldlist"></olddata>

        <!-- 分页器组件 -->
        <pagination @handleCurrentChange="handleCurrentChange" :count="count" :currentPage.sync="currentPage"></pagination>
    </div>
</template>

<script>
import { findAll,findPage,findOne,findoldPage,deviceDelete,editdata  } from "@/api/manage/manage"
import modifyalert from "./components/modifyalert";
import olddata from "./components/olddata";
import intoexcel from "./components/intoexcel";
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
            list:[],
            status:"",
            currentPage:1,
            operatoroptions: [],
            categoryId: '',       //操作人
            deviceStatus: '',   //操作类型
            checkTime: '',   //操作日期
            stateoptions:[
                {type:'全部', value:''},
                {type:'在用', value:'0'},
                {type:'备用', value:'3'},
                {type:'闲置', value:'1'},
            ],
            show: false,
            oldshow: false,
            excelshow: false,
            listLoading: false,
            alertData: {
                type: ""
            },
            excelData: {
                type: ""
            },
            oldlist: [],
            pagepostdata:'',
            count: null
        };
    },
    mounted() {
        this.getData();
        this.getAllSelect()
    },
    methods: {
        // 得到下拉分类列表
        getAllSelect(){
            findAll().then(res => {
                this.operatoroptions = res.queryResult.dataList;
            });
        },
        // 得到页面数据
        getData() {
            this.listLoading = true;
            findPage({ pageIndex : 1, pageSize : 10 }).then(res => {
                this.listLoading = false;
                this.list = res.queryResult.dataList;
                this.count = res.queryResult.rowCount;
            });
        },

        // 点击修改 获取pid信息
        handleEditInfo(deviceId) {
            this.show = true;
            findOne({ deviceId }).then(res => {
                this.alertData = res
                this.show = true;
            });
        },
        //修改账户信息
        handleupdata(e) {
            // 删除多余的健值对
            // delete e.amount;
            for (let i in e) {
                if (e[i] == "") {
                    this.$message({
                        message: "请填写完整每一项",
                        type: "warning"
                    });
                    return;
                }
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
        // 点击 导入按钮
        handleIntoexcel(){
            findAll().then(res => {
                this.operatoroptions = res.queryResult.dataList;
                this.excelshow = true;
            });
            
        },
        // 查询历史记录
        handleChangeOld(deviceId){
            console.log(deviceId,">?<><><><:>:<>:")
            findoldPage({ deviceId:deviceId,pageIndex:1,pageSize:10}).then(res=>{
                this.oldshow = true;
                this.oldlist = res.queryResult.dataList;
            })
        },

        // 在数组中删除当前行
        handleDelAccount(index) {
            let delTitle = "此操作将删除当前商品,是否继续?";
            let delDesc = "删除成功";
            this.$confirm( delTitle,"提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(()=>{
                deviceDelete({ id:index }).then(res=>{
                    this.list.splice(index, 1)
                    this.getData()
                    this.$message({
                        type:'success',
                        message: delDesc
                    })
                })
            })
        },

        // 搜索
        handlesearch() {
            let data = new Object()
            this.listLoading = true
            if(this.categoryId){
                data['categoryId'] = this.categoryId
            }
            if(this.deviceStatus){
                data['deviceStatus'] = this.deviceStatus
            }
            if(this.checkTime){
                data['checkTime'] = this.checkTime
            }
            data['pageIndex'] = 1
            data['pageSize'] = 10
            this.pagepostdata = JSON.stringify(data)
            this.currentPage = 1
            findPage(data).then(res => {
                console.log(res)
                this.list = res.queryResult.dataList;
                this.count = res.queryResult.rowCount
                this.listLoading = false
            })
        },
        // 组件传出的事件  传当前页码获取该页码数据
        handleCurrentChange(e) {
            let data
            if(this.pagepostdata){
                data = JSON.parse(this.pagepostdata)
                data.pageIndex = e
            } else {
                data = {
                    pageIndex: e,
                    pageSize: 10
                }
            }
            findPage(data).then(res => {
                this.list = res.queryResult.dataList;
            });
        }
    },
    components: {
        modifyalert,
        pagination,
        olddata,
        intoexcel
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
