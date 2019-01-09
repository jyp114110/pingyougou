// 导入富文本编辑器组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      Stepsactive: 1,
      tabActive: 'info',
      // 商品分类
      categoryList: [],
      // 基本信息数据
      infoForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_introduce: '',
        radio: false,
        pics: [],
        goods_cat: []
      },
      headers: {
        Authorization: localStorage.getItem('token')
      }

    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    async getCateList () {
      const res = await this.$http.get('/categories', {
        params: {
          type: 3
        }
      })
      if (res.data.meta.status === 200) {
        this.categoryList = res.data.data
      }
    },
    tabChange (curTab) {
      // console.log(curTab.index)
      this.Stepsactive = curTab.index - 0 + 1
    },

    nextSteps (steps, curTab) {
      this.Stepsactive = steps + 1
      this.tabActive = curTab
    },

    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    uploadSuccess (response, file, fileList) {
      this.infoForm.pics.push({pic: response.data.tmp_path})
    },
    async addGoods () {
      /* eslint-disable  */
      const { goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics } = this.infoForm

      // console.log(goods_name)

      const res = await this.$http.post('/goods', {
          goods_name,
          goods_cat:goods_cat.join(','),
          goods_price,
          goods_number,
          goods_weight,
          goods_introduce,
          pics

      })

      // 提示成功
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
      // 跳转到商品列表页面
      this.$router.push('/goods')

    }

  }
}


