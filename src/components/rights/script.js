export default {
  data () {
    return {
      powersList: []
    }
  },
  created () {
    this.getPowersList()
  },
  methods: {
    // 获取权限列表
    async getPowersList () {
      const res = await this.$http.get('/rights/list')
      console.log(res)
      if (res.data.meta.status === 200) {
        this.powersList = res.data.data
      }
    }
  }
}
