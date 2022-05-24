<template>
  <section class="section section-login">
    <div class="container">
      <h1>登入頁面</h1>
      <div class="form-input">
        <label for="">帳號</label>
        <input type="text" id="username" v-model="user.username">
      </div>
      <div class="form-input">
        <label for="">密碼</label>
        <input type="password" id="password" v-model="user.password">
      </div>
      <input type="submit" @click.prevent="login">
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            this.$httpMessageState(res, '登入')
            const { token, expired } = res.data
            document.cookie = `hexLogin=${token}; expires=${new Date(expired)}`
            this.$router.push('/admin/products')
          } else {
            this.$httpMessageState(res, '登入')
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, '登入')
        })
    }
  }
}
</script>
<style>
  .section-login {
    min-height: calc(100vh - 430px);
  }
  .section-login .form-input input {
    width: 200px;
    margin-left: 5px;
  }
</style>
