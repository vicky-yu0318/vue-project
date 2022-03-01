<template>
  <Progressbar :currentProgress="currentProgress"></Progressbar>
  <section class="section section-order">
    <div class="container">
      <h2 class="title">訂購已完成</h2>
      <div class="row" v-if="order.id">
        <div class="col">
          <table>
            <caption>
              訂購資訊
            </caption>
            <tr>
              <td width="40%">訂單金額:</td>
              <td width="60%">{{ $filters.toCurrency(newOrderPrice) }}</td>
            </tr>
            <tr>
              <td>訂單編號:</td>
              <td>{{ order.id }}</td>
            </tr>
            <tr>
              <td>訂購時間:</td>
              <td>{{ orderTime }}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <td>收件人姓名:</td>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <td>收件人聯絡電話:</td>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <td>收件人地址:</td>
              <td>{{ order.user.address }}</td>
            </tr>
          </table>
        </div>

        <div class="col">
          <table>
            <caption>
              訂單內容
            </caption>
            <template v-for="item in order.products" :key="item">
              <tr>
                <td rowspan="2">
                  <img :src="item.product.imageUrl" alt="" />
                </td>
                <td>{{ item.product.title }}</td>
                <td rowspan="2">
                  小計{{ $filters.toCurrency(Math.round(item.final_total)) }}
                </td>
              </tr>
              <tr>
                <td>數量： {{ item.qty }}</td>
              </tr>
            </template>
            <tr style="text-align: right">
              <td colspan="3" v-if="isShippingFee">運費: $100</td>
            </tr>
          </table>
        </div>
      </div>

      <router-link to="/" class="back-link"> 返回首頁 </router-link>
    </div>
  </section>
</template>

<script>
import Progressbar from '@/components/Progressbar.vue'
import emitter from '@/methods/eventBus'
import goTop from '@/methods/goTop'
import { getDate, getTime } from '@/methods/time'

export default {
  data () {
    return {
      currentProgress: this.$route.name,
      order: {},
      orderProduct: '',
      newOrderPrice: '',
      isShippingFee: false,
      orderTime: ''
    }
  },
  components: {
    Progressbar
  },
  methods: {
    completepay () {
      const status = '付款'
      const id = this.$route.params.id
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${id}`
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          this.$httpMessageState(res, status)
          this.getOrder()
          setTimeout(() => {
            this.$router.push('/')
          }, 15000)
        } else {
          this.$httpMessageState(res, status)
        }
      }).catch((err) => {
        this.$httpMessageState(err, status)
      })
    },
    getOrder () {
      const id = this.$route.params.id
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.order = res.data.order
          this.orderTime = this.order.create_at
          this.orderTime = `${getDate(this.orderTime * 1000)} ${getTime(
            this.orderTime * 1000
          )}`
          const obj = this.order.products
          for (const item in obj) {
            // (1) 如果沒有使用庫碰券
            if (!obj[item].coupon) {
              // 裡面再區分是否要運費
              if (this.order.total >= 850) {
                this.newOrderPrice = this.order.total
              } else {
                this.newOrderPrice = this.order.total + 100
                this.isShippingFee = true
              }
              // (2) 如有用庫碰券
            } else {
              const percent = obj[item].coupon.percent
              // 裡面再區分是否要運費
              if (this.order.total / (percent * 0.01) >= 850) {
                this.newOrderPrice = this.order.total
              } else {
                this.newOrderPrice = this.order.total + 100
                this.isShippingFee = true
              }
            }
          }
        }
      })
    }
  },
  mounted () {
    goTop()
    this.completepay()
    emitter.emit('update-cart')
  }
}
</script>
