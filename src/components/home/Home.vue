<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
  <el-header class="home-header">
    <el-row type="flex" class="row-bg"
            justify="space-between"
            align="middle">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img src="@/assets/imgs/logo.png" alt="">
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
         <h1> 电商后台管理系统</h1>
        </div>
      </el-col>
      <el-col :span="6" class="welcome">
        <div class="grid-content bg-purple">
          欢迎上海前端31期星曜会员
          <a href="javascript:;" @click="logout">退出</a>

        </div>
      </el-col>
    </el-row>
  </el-header>
  <!-- 下边内容区 -->
  <el-container>
    <!-- 侧边栏区 -->
    <el-aside width="200px" class="home-aside">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        :unique-opened="true">
        <!--
          :router="true" 开启路由 index的值 就是路由的值
          :unique-opened="true" 是否只保持一个子菜单的展开
         -->
        <!-- 用户管理 -->
        <el-submenu :index="level1.order + ''"
          v-for="level1 in powersList"
          :key="level1.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{level1.authName}}</span>
          </template>

            <el-menu-item
              :index=" '/'+level2.path"
              v-for="level2 in level1.children"
              :key="level2.id">
               <i class="el-icon-setting"></i>
              <span slot="title">{{level2.authName}}</span>
            </el-menu-item>

        </el-submenu>

    </el-menu>
    </el-aside>
    <!-- 主内容区 -->
    <el-main class="home-main">
      <!-- 子路由出口 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      powersList: []
    }
  },
  created () {
    this.getLeftPowers()
  },
  methods: {
    // 登录退出
    logout () {
      this.$confirm('您确定要退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        this.$router.push('./login')
        localStorage.removeItem('token')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 获取左侧权限
    async getLeftPowers () {
      const res = await this.$http.get('menus')
      // console.log(res)
      // console.log(this.$route.path)

      if (res.data.meta.status === 200) {
        this.powersList = res.data.data
      }
    }

  }
}
</script>

<style>
.home-container{
   background-color: #eaeef1;
   height:100%;
}

  .home-header{
      background-color: #b3c1cd;
      padding-left:0 ;
  }
  .home-header img{
    width: 200px;
  }
  .home-header h1{
    margin:0;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    color:#fff;
  }
  .home-header div{
    font-weight: 700;
     min-width: 235px;
  }
  .home-header .welcome{
    text-align:right

  }

  .home-aside{
    background-color: #545c64;
  }

</style>
