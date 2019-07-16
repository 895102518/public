<template>
  <div class="all">
    <el-form ref="addShopFrom" :model="addShopFrom" label-width="180px">
      <el-form-item label="设备所属类别" prop="categoryId">
        <el-select v-model="addShopFrom.categoryId" placeholder="请选择">
          <el-option
            v-for="item in operatoroptions"
            :key="item.categoryId"
            :label="item.categoryName"
            :value="item.categoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称" style="width:505px" prop="deviceName">
        <el-input v-model="addShopFrom.deviceName"></el-input>
      </el-form-item>
      <el-form-item label="设备型号" style="width:505px" prop="deviceType">
        <el-input v-model="addShopFrom.deviceType"></el-input>
      </el-form-item>
      <el-form-item label="设备编号" style="width:505px" prop="deviceNo">
        <el-input v-model="addShopFrom.deviceNo"></el-input>
      </el-form-item>
      <el-form-item label="煤安编号" style="width:505px" prop="coalSafetyNo">
        <el-input v-model="addShopFrom.coalSafetyNo"></el-input>
      </el-form-item>
      <el-form-item label="制造厂家" style="width:505px" prop="producer">
        <el-input v-model="addShopFrom.producer"></el-input>
      </el-form-item>
      <el-form-item label="使用地点" style="width:505px" prop="usePlace">
        <el-input v-model="addShopFrom.usePlace"></el-input>
      </el-form-item>
      <el-form-item label="入井时间" style="width:505px" prop="intoWellTime">
        <el-date-picker
          v-model="addShopFrom.intoWellTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="入井验收人及验收结果" style="width:505px" prop="acceptorResult">
        <el-input v-model="addShopFrom.acceptorResult"></el-input>
      </el-form-item>
      <el-form-item label="安装时间" style="width:505px" prop="installTime">
        <el-date-picker
          v-model="addShopFrom.installTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="安装验收人及验收结果" style="width:505px" prop="installResult">
        <el-input v-model="addShopFrom.installResult"></el-input>
      </el-form-item>
      <el-form-item label="干燥剂更换时间" style="width:505px" prop="desiccantReplaceTime">
        <el-date-picker
          v-model="addShopFrom.desiccantReplaceTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="设备检修时间" style="width:505px" prop="checkTime">
        <el-date-picker
          v-model="addShopFrom.checkTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="设备状态" style="width:505px" prop="deviceStatus">
        <el-select v-model="addShopFrom.deviceStatus" placeholder="请选状态">
          <el-option label="在用" value="0"></el-option>
          <el-option label="闲置" value="1"></el-option>
          <el-option label="备用" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备升井时间" style="width:505px" prop="deviceUpTime">
        <el-date-picker
          v-model="addShopFrom.deviceUpTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" style="width:505px" prop="remark">
        <el-input v-model="addShopFrom.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm('addShopFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findAll, adddata } from "@/api/manage/manage";
export default {
  name: "Dashboard",
  data() {
    return {
      operatoroptions: [],
      addShopFrom: {
        categoryId: "",
        deviceName: "",
        deviceType: "",
        deviceNo: "",
        coalSafetyNo: "",
        producer: "",
        usePlace: "",
        intoWellTime: "",
        acceptorResult: "",
        installTime: "",
        installResult: "",
        desiccantReplaceTime: "",
        checkTime: "",
        deviceStatus: "",
        deviceUpTime: "",
        remark: "",
      }
    };
  },
  mounted() {
    this.getAllSelect();
  },
  methods: {
    // 得到下拉分类列表
    getAllSelect() {
      findAll().then(res => {
        this.operatoroptions = res.queryResult.dataList;
      });
    },

    // 提交表单
    submitForm() {
      console.log(this.addShopFrom, "112121212121212112");
      for (let i in this.addShopFrom) {
        if (this.addShopFrom[i] == "") {
          this.$message({ message: "请填写完整", type: "warning" });
          return;
        }
      }
      adddata(this.addShopFrom).then(res => {
        this.$message({ message: "添加成功", type: "success" });
        this.$refs.addShopFrom.resetFields();
      });
    },
    // 重置
    resetForm() {
      this.$refs.addShopFrom.resetFields();
    }
  }
};
</script>

<style  scoped>
.all {
  padding: 30px;
}
.file_name_class {
  white-space: nowrap;
}
</style>
