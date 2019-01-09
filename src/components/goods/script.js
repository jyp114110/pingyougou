export default {
  data () {
    return {
      goodsList: [],
      pagenum: 1,
      total: 0,
      pagesize: 5

    }
  },
  created () {
    this.getGoodsList()
  },

  methods: {
    async getGoodsList (pagenum = 1) {
      const res = await this.$http.get('/goods', {
        params: {
          query: '',
          pagenum,
          pagesize: 5
        }
      })
      // console.log(res)

      if (res.data.meta.status === 200) {
        const {goods, total, pagenum} = res.data.data
        this.goodsList = goods
        this.pagenum = pagenum - 0
        this.total = total
      }
    },
    changePage (curPage) {
      // console.log(curPage)
      this.pagenum = curPage
      // 页面刷新
      this.getGoodsList(curPage)
      // 路由跳转
      this.$router.push(`/goods/${curPage}`)
    }
  }
}
