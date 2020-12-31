<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row>
              <el-col>
                <el-button type="primary">添加分类</el-button>
              </el-col>
            </el-row>

            <tree-table :data="catelist" :columns="columns" 
            :selection-type="false" :expand-type="false" show-index 
            index-text="#" border :show-row-hover="false">
            <!-- 是否有效 -->
            <template slot="isok" slot-scope="scope">
                <i style="color:lightgreen" class="el-icon-success" v-if="scope.row.cat_deleted === false"></i>
                <i style="color:red" class="el-icon-error" v-else></i>
            </template>
            <!-- 等级 -->
            <template slot="order" slot-scope="scope">
                <el-tag size = "mini" v-if="scope.row.cat_level===0">一级</el-tag>
                <el-tag size = "mini" type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
                <el-tag size="mini" type="warning" v-else>三级</el-tag>
                
            </template>
            <!-- 操作 -->
            <template slot="opt">
                
                <el-button size = "mini" type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button size = "mini" type="warning" icon="el-icon-delete">删除</el-button>
                <!-- <el-tooltip effect="dark" content="操作" placement="top" enterable>
                    <el-button size = "mini" type="primary" icon="el-icon-setting"></el-button>
                </el-tooltip> -->
                

            </template>

            </tree-table>

           
        </el-card>

    </div>
</template>

<script>
export default {
    data(){
        return {
            //商品分类的列表
        catelist:[],
        queryInfo:{
            type:3,
            pagenum:1,
            pagesize:2
        },
        total:'',
        columns:[{
            label:'分类名称',
            prop:'cat_name'
        },{
            label:'是否有效',
            prop:'',
            type:'template',
            template:'isok'
            },
            {
            label:'排序',
            prop:'',
            type:'template',
            template:'order'
            },
            {
                lable:'操作',
                type:'template',
                template:'opt'
            }
        ]

        }
        
    },
    created(){
        this.getCateList()

    },
    methods:{
        //获得商品分类数据
        async getCateList(){
            const {data:res} = await this.$http.get('categories',{params:this.queryInfo})
            if(res.meta.status !== 200) return this.$message.error('获得商品分类数据失败')

            this.$message.success('获得商品分类数据成功')
            console.log(res.data);
            
            this.catelist = res.data.result
            this.total = res.data.total

        }

    }
    
}
</script>

<style lang="less" scoped>

</style>