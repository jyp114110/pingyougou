export default {
  data () {
    return {
      cateList: [],
      loading: false,
      total: 0,
      pagenum: 0,
      pagesize: 0
    }
  },
  created () {
    this.getCateList()
    this.loading = true
  },
  methods: {
    async getCateList (curPage = 1) {
      const res = await this.$http.get('categories', {
        params: {
          type: 3,
          pagenum: curPage,
          pagesize: 5
        }
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        const {result, pagenum, pagesize, total} = res.data.data
        this.cateList = result
        this.pagenum = pagenum + 1
        this.pagesize = pagesize
        this.total = total
        this.loading = false
      }
    },
    changePage (curPage) {
      // console.log(' changePage', curPage)
      this.getCateList(curPage)
    }
  }
}
