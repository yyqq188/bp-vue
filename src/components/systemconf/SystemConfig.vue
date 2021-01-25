<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="querySystemConfigInfo.query" clearable @clear="getSystemConfigList">
                    <el-button slot="append" icon="el-icon-search" @click="getSystemConfigListLike"></el-button>
                </el-input>
                </el-col>
                <el-col :span="4">
                <el-button type="primary" @click="addDialogVisible = true">添加系统设置</el-button>
                </el-col>
            </el-row>

            <el-table :data="systemConfigList"  border stripe>
                <el-table-column align="center" prop="id" label="#"></el-table-column>
                <el-table-column align="center" prop="bpTitle" label="名称"></el-table-column>
                <el-table-column align="center" prop="bpVal" label="键值"></el-table-column>
                <el-table-column align="center" prop="bpDesc" label="描述"></el-table-column>
                <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <!-- 修改按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                    <!-- 删除按钮 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
                </template> 
              </el-table-column>
            </el-table>
        </el-card>

        <!-- 添加系统配置对话框  :rules="addSystemConfigRule"     -->
        <el-dialog title="添加系统设置" :visible.sync="addDialogVisible" width="50%" @close="addSystemConfigDialogClosed">
            <el-form   ref="addSystemConfigRef"  :model="addSystemConfigForm"
              label-width="70px">
              <el-form-item label="配置项" required>
                <el-select v-model="addSystemConfigForm.bpTitle" clearable placeholder="请选择配置项">
                    <el-option v-for="item in SystemConfig" :key="item.label" :value="item.value" :label="item.label" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="变量值">
                <el-input v-model="addSystemConfigForm.bpVal" placeholder="请输入变量值"></el-input>
            </el-form-item>
            </el-form>

            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSystemConfig">确 定</el-button>
            </span>

        </el-dialog>


        <!-- 添加编辑对话框  :rules="editSystemConfigRule"     -->
        <el-dialog title="编辑系统设置" :visible.sync="editDialogVisible" width="50%" @close="editSystemConfigDialogClosed">
            <el-form   ref="editSystemConfigRef"  :model="editSystemConfigForm"
              label-width="70px">
              <el-form-item label="名称">
                <el-input v-model="editSystemConfigForm.bpTitle" placeholder="请输入变量值" disabled></el-input>
              </el-form-item>
              <el-form-item label="键值">
                <el-input v-model="editSystemConfigForm.bpVal" placeholder="请输入变量值"></el-input>
              </el-form-item>
            </el-form>

            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSystemConfig">确 定</el-button>
            </span>

        </el-dialog>
        
        
    </div>
    

</template>

<script>
export default {
    data(){
        return {
            querySystemConfigInfo:{
                query:'',
                page:1,
                size:5
            },
            systemConfigList:[],
            addDialogVisible:false,
            editDialogVisible:false,
            SystemConfig:[
                {
                    label:"flink客户端目录(必选)",
                    value:"flink_home"
                },
                {
                    label:"flink-streaming-platform-web应用安装的目录(必选)",
                    value:"flink_streaming_platform_web_home"
                },
                {
                    label:"yarn的rm Http地址(yarn per模式必须)",
                    value:"yarn_rm_http_address"
                },
                {
                    label:"link Rest & web frontend地址(Local Cluster模式)",
                    value:"flink_rest_http_address"
                },
                {
                    label:"flink Rest & web frontend HA 地址(Standalone Cluster模式,支持HA,可以填写多个地址 ;用分隔)",
                    value:"flink_rest_ha_http_address"
                }],
            addSystemConfigForm:{
                bpTitle:'',
                bpVal:'',
                bpDesc:''

            },
            editSystemConfigForm:{
                bpTitle:'',
                bpVal:''

            },
            labelValueMapping:{
                "flink_home":"flink客户端目录(必选)",
                "flink_streaming_platform_web_home":"flink-streaming-platform-web应用安装的目录(必选)",
                "yarn_rm_http_address":"yarn的rm Http地址(yarn per模式必须)",
                "flink_rest_http_address":"link Rest & web frontend地址(Local Cluster模式)",
                "flink_rest_ha_http_address":"flink Rest & web frontend HA 地址(Standalone Cluster模式,支持HA,可以填写多个地址 ;用分隔)"
            }
                
            

        }
    },
    created(){
        this.getSystemConfigList()

    },
    methods:{
        async getSystemConfigListLike(){
            const {data:res} = await this.$http.get("systemconfig_pagelistlike/"+this.querySystemConfigInfo.query)
            if(res.meta.status !== 200){
                return this.$message.error("获取系统配置信息模糊查询失败")
            }
            this.systemConfigList = res.data.content
            this.total = res.data.total
        },


        async getSystemConfigList(){
            const {data:res} = await this.$http.get("systemconfig_pagelist",{params:this.querySystemConfigInfo})
            if(res.meta.status !== 200) {
                return this.$message.error("获取系统配置信息失败")
            }
            this.systemConfigList = res.data.content
            this.total = res.data.total
        },

        addSystemConfigDialogClosed(){
            this.$refs.addSystemConfigRef.resetFields()
        },
        async addSystemConfig(){
            this.addSystemConfigForm.bpDesc = this.labelValueMapping[this.addSystemConfigForm.bpTitle]
            console.log(this.addSystemConfigForm);
            const {data:res} = await this.$http.post("addsystemconfig",this.addSystemConfigForm)
            if(res.meta.status !== 200){
                return this.$message.error("添加系统配置失败")
            }

            this.$message.success("添加系统配置成功")
            this.getSystemConfigList()
            this.addDialogVisible = false


        },
        editSystemConfigDialogClosed(){
            this.$refs.editSystemConfigRef.resetFields()
        },
        async showEditDialog(id){
            const {data:res} = await this.$http.get("getsystemconf",{params:{"id":id}})
            if(res.meta.status !== 200){
                return this.$message.error("没有找到对应的编辑信息")
            }
            this.editSystemConfigForm = res.data
            this.editDialogVisible = true

        },

        async editSystemConfig(){

            const {data:res} = await this.$http.put("updatesystemconfig",this.editSystemConfigForm)
            if(res.meta.status !== 200){
                return this.$message.error("编辑系统配置失败")
            }
            this.editDialogVisible = false
            this.getSystemConfigList()
            this.$message.success("系统信息修改成功")
        },
        async removeUserById(id){
            const resultConfirm = await this.$confirm('此操作将永久删除配置, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch( err => err)
            if(resultConfirm !== "confirm") {
                return this.$message.info('已经取消删除配置信息')

            }
            const {data:res} = await this.$http.delete('deletesystemconfig/' + id)
            if(res.meta.status !== 200){
                return this.$message.error('没有获得配置信息')
            }
            this.$message.success('删除配置信息成功')
            this.getSystemConfigList()

        }
            


    }
    
}
</script>


<style lang="less" scoped>
.el-table{
    font-weight:700;
}

</style>