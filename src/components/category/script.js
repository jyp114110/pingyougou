export default {
  data () {
    return {
      cateList: [],
      loading: false,
      total: 0,
      pagenum: 0,
      pagesize: 0,

      // 添加分类对话框
      isShowAddCateDialog: false,
      addCateForm: {
        // cat_pid 分类父 ID不能为空
        // cat_name 分类名称不能为空
        // cat_level分类层级不能为空
        cat_name: '',
        cat_pid_Arr: []

      },
      cateListData: []
    }
  },
  created () {
    this.getCateList()
    this.loading = true
    this.getCateListData()
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
      // console.log(res)
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
    },

    // 显示添加分类对话框
    showAddCateDialog () {
      this.isShowAddCateDialog = true
    },

    // 获取商品分类 二级
    async getCateListData () {
      const res = await this.$http.get('/categories', {
        params: {
          type: 2
        }
      })
      // console.log(res)
      this.cateListData = res.data.data
    },
    // 添加分类
    // 取消 eslint 校验
    /* eslint-disable camelcase */
    async addCate () {
      // console.log('addCate')
      const { cat_name, cat_pid_Arr } = this.addCateForm
      const cat_pid = cat_pid_Arr[cat_pid_Arr.length - 1]
      const cat_level = cat_pid_Arr.length
      const res = await this.$http.post('/categories', {
        cat_name,
        cat_level,
        cat_pid
      })

      // console.log(res)
      if (res.data.meta.status === 201) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        this.isShowAddCateDialog = false
        this.getCateList()
        console.log(this.$refs.form1)

        this.$refs.form1.resetFields()
      }
    }
  }
}
