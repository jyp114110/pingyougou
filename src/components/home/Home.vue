<template>
  <el-container class="home-container">
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
  <el-container>
    <el-aside width="200px" class="home-aside">
      <el-menu
        default-active="4"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>

            <el-menu-item index="/users">
               <i class="el-icon-setting"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>

        </el-submenu>

    </el-menu>
    </el-aside>
    <el-main class="home-main">
      <!-- 子路由出口 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  methods: {
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
