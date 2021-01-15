<template>
    <div>

        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>配置管理</el-breadcrumb-item>
            <el-breadcrumb-item>任务列表</el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>

            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="queryTaskInfo.query" clearable @clear="getTaskList">
                    <el-button slot="append" icon="el-icon-search" @click="getTaskList"></el-button>
                </el-input>
                </el-col>
                <el-col :span="4">
                <el-button type="primary" @click="addDialogVisible = true">添加任务</el-button>
                </el-col>
            </el-row>

            <el-table :data="TaskList">
              <el-table-column align="center" label="id" prop="id"></el-table-column>
              <el-table-column align="center" label="任务名称" prop="taskName"></el-table-column>
              <el-table-column align="center" label="运行模式" prop="resourceMode"></el-table-column>
              <el-table-column align="center" label="运行配置" prop="taskConfig"></el-table-column>
              <el-table-column align="center" label="checkpoint信息" prop="checkPointInfo"></el-table-column>
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



    </div>
</template>


<script>
export default {

    data(){
        return {
            queryTaskInfo:{
                query:'',
                page:1,
                size:5
            },
            TaskList:[]
        }
    },
    created(){
        this.getTaskList()
    },
    methods:{
        getTaskList(){
            
        },
        showEditDialog(){

        },
        removeUserById(){}
    }
    
}
</script>


<style lang="less" scoped>

</style>