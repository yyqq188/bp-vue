<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
            <el-alert
                title="注意:只允许第三级分类设置参数"
                type="warning" :closable="false" show-icon>
            </el-alert>
            <!-- 选择商品分类 -->
            <el-row class="cat_opt">
              <el-col>
                  <span>选择商品分类:</span>
                  <!-- 即连续按咋看 -->
                  <el-cascader
                    expand-trigger='hover'
                    v-model="selectedCateKeys"
                    :options="cateList"
                    :props="cateProps"
                    @change="handleChange">
                    </el-cascader>
              </el-col>
            </el-row>
        <el-card>

        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            cateList:[],
            //即连续按咋看的配置对象
            cateProps:{
                value:'cat_id',
                label:'cat_name',
                children:'children'

            },
            selectedCateKeys:[]
        }
    },
    created(){
        this.getCateList()
    },
    methods:{
        async getCateList(){
            const {data:res} = await this.$http.get('categories')
            if(res.meta.status !== 200) return this.$message.error('获取商品列表失败')
            this.cateList = res.data
            console.log(this.cateList);
            
        },
        //几联变化触发
        handleChange(){
            
        }

    }
    
}
</script>

<style lang="less" scoped>
.cat_opt{
    margin: 15px 0;
}

</style>