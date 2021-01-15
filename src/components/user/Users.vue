<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>

        </el-breadcrumb>

        <!-- card区域 -->
        <el-card class="box-card">
            <!-- 搜索添加区 -->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button  slot="append" icon="el-icon-search" @click="getUserListLike"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区 -->
            <el-table :data="userList" border stripe>
                <el-table-column align="center" type="index" label="索引"></el-table-column>
                <el-table-column align="center" prop="username" label="姓名"></el-table-column>
                <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
                <el-table-column align="center" prop="mobile" label="电话"></el-table-column>
                <el-table-column align="center" prop="role" label="角色"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state" @change="userStatusChange(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUserInfo(scope.row.id)"></el-button>

                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    </template>
                    
                    
                </el-table-column>

            </el-table>

            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加用户的对话框 -->
        <el-dialog
            title="添加用户"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClosed">
            <!-- 内容主体区 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>

<!-- 修改用户的对话框 -->
<el-dialog
  title="修改用户"
  :visible.sync="editDialogVisible"
  width="50%" @close="editDialogClosed">

 <!-- 内容主体区 -->
<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
    <el-form-item label="用户名">
        <el-input v-model="editForm.username" disabled></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
    </el-form-item>
</el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
</el-dialog>




    </div>
</template>


<script>
export default {
    data(){

        //添加邮箱和手机号的自定义校验规则
        var checkEmail = (rule,value,cb) => {
            const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
            if(regEmail.test(value)){
                return cb()
            }
            cb(new Error('请输入合法的邮箱'))
        }
        var checkMobile = (rule,value,cb) => {
            const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/
            if(regMobile.test(value)){
                return cb()
            }
            cb(new Error('请输入合法的手机号'))
        }

        return {
            //获取用户列表的参数对象
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:2
            },
            userList:[],
            total:0,
            addDialogVisible:false,
            //添加用户的表单数据
            addForm:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            //添加用户的验证规则

            addFormRules:{
                username:[
                    {required: true, message:'请输入用户名', trigger: 'blur'},
                    {required: true, min:3,max:10,message:'用户名在3到10个字符', trigger: 'blur'}
                ],
                password:[
                    {required: true, message:'请输入密码', trigger: 'blur'},
                    {required: true, min:6,max:15,message:'密码在6到15个字符', trigger: 'blur'}
                ],
                email:[
                    {required: true, message:'请输入邮箱', trigger: 'blur'},
                    {validator:checkEmail,trigger:'blur'}
                ],
                mobile:[
                    {required: true, message:'请输入手机号', trigger: 'blur'},
                    {validator:checkMobile,trigger:'blur'}
                ]

            },
            //控制修改用户对话框的显示与否
            editDialogVisible:false,
            //查询到的editForm数据保存
            editForm:{},
            //修改表单的验证规则
            editFormRules:{
                email:[
                    {required: true, message:'请输入邮箱', trigger: 'blur'},
                    {validator:checkEmail,trigger:'blur'}
                ],
                mobile:[
                    {required: true, message:'请输入手机号', trigger: 'blur'},
                    {validator:checkMobile,trigger:'blur'}
                ]
            }
            

        }
    },
    created(){
        this.getUserList()
    },
    methods:{

        //模糊查询
        async getUserListLike(){
            const {data:res} = await this.$http.get('userslike/'+this.queryInfo.query)
            if(res.meta.status !== 200){
                return this.$message.error("获得用户模糊查询失败")
            }
            this.userList = res.data
        },



        async getUserList(){
            const {data:res} =  await this.$http.get('users',{params:this.queryInfo})
            
            if(res.meta.status != 200) return this.$message.error("获取用户列表失败!")
            this.userList = res.data.content
            this.total = res.data.total
        },
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize
            this.getUserList()

        },
        handleCurrentChange(newPage){
            this.queryInfo.pagenum = newPage
            this.getUserList()

        },
        //监听switch开关的改变
        async userStatusChange(userinfo){
            const {data:res} = await this.$http.put(`changestate/${userinfo.id}/state/${userinfo.state}`)
            if(res.meta.status != 200) {
                // if(userinfo.state === 'true'){
                //     this.userinfo.state = false
                // }else{
                //      this.userinfo.state = true
                // }
                // this.getUserList()
                this.userinfo.state = !userinfo.state
                return this.$message.error("更新用户状态失败!")
            }
            return this.$message.success("更新用户状态成功")

        },
        addDialogClosed(){
            this.$refs.addFormRef.resetFields()
        },
        //校验添加用户的表单
        addUser(){
            this.$refs.addFormRef.validate(async valid=> {
                if(!valid) return 
                // const {data:res} = await this.$http.post('users',this.addForm)
                const {data:res} = await this.$http.post('adduser',this.addForm)
                if(res.meta.status !== 201) {
                    this.$message.error('添加用户失败')
                }
                this.$message.success('添加用户成功')
                this.addDialogVisible = false
                //重新获得用户的列表
                this.getUserList()
        
            })
        },
        //显示编辑的用户对话框
        async showEditDialog(id){
            const {data:res} = await this.$http.get('users/' + id)
            if(res.meta.status !==200 ) return this.$message.error('查询用户信息失败')
            this.editForm = res.data
            this.editDialogVisible = true
        },
        //修改表单的重置
        editDialogClosed(){
            this.$refs.editFormRef.resetFields()
        },
        editUserInfo(){
            this.$refs.editFormRef.validate(async valid => {
                if(!valid) return
                const {data: res} = await this.$http.put("users/" + this.editForm.id,{
                    email:this.editForm.email,
                    mobile:this.editForm.mobile
                })
                if(res.meta.status !== 200) return this.$message.error('用户信息修改失败')

                //关闭对话框
                this.editDialogVisible = false
                //重新获取数据
                this.getUserList()
                //给出提示信息
                this.$message.success("用户信息修改成功")
            })

        },

        //删除用户信息
        async deleteUserInfo(id){
            const resultConfirm = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch( err => err)
            if(resultConfirm !== "confirm") {
                return this.$message.info('已经取消删除用户信息')

            }
            const {data:res} = await this.$http.delete('users/' + id)
            if(res.meta.status !== 200){
                return this.$message.error('没有获得用户信息')
            }
            this.$message.success('删除用户信息成功')
            this.getUserList()
            
        }
    }

    
}
</script>

<style lang="less" scoped>

</style>