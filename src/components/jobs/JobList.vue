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
                    <el-button slot="append" icon="el-icon-search" @click="getTaskListLike"></el-button>
                </el-input>
                </el-col>
            </el-row>
            
            <el-table :data="taskList"> 
              <el-table-column align="center" label="id" prop="id"></el-table-column>
              <el-table-column align="center" label="任务名称" prop="taskName"></el-table-column>
              <el-table-column align="center" label="运行模式" prop="resourceMode"></el-table-column>
              <el-table-column align="center" label="运行配置" prop="taskConfig"></el-table-column>
              <el-table-column align="center" label="checkpoint信息" prop="checkPointInfo"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <!-- 修改按钮 -->
                    <el-link class="el-linkstyle" type="primary" href="">运行</el-link>
                    
                    <!-- 删除按钮 -->
                    <el-link type="danger" href="">停止</el-link>

                </template> 
              </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryTaskInfo.page"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="queryTaskInfo.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total" background>
            </el-pagination>

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
            taskList:[],
            total:0
        }
    },
    created(){
        this.getTaskList()
    },
    methods:{
        async getTaskList(){
            const {data:res} =  await this.$http.get("gettaskinfos",{params:this.queryTaskInfo})
            if(res.meta.status !== 200){
                return this.$message.error("获取任务信息失败")
            }
            this.taskList = res.data.content
            this.total = res.data.total
            
        },
        //模糊分页查询
        async getTaskListLike(){
            const {data:res} =  await this.$http.get("gettaskinfos_like",{params:this.queryTaskInfo})
            console.log(this.queryTaskInfo);
            
            if(res.meta.status !== 200){
                return this.$message.error("获取任务信息失败")
            }
            this.taskList = res.data.content
            this.total = res.data.total
            
        },
        showEditDialog(){

        },
        removeUserById(){

        },
        handleSizeChange(newSize){
            this.queryTaskInfo.size = newSize
            this.getTaskList()
        },
        handleCurrentChange(newPage){
            this.queryTaskInfo.page = newPage
            this.getTaskList()
        }
    }
    
}
</script>


<style lang="less" scoped>

.el-link{
    margin-right: 20px;
    font-weight: 700;

}
.el-table{
    font-weight:700;
}

</style>