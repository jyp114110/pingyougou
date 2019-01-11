<template>
  <div class="404">
    <h1>您访问的页面不存在</h1>
    <p>
      将在{{time}}后，跳转到首页
      <router-link to="/home"></router-link>
    </p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      time: 5,
      timerId: null
    }
  },
  created () {
    clearInterval(this.timerId)
    this.timerId = setInterval(() => {
      this.time--
      if (this.time <= 0) {
        this.$router.push('/home')
        clearInterval(this.timerId)
      }
    }, 1000)
  }

}
</script>
<style></style>
