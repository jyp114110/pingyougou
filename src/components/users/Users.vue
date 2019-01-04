<template>
  <div class="users">
   <el-table :data="userList" stripe style="width: 100%">
    <el-table-column prop="username" label="姓名" width="180"></el-table-column>
    <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
  v-model="scope.row.mg_state"  <el-table-column prop="mobile" label="电话" width="180"> </el-table-column>
     <el-table-column label="用户状态">
       <template slot-scope="scope" >
          <el-switch
            v-model="scope.row.mg_state"
            @change="changeUserStatus(scope.row)"
          >
          </el-switch>
            <!-- <span>{{total}}</span> -->
       </template>

      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
         <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
         <el-button type="danger" icon="el-icon-delete" size="mini"  plain></el-button>
          <el-button type="success" size="mini" icon="el-icon-check" plain>

            分配角色
          </el-button>
      </template>

    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination
  background
  layout="prev, pager, next"
  :total="total"
  :page-size="pagesize"
  :current-page ="pagenum"
  @current-change="changePage"
  >
</el-pagination>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
      userList: [],
      total: 0,
      pagesize: 3,
      pagenum: 1

    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList (pagenum = 1) {
      this.$http
        .get('/users', {
          params: {
            query: '',
            pagenum,
            pagesize: 3

          }
        }).then(res => {
          console.log(res)

          if (res.data.meta.status === 200) { // 数据获取成功
            //  设置 userList
            this.userList = res.data.data.users
            // 设置 total
            this.total = res.data.data.total
            // 设置当前页
            this.pagenum = res.data.data.pagenum
          } else {
          // token 实效  调回到登录页
            this.$router.push('/login')
            localStorage.removeItem('token')
          }
        })
    },

    changePage (curPage) {
      // console.log(curPage)
      this.getUserList(curPage)
    },
    changeUserStatus (user) {
      this.$http
        .put(`/users/${user.id}/state/${user.mg_state}`, null)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg,
              duration: 1000
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.meta.msg,
              duration: 1000
            })
          }
        })
    }
  }

}
</script>

<style>

</style>
