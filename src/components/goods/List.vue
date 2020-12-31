<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
              <el-col :span="8">
                  <el-input placeholder="请输入内容"></el-input>
              </el-col>
              <el-col :span="4">
                  <el-button type="primary" icon="el-icon-search">添加商品</el-button>
              </el-col>
            </el-row>

            <!-- table表格区 -->
            <el-table :data="goodsList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="商品名称" prop="goods_name" ></el-table-column>
                <el-table-column label="商品价格(元)" prop="goods_price" width="110px"></el-table-column>
                <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
                <el-table-column label="创建时间" prop="add_time" width="140px">
                    <template slot-scope="scope">
                        {{scope.row.add_time | dateFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template>
                        <el-button size = "mini" type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" type="warning" icon="el-icon-delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>



            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="queryInfo.pagesize"
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
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:10
            },
            goodsList:[],
            total:''

        }
    },
    created(){
        this.getGoodsList()
        

    },
    methods:{
        //根据分页获取对应的商品
        async getGoodsList(){
            const {data:res} = await this.$http.get('goods',{params:this.queryInfo})
            if(res.meta.status !== 200) return this.$message.error('获得商品列表失败')
            this.goodsList = res.data.goods
            this.total = res.data.total
            // this.$message.success('获取商品列表成功')
        },
        handleSizeChange(newsize){
            this.queryInfo.pagesize = newsize
            this.getGoodsList()
        },
        handleCurrentChange(newpage){
            this.queryInfo.pagenum = newpage
            this.getGoodsList()
        }

    }

    
}
</script>

<style lang="less" scoped>

</style>