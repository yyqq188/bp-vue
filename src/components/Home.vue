<template>
    


    <el-container class="home-container">
    <el-header>
        <div>
            <img src="../assets/1462750208.jpg" class="logo-image" alt="">
            <h3>FlinkSQL开发平台</h3>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
        <el-aside :width="isCollapse?'64px':'200px'">

        <div class="toggle-button"  @click="toggleCollapse">|||</div>
        <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath">
            <!-- 一级菜单 -->
            <el-submenu :index="item.id+''" 
            v-for="item in menulist" :key="item.id">
                <template slot="title">
                <i :class="iconObj[item.id]"></i>
                <span v-text="item.authName"></span>
                </template>
                
                    
            
                <!-- 二级菜单 -->
                <el-menu-item :index="'/' + subItem.path" 
                v-for="subItem in item.children" :key="subItem.id"
                @click="activeNavStatus('/' + subItem.path)">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span v-text="subItem.authName"></span>
                    </template>
                </el-menu-item>
            </el-submenu>
            
      
    </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return {
            menulist:[],
            iconObj:{
                '105':'iconfont icon-user',
                '103':'iconfont icon-tijikongjian',
                '101':'iconfont icon-shangpin',
                '102':'iconfont icon-danju',
                '104':'iconfont icon-baobiao'
            },
            isCollapse:false,
            activePath:''

           
        }
    },
    created(){
        this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
        
    },
    methods:{
       
        logout(){
            window.sessionStorage.clear()
            this.$router.push("/login")
        },
        async getMenuList(){
            const {data:res} = await this.$http.get('menus')
            if(res.meta.status != 200){
                return this.$message.error(res.meta.msg)
            }
            this.menulist = res.data
            // console.log(this.menulist);
            
        },
        //菜单的折叠展开
        toggleCollapse(){
            this.isCollapse = !this.isCollapse
        },

        //绑定选择的点击菜单
        activeNavStatus(activePath){
            window.sessionStorage.setItem('activatePath',activePath)
            this.activePath = activePath
        }
        
    }
    
}
</script>
<style lang="less" scoped>
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left:0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div{
        display: flex;
        align-items: center;
        > span {
            margin-left:15px;
        }
    }
}
.el-aside{
    background-color: #333744;
}
.el-main{
    background-color: eaedf1;
}
.home-container{
    height: 100%;
}
.logo-image{
    height: 40px;
    width: 40px;
}
.iconfont{
    margin-right: 10px;
}
.el-menu{
    border-right: 0;
}
.toggle-button{
    background-color: #4A5064;
    color:#fff;
    line-height: 24px;
    font-size: 10px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>