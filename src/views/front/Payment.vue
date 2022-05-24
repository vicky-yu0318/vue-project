<template>
  <Progressbar  :currentProgress="currentProgress"></Progressbar>
  <section class="section section-payment">
    <div class="container">
      <Form action="" class="form-payment" v-slot=" { errors }" @submit="createOrder">
        <div class="row">
          <div class="col">
            <h3 class="title">收件人聯絡資訊</h3>
            <div class="input-field">
              <span>收件人姓名</span>
              <Field type="text" placeholder="收件人姓名" class="input-box"
              name="姓名" v-model="user.name" rules="required"></Field>
              <ErrorMessage name="姓名"
              :class="{ invalid: errors['姓名'] }"></ErrorMessage>
            </div>
            <div class="input-field">
              <span>電子信箱</span>
              <Field
                type="email"
                placeholder="example.gmail.com"
                class="input-box"
                name="電子信箱" v-model="user.email" rules="email|required"
              ></Field>
               <ErrorMessage name="電子信箱"
               :class="{ invalid: errors['電子信箱'] }"></ErrorMessage>
            </div>
            <div class="input-field">
              <span>收件人電話</span>
              <Field type="tel" placeholder="0988888888"
              name="電話" v-model="user.tel" rules="required|min:8|max:10"></Field>
               <ErrorMessage name="電話"
               :class="{ invalid: errors['電話']}"></ErrorMessage>
            </div>
            <div class="input-field">
              <span>收件人地址</span>
              <Field type="text" placeholder="收件人地址"
              name="地址" v-model="user.address" rules="required"></Field>
               <ErrorMessage name="地址"
               :class="{ invalid: errors['地址'] }"></ErrorMessage>
            </div>
          </div>
          <div class="col">
            <h3 class="title">信用卡付款資料</h3>
            <div class="input-field">
              <span>信用卡付款</span>
              <img src="@/assets/images/credit.png" alt="" />
            </div>
            <div class="input-field">
              <span>信用卡號碼</span>
              <Field type="number" placeholder="1111-2222-3333-4444"
              name="信用卡號碼" v-model="user.creditNum" rules="required|min:16|max:16"></Field>
               <ErrorMessage name="信用卡號碼"
               :class="{ invalid: errors['信用卡號碼'] }"></ErrorMessage>
            </div>

            <div class="input-field">
              <span>到期月</span>
              <Field type="number" placeholder="02"
              name="到期月" v-model="user.creditMonth"
               rules="required|between:1,12|min:2"
              ></Field>
               <ErrorMessage name="到期月"
               :class="{ invalid: errors['到期月'] }"></ErrorMessage>
            </div>
            <div class="flex">
              <div class="input-field">
                <span>到期年</span>
                <Field type="number" placeholder="2022"
                name="到期年" rules="required|min:4|max:4"></Field>
               <ErrorMessage name="到期年"
               :class="{ invalid: errors['到期年'] }"></ErrorMessage>
               </div>
              <div class="input-field">
                <span>驗證碼</span>
                <Field type="number" placeholder="123"
                name="驗證碼" rules="required|min:3|max:3"></Field>
                 <ErrorMessage name="驗證碼"
                 :class="{ invalid: errors['驗證碼'] }"></ErrorMessage>
              </div>
            </div>
          </div>
        </div>
        <input type="submit" class="btn-main" value="提交訂單"
         />
      </Form>
      <router-link to="/cart" class="back-link"> 返回購物車 </router-link>
    </div>
  </section>
</template>

<script>
import Progressbar from '@/components/Progressbar.vue'
import goTop from '@/methods/goTop'

export default {
  data () {
    return {
      user: {},
      currentProgress: this.$route.name
    }
  },
  components: {
    Progressbar
  },
  methods: {
    createOrder () {
      const status = '提交訂單'
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const data = {
        data: {
          user: this.user
        }
      }
      this.$http.post(api, data).then((res) => {
        if (res.data.success) {
          this.$httpMessageState(res, status)
          this.$router.push(`/order/${res.data.orderId}`)
        } else {
          this.$httpMessageState(res, status)
        }
      }).catch((err) => {
        this.$httpMessageState(err, status)
      })
    }
  },
  mounted () {
    goTop()
  }
}
</script>

<style>
.invalid {
  color: red;
  font-weight: 600;
}
</style>
