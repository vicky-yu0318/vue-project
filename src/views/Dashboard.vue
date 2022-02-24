<template>
  <div class="container">
    <nav class="navbar">
        <router-link class="link" to="/admin/products">產品列表</router-link> <br>
        <router-link class="link" to="/admin/coupons">優惠券列表</router-link> <br>
        <router-link class="link" to="/admin/orders">訂單列表</router-link>
    </nav>
    <h1>管理介面</h1>
    <router-view v-if="check"></router-view>
  </div>
</template>

<script>
import emitter from '@/methods/eventBus'
export default {
  data () {
    return {
      check: false
    }
  },
  provide () {
    return {
      emitter
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexLogin\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api)
      .then((res) => {
        if (res.data.success) {
          this.check = true
        } else {
          this.$router.push('/login')
        }
      }).catch((err) => {
        console.log(err)
      })
  }
}
</script>
<style>
@import '../assets/stylesheets/style2.css';
</style>
