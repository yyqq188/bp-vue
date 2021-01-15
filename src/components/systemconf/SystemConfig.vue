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
                <el-table-column align="center" prop="id" label="索引"></el-table-column>
                <el-table-column align="center" prop="bpTitle" label="名称"></el-table-column>
                <el-table-column align="center" prop="bpVal" label="键值"></el-table-column>
                <el-table-column align="center" prop="bpDesc" label="描述"></el-table-column>
                <el-table-column align="center" label="操作"></el-table-column>
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


        }

    }
    
}
</script>


<style lang="less" scoped>

</style>