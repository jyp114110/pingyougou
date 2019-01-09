<template>
  <div class="login">

    <el-row type="flex" justify="center" align="middle" class="login-row">
      <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6" class="login-col">
        <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
                  label-position="top">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password"
                    >
          <el-input v-model="ruleForm.password"  type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                    @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      </el-col>
   </el-row>

  </div>
</template>

<script>
// 导入 axios
// import axios from 'axios'
export default {
  data () {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'

      },
      rules: {
        username: [
          { require: true, min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { require: true, min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        this.$http
          .post('/login', this.ruleForm)
          .then(res => {
            // console.log(res)

            if (res.data.meta.status === 200) {
              localStorage.setItem('token', res.data.data.token)
              this.$router.push({name: 'home'})
            } else {
              this.$message({
                message: res.data.meta.msg,
                type: 'warning'
              })
            }
          })
      })
    },
    resetForm (formName) {
      // this 指向的是 Vue 实例  vm
      // console.log(this)
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>

.login{
  height: 100%;
  background-color: #2d434c;
}
.login-row{
  height: 100%;
}

.login-col{
  padding: 30px 20px;
  background-color: #fff;
  border-radius: 10px;
  min-width: 380px;
}
</style>
