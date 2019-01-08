export default {
  data () {
    return {
      rolesData: [],
      isShowAssignPowersDialog: false,
      // 树形结构
      powersTree: [],
      /*
        : props="defaultProps" 可以修改默认的 label 或 children 属性
        defaultProps: {
        children 属性用来指定使用数据中的哪个属性来作为当前节点的子节点
        children: 'children', // 指定子树为节点对象的某个属性值

      */

      defaultProps: {
        children: 'children',
        label: 'authName'
      },

      curRoleId: -1
    }
  },
  created () {
    this.getRolesData()
    this.getPowersTree()
  },
  methods: {
    // 获取角色数据
    async getRolesData () {
      const res = await this.$http.get('/roles')
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.rolesData = res.data.data
      }
    },
    // 显示分配权利对话框
    showAssignPowersDialog (curRole) {
      // 显示
      this.isShowAssignPowersDialog = true
      this.curRoleId = curRole.id
      const checkedKeys = []
      // 遍历
      curRole.children.forEach(level1 => {
        level1.children.forEach(level2 => {
          level2.children.forEach(level3 => {
            checkedKeys.push(level3.id)
          })
        })
      })

      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(checkedKeys)
      })
    },
    // 获取权利树
    async getPowersTree () {
      const res = await this.$http.get('/rights/tree')
      // console.log(res)

      if (res.data.meta.status === 200) {
        this.powersTree = res.data.data
      }
    },
    // 分配角色的权利
    async assignPowers () {
      console.log('assignPowers')
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      // console.log(checkedKeys, halfCheckedKeys)
      const rids = ([...checkedKeys, ...halfCheckedKeys]).join(',')

      const res = await this.$http.post(
        `/roles/${this.curRoleId}/rights`, {
          rids
        })
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.isShowAssignPowersDialog = false
        // 更新角色数据
        this.getRolesData()
      }
    },

    // 删除角色权利
    async deletePowers (roleId, powersId) {
      // console.log(roleId, powersId)
      const res = await this.$http.delete(`roles/${roleId}/rights/${powersId}`)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg

        })
      } else {
        this.$message({
          type: 'warning',
          message: res.data.meta.msg

        })
      }

      this.getRolesData()
    }
  }
}
