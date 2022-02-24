<template>
  <Loading :active="isLoading" :z-index="1001"></Loading>
  <section class="section section-coupons">
    <div class="container">
      <CouponModal :coupon="tempCoupon" :isNew="isNew" ref="couponModal"
      @emit-update="updateCoupon"></CouponModal>
      <button type="button" class="btn" @click="openCouponModal(true)">建立優惠券</button>
      <table class="table">
        <caption>
          優惠券列表
        </caption>
        <thead>
          <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th>編輯/刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item">
            <td> {{ item.code }} </td>
            <td> {{ item.percent }} </td>
            <td> {{ $filters.date(item.due_date) }}</td>
            <td>
              <span v-if="item.is_enabled === 1" class="enabled-status">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="button-group">
                <button class="btn" @click="openCouponModal(false, item)"
                :class="{ disabled: loadingItem === item.id}">編輯
                  <span class="fas fa-spinner fa-spin"
                      v-if="loadingItem === item.id">
                  </span>
                </button>
                <button class="btn" @click="deleteCoupon(item)"
                :class="{ disabled: loadingItem === item.id}" >刪除
                  <span class="fas fa-spinner fa-spin"
                      v-if="loadingItem ===  item.id">
                  </span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'

export default {
  data () {
    return {
      coupons: [],
      isNew: '',
      tempCoupon: {
        title: '',
        is_enabled: '',
        percent: '',
        due_date: '',
        code: ''
      },
      loadingItem: '',
      isLoading: false
    }
  },
  components: {
    CouponModal
  },
  mounted () {
    this.getCoupons()
  },
  methods: {
    getCoupons () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.coupons = res.data.coupons
        } else {
          this.$httpMessageState(res, '取得優惠券清單')
        }
        this.isLoading = false
      }).catch((err) => {
        this.$httpMessageState(err, '取得優惠券清單')
      })
    },
    openCouponModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew === true) {
        this.tempCoupon = {
          due_date: Math.floor(new Date().getTime() / 1000)
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.openModal()
    },
    deleteCoupon (item) {
      this.loadingItem = item.id
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
      const status = '刪除coupon券'
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.getCoupons()
          this.$httpMessageState(res, status)
        } else {
          this.$httpMessageState(res, status)
        }
      }).catch((err) => {
        this.$httpMessageState(err, status)
      })
    },
    updateCoupon (tempCoupon) {
      const data = { data: tempCoupon }
      if (this.isNew === true) {
        const status = '新增coupon券'
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
        this.$http.post(api, data).then((res) => {
          if (res.data.success) {
            this.$httpMessageState(res, status)
            this.getCoupons()
          } else {
            this.$httpMessageState(res, status)
          }
        }).catch((err) => {
          this.$httpMessageState(err, status)
        })
      } else if (this.isNew === false) {
        const status = '更改coupon券'
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${tempCoupon.id}`
        this.$http.put(api, data).then((res) => {
          if (res.data.success) {
            this.$httpMessageState(res, status)
            this.getCoupons()
          } else {
            this.$httpMessageState(res, status)
          }
        }).catch((err) => {
          this.$httpMessageState(err, status)
        })
      }
      this.$refs.couponModal.closeModal()
    }
  }
}
</script>
