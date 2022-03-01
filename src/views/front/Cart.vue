<template>
  <Loading :active="isLoading"></Loading>
  <Progressbar :currentProgress="currentProgress"></Progressbar>
  <section class="section section-cart" id="section-cart" v-if="cart.total > 0">
    <div class="container">
      <button
        type="button"
        class="btn-main"
        id="btnDeleteCart"
        @click="deleteAllCart"
      >
        刪除購物車內容
      </button>
      <table class="cart-table">
        <caption v-if="cart.carts">
          購物車(
          <span class="quantity">{{ cart.carts.length }}項商品</span>)
        </caption>
        <thead>
          <tr>
            <th width="15%" scope="col" style="text-align: left"></th>
            <th width="15%" scope="col" style="text-align: left">商品名稱</th>
            <th width="20%" scope="col">單價</th>
            <th width="10%" scope="col">數量</th>
            <th width="20%" scope="col" style="text-align: right">小計</th>
            <th width="5%" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item">
            <td>
              <router-link :to="`/product/${item.product.id}`">
                <img :src="item.product.imageUrl" />
              </router-link>
            </td>
            <td style="text-align: left">{{ item.product.title }}</td>
            <td>{{ $filters.toCurrency(item.product.price) }}</td>
            <td>
              <div class="input-field">
                <input
                  type="number"
                  min="1"
                  max="99"
                  v-model="item.qty"
                  @blur="updateCart(item)"
                />
              </div>
            </td>
            <td style="text-align: right">
              {{ $filters.toCurrency(item.total) }}
            </td>
            <td>
              <i class="fas fa-times" @click="deleteCart(item)"></i>
            </td>
          </tr>
        </tbody>
      </table>

        <div class="discount-banner">
          <div class="content">
            <div class="txt">
              <h3>春季限時回饋</h3>
              <p>輸入折扣碼「30discount」可享7折限量優惠</p>
              <p>購茶滿$850即可享免運</p>
              <router-link to="/products" class="btn-main">繼續選購</router-link>
            </div>
          </div>
        </div>
        <table class="sum-table">
          <caption>
            訂單資訊
          </caption>
          <tbody>
            <tr>
              <th scope="row" width="60%">小計</th>
              <td  width="40%">{{ $filters.toCurrency(Number(cart.total)) }}</td>
            </tr>
            <tr>
              <th scope="row">運費</th>
              <td>{{  $filters.toCurrency(shippingFee) }}</td>
            </tr>
            <tr v-if="cart.total >= threshold">
              <th scope="row" class="freeShipping">符合免運門檻</th>
              <td class="discount">-{{ shippingFee }}</td>
            </tr>
            <template v-else>
              <tr>
                <th scope="row" class="freeShipping">尚未符合免運門檻</th>
              </tr>
              <tr>
                <th colspan="2">
                  <router-link to="/products" class="goProductsLink"
                    >再買 {{ $filters.toCurrency(threshold - cart.total) }} 即享有免運</router-link
                  >
                </th>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">總金額</th>
              <!-- 沒用券 -->
              <template v-if="!isUseCoupon">
                <td v-if="cart.total >= threshold">{{ $filters.toCurrency(Number(cart.total))  }}</td>
                <td v-else>{{ $filters.toCurrency(Number(cart.total + 100))  }}</td>
              </template>
              <!-- 有用券 -->
              <template v-else>
                <td v-if="cart.total >= threshold">
                  <del>{{ $filters.toCurrency(Number(cart.total ))  }}</del>
                  <ins>{{ $filters.toCurrency(Number(cart.final_total ))  }}</ins>
                </td>
                <td v-else>
                  <del>{{ $filters.toCurrency(Number(cart.total + 100))  }}</del>
                  <ins>{{ $filters.toCurrency(Number(cart.final_total + 100))  }}</ins>
                </td>
              </template>
            </tr>
            <tr>
              <td colspan="2">
                <div class="input-box" v-if="!isUseCoupon">
                  <input type="text"
                  v-model="couponCode"/>
                  <button type="button" @click="useCoupon">套用優惠碼</button>
                </div>
                <div class="input-box" v-else>
                  <input type="text"
                  value="30discount"
                  disabled
                  placeholder="已套用優惠碼">
                  <button type="button" style="pointer-events:none">套用優惠碼</button>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <router-link to="/payment" class="btn-main"
                  >前往結帳</router-link
                >
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
  </section>
  <section class="section section-cart" id="section-cart" v-else>
    <div class="container">
      <div class="content empty-cart">
        <p>您目前還沒添加產至購物車</p>
        <router-link to="/products" class="btn-main">前往選購</router-link>
      </div>
    </div>
  </section>
</template>
<script>
import Progressbar from '@/components/Progressbar.vue'
import emitter from '@/methods/eventBus'
import goTop from '@/methods/goTop'

export default {
  data () {
    return {
      isLoading: false,
      cart: [],
      currentProgress: this.$route.name,
      couponCode: '30discount',
      isUseCoupon: false,
      shippingFee: 100,
      threshold: 850
    }
  },
  components: {
    Progressbar
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.cart = res.data.data
        }
      }).catch((err) => {
        this.$httpMessageState(err, '取購物車內容')
      })
    },
    deleteCart (item) {
      this.isLoading = true
      const status = '商品刪除'
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.getCart()
          emitter.emit('update-cart')
          this.$httpMessageState(res, status)
        } else {
          this.$httpMessageState(res, status)
        }
        this.isLoading = false
      }).catch((err) => {
        this.$httpMessageState(err, status)
      })
    },
    deleteAllCart (item) {
      this.isLoading = true
      const status = '全部商品刪除'
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.getCart()
          emitter.emit('update-cart')
          this.$httpMessageState(res, status)
        } else {
          this.$httpMessageState(res, status)
        }
        this.isLoading = false
      }).catch((err) => {
        this.$httpMessageState(err, status)
      })
    },
    updateCart (item) {
      let status = ''
      if (item.qty < 1) {
        status = '購買數量不得小於0'
        this.$httpSideMessageState(status, false)
        this.getCart()
        return
      }
      status = '更新購物車'
      const data = {
        data: {
          product_id: item.product.id,
          qty: item.qty
        }
      }
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http.put(api, data).then((res) => {
        if (res.data.success) {
          this.getCart()
          this.$httpMessageState(res, status)
        } else {
          this.$httpMessageState(res, status)
        }
      }).catch((err) => {
        this.$httpMessageState(err, status)
      })
    },
    useCoupon () {
      const status = '使用優惠券'
      const data = {
        data: {
          code: this.couponCode
        }
      }
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      this.$http.post(api, data).then((res) => {
        if (res.data.success) {
          this.$httpMessageState(res, status)
          this.getCart()
          this.isUseCoupon = true
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
    this.isUseCoupon = false
    this.getCart()
    emitter.on('update-cart', () => {
      this.isJump = true
      this.getCart()
    })
  }
}
</script>
