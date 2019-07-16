<template>
    <div>
        <!-- changeResult，changeTime，checkResult，deviceId -->
        <el-dialog
            :visible="excelshow"
            @close="close"
            title="修改接入商信息"
            :close-on-click-modal="clickmodal"
        >
            <span>请选择所添加的类别</span>
            <el-select
                v-model="categoryId"
                placeholder="请选择"
                style="margin:20px 0"
                @change="getcategoryId(categoryId)"
            >
                <el-option
                    v-for="item in operatoroptions"
                    :key="item.categoryId"
                    :label="item.categoryName"
                    :value="item.categoryId"
                ></el-option>
            </el-select>
            <el-upload
                class="upload-demo"
                ref="upload"
                :action="updataBannerUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :auto-upload="false"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
            >
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button type="primary" @click="modifyintolist" style="margin-top:50px;">确定导入</el-button>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categoryId: "",
            fileList: [],
            updataBannerUrl:
                "http://123.206.57.129:8080/cc5c/device/import?categoryId=",
            clickmodal: false
        };
    },
    props: {
        excelshow: {
            type: Boolean
        },
        alertData: {
            type: Object
        },
        operatoroptions: {
            type: Array
        }
    },
    methods: {
        getcategoryId(e) {
            this.updataBannerUrl = this.updataBannerUrl + e;
        },
        close() {
            this.$emit("update:excelshow", false);
        },
        modifyintolist() {
            if (this.categoryId == "") {
                this.$message({ message: "请选择分类", type: "warning" });
                return;
            }
            this.$refs.upload.submit();
            this.categoryId = "",
            this.fileList = []
            this.close()
            this.$message({ message: "上传成功", type: "success" });
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    }
};
</script>

<style scoped>
</style>
