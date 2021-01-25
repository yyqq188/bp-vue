<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>运行日志</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>

            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="queryJobListInfo.query" clearable @clear="getJobLogs">
                    <el-button slot="append" icon="el-icon-search" @click="getJobLogs"></el-button>
                </el-input>
                </el-col>
                
            </el-row>



            <el-table :data="JobLogsList"  border stripe>
              <el-table-column align="center" fixed type="index" label="#"></el-table-column>
              <el-table-column align="center" fixed label="jid" prop = "jid"></el-table-column>
              <el-table-column align="center" fixed label="name" prop = "name"></el-table-column>
              <el-table-column align="center" fixed label="state" prop = "state"></el-table-column>
              <el-table-column align="center" fixed label="startTime" prop = "startTime"></el-table-column>
              <el-table-column align="center" label="endTime" prop = "endTime"></el-table-column>
              <el-table-column align="center" label="duration" prop = "duration"></el-table-column>
              <el-table-column align="center" label="lastModification" prop = "lastModification"></el-table-column>
              <el-table-column align="center" label="tasksTotal" prop = "tasksTotal"></el-table-column>
              <el-table-column align="center" label="tasksCreated" prop = "tasksCreated"></el-table-column>
              <el-table-column align="center" label="tasksScheduled" prop = "tasksScheduled"></el-table-column>
              <el-table-column align="center" label="tasksDeploying" prop = "tasksDeploying"></el-table-column>
              <el-table-column align="center" label="tasksRunning" prop = "tasksRunning"></el-table-column>
              <el-table-column align="center" label="tasksFinished" prop = "tasksFinished"></el-table-column>
              <el-table-column align="center" label="tasksCanceling" prop = "tasksCanceling"></el-table-column>
              <el-table-column align="center" label="tasksCanceled" prop = "tasksCanceled"></el-table-column>
              <el-table-column align="center" label="tasksFailed" prop = "tasksFailed"></el-table-column>
              <el-table-column align="center" label="tasksReconciling" prop = "tasksReconciling"></el-table-column>
              <el-table-column align="center" fixed label="executionMode" prop = "executionMode"></el-table-column>
              <el-table-column align="center" fixed label="restartStrategy" prop = "restartStrategy"></el-table-column>
              <el-table-column align="center" fixed label="jobParallelism" prop = "jobParallelism"></el-table-column>
              <el-table-column align="center" label="objectReuseMode" prop = "objectReuseMode"></el-table-column>
            </el-table>


            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryJobListInfo.page"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="queryJobListInfo.size"
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

            queryJobListInfo:{
                query:'',
                page:1,
                size:5
            },

            JobLogsList:[],
            total:0
        }
    },
    methods:{
        async getJobLogs(){
            const {data:res} =  await this.$http.get("joblog",{params:this.queryJobListInfo})
            if(res.meta.status !== 200){
                return this.$message.error("获取运行日志信息失败")
            }
            this.JobLogsList = res.data.content
            this.total = res.data.total

        },
        handleSizeChange(newSize){
            this.queryJobListInfo.size = newSize
            this.getJobLogs()
        },
        handleCurrentChange(newPage){
            this.queryJobListInfo.page = newPage
            this.getJobLogs()
        }

    },
    created(){
        this.getJobLogs()
    }
    
}
</script>

<style lang="less" scoped>
.el-table{
    font-weight:700;
}

</style>