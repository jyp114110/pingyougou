export default {
  data () {
    return {
      // 用户列表
      userList: [],
      total: 0,
      pagesize: 3,
      pagenum: 1,

      // 搜索内容
      searchText: '',
      // 添加用户
      isShowAddUserDialog: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserRules: {
        username: [
          { required: true,
            message: '长度在 3 到 6 个字符',
            min: 3,
            max: 6,
            trigger: 'blur' }

        ],
        password: [
          {
            required: true,
            message: '长度在 6 到 12 个字符',
            min: 6,
            max: 12,
            trigger: 'blur'
          }

        ],
        email: [
          {
            pattern: /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            message: '请输入正确的邮箱格式',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }
        ]

      },

      // 编辑用户
      isShowEditUserDialog: false,
      editUserForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      editUserRules: {
        email: [
          {
            pattern: /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            message: '请输入正确的邮箱格式',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }
        ]

      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList (pagenum = 1, query = '') {
      this.$http
        .get('/users', {
          params: {
            query,
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
      this.getUserList(curPage, this.searchText)
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
    },
    searchUser () {
      // console.log('searchUser', this.searchText)
      this.getUserList(1, this.searchText)
    },
    // 添加用户
    showAddUserDialog () {
      this.isShowAddUserDialog = true
    },
    async addUser () {
      await this.$refs.addUserFormRef.validate()
      const res = await this.$http.post('/users', this.addUserForm)
      if (res.data.meta.status === 201) {
        this.isShowAddUserDialog = false
        this.$message({
          type: 'success',
          message: res.data.meta.msg

        })
        this.getUserList(1, this.searchText)
      }
    },
    closeAddUserDialog () {
      this.$refs.addUserFormRef.resetFields()
    },

    async deleteUserById (id) {
      // console.log(id)
      try {
        await this.$confirm('您确定要删除此用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await this.$http.delete(`/users/${id}`)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          this.getUserList()
        } else {
          this.$message({
            type: 'warning',
            message: res.data.meta.msg
          })
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },

    // 编辑用户
    async showUserEditDialog (id) {
      this.isShowEditUserDialog = true
      // console.log(id)
      const res = await this.$http(`/users/${id}`)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.editUserForm.username = res.data.data.username
        this.editUserForm.mobile = res.data.data.mobile
        this.editUserForm.email = res.data.data.email
        this.editUserForm.id = res.data.data.id
      } else {
        this.$message({
          type: 'error',
          message: res.data.meta.msg
        })
      }
    },
    async editUser () {
      const id = this.editUserForm.id
      const email = this.editUserForm.email
      const mobile = this.editUserForm.mobile
      // console.log('editUser')
      await this.$refs.editUserFormRef.validate()
      const res = await this.$http.put(`/users/${id}`, {
        email,
        mobile

      })
      this.isShowEditUserDialog = false
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        this.getUserList()
      } else {
        this.$message({
          type: 'error',
          message: res.data.meta.msg
        })
      }
    },
    closeEditUserDialog () {
      this.$refs.editUserFormRef.resetFields()
    }
  }

}
// 13820350551
// 1@qq.com
