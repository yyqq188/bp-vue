<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>配置管理</el-breadcrumb-item>
    <el-breadcrumb-item>新建任务</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 任务配置 -->
    <el-card>
        <el-form  ref="addFormRef" label-width="100px" label-position="top">
        <el-form-item label="任务名称" required>
            <el-input v-model="addForm.taskName" placeholder="任务名称"></el-input>
        </el-form-item>
        <el-form-item label="运行模式" required>
            <el-input v-model="addForm.resourceMode" placeholder="运行模式"></el-input>
        </el-form-item>
        <el-form-item label="flink运行配置" required>
        
            <el-select v-model="addForm.taskConfig" placeholder="flink运行配置">
                <el-option label="yarn-pre-job" value="yarn-pre-job"></el-option>
                <el-option label="yarn-session" value="yarn-session"></el-option>
                <el-option label="yarn-application" value="yarn-application"></el-option>
                <el-option label="standalone-session" value="standalone-session"></el-option>
            </el-select>
        
        
        </el-form-item>
        <el-form-item label="Checkpoint信息" required>
            <el-input v-model="addForm.checkPointInfo" placeholder="Checkpoint信息"></el-input>
        </el-form-item>
        <el-form-item label="三方jar地址(自定义udf,连接器等jar地址,多个用换行)" required>
            <el-input v-model="addForm.jarsAddress"  :rows="3" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="SQL" required>
            <!-- 上传sql文件 -->
            <!-- on-preview是在选择上传文件时触发,之后的before-upload是在真正上传前触发 -->
        <el-upload
            :action="uploadUrl"
            :before-upload="beforeUpload"
            multiple
            :limit="1"
            :on-success="handleSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传sql文件(以.sql结尾)</div>
        </el-upload>
        </el-form-item>
      </el-form>
     
      <codemirror ref="codeMirrorEditor" :value="code" :options="cmOptions">
      </codemirror>
      <el-button size="small" type="primary" @click="jobAllConf">确定</el-button>
    </el-card>

    
    
  </div>
</template>

<script>
    //   //传入JobList.vue
    //   import JobListPage from "../../components/jobs/JobList.vue"
      

      

      import codemirror from "codemirror/lib/codemirror"
      require("codemirror/mode/clike/clike.js")
      require("codemirror/addon/edit/closebrackets.js")

      import "codemirror/theme/darcula.css";
      require("codemirror/mode/sql/sql");
      import 'codemirror/addon/hint/sql-hint'
      //上下左右滚动条
      import 'codemirror/addon/scroll/simplescrollbars.css'
      import 'codemirror/addon/scroll/simplescrollbars'

      import 'codemirror/addon/selection/active-line'
      components: {
          codemirror
      }
      export default{
          data(){
              return{
                //sqlCode
                code: '',
                cmOptions:{
                    // mode: "text/x-java",  //Java语言
                    mode: "text/x-sql",
                    theme: "darcula", // 默认主题
                    autofocus: false,  
                    lineNumbers: true,   //显示行号
                    smartIndent: true, // 自动缩进
                    autoCloseBrackets: true,// 自动补全括号
                    tabSize:3
                },
                addForm:{
                    //任务名称
                    taskName:'',
                    //运行模式
                    resourceMode:'',
                    //运行配置
                    taskConfig:'',
                    //Checkpoint信息
                    checkPointInfo:'',
                    //第三方jar地址
                    jarsAddress:''
                    
                },
                uploadUrl:'https://jsonplaceholder.typicode.com/posts/',
                // uploadUrl:'http://127.0.0.1:9992/bp/v1/uploadSqlFile',
              }
          },
          methods:{
              async jobAllConf(){
                //   console.log("aaaa");
                //   console.log(this.$refs.codeMirrorEditor.codemirror.getValue());
                var flinkSql = this.$refs.codeMirrorEditor.codemirror.getValue()
                this.addForm.flinkSql = flinkSql
                const {data:res} = await this.$http.post('addtaskinfo',this.addForm)
                
                if(res.meta.status !== 200) {
                    return this.$message.error('添加任务失败')
                }
                this.$message.success('添加任务成功')
               
            
              },

              async testButton(){
                  const {data:res} = await this.$http.get("gettaskinfo")
                  if(res.meta.status !== 200){
                      return this.$message.error('错误')
                  }
                  this.$$message.success('成功')
              },
              

              //上传文件之前先去判断文件是否是以sql结尾
              beforeUpload(file){
                  var start = file.name.length - '.sql'.length
                  var char = file.name.substr(start,file.name.length)
                  if(char !== '.sql'){
                      this.$message.error('格式不对,请上传sql文件')
                      return false //就不会走上传的逻辑了
                  }
                  

              },
              //上传成功处理
              handleSuccess(response,file){

                  if(file.status === 'success'){
                    return this.$message.success('上传文件成功')
                    
                  }else{
                    return this.$message.error('上传文件失败')
                  }
                
              }
              
          }
      }
</script>

<style lang="less" scoped>
    .codemirror {
        margin-top: 5px;
    }
    .el-button{
        margin-top: 10px;
       
        
        
    }

</style>