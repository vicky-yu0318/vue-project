<template>
  <section class="section section-couponModal" :class="{ active: isModal }">
    <div class="container">
      <div class="couponModal">
        <div class="modal-header">
          <div class="theme-title">
            <span v-if="isNew">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </div>
          <div
            id="btn-closeModal"
            class="fas fa-times"
            @click="isModal = false"
          ></div>
        </div>

        <form class="modal-body">
          <div class="input-field">
            <label for="title">標題</label>
            <input
              type="text"
              id="title"
              placeholder="請輸入標題"
              v-model="tempCoupon.title"
            />
          </div>

          <div class="input-field">
            <label for="coupon_code">優惠碼</label>
            <input
              type="text"
              id="coupon_code"
              placeholder="請輸入優惠碼"
              v-model="tempCoupon.code"
            />
          </div>

          <div class="input-field">
            <label for="due_date">到期日</label>
            <input type="date" id="due_date" v-model="due_date"/>
          </div>

          <div class="input-field">
            <label for="discount_percent">折扣百分比</label>
            <input
              type="number"
              id="discount_percent"
              placeholder="請輸入折扣百分比"
              v-model.number="tempCoupon.percent"
            />
          </div>

          <div class="input-field">
            <label for="is_enabled">是否啟用</label>
            <input
              type="checkbox"
              name="enabled"
              id="is_enabled"
              :true-value="1"
              :false-value="0"
              v-model.number="tempCoupon.is_enabled"
            />
          </div>

          <div class="btn-group">
            <button type="button" class="btn" @click="isModal = false">
              關閉
            </button>
            <button class="btn" v-if="isNew" @click="$emit('emit-update',tempCoupon)">新增優惠卷</button>
            <button class="btn" v-else @click="$emit('emit-update', tempCoupon)">更新優惠券</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      isModal: false,
      tempCoupon: {},
      due_date: []
    }
  },
  props: ['coupon', 'isNew'],
  watch: {
    coupon () {
      this.tempCoupon = this.coupon
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
        .toISOString().split('T')
      this.due_date = dateAndTime[0]
    },
    due_date () {
      console.log(new Date(this.due_date) / 1000)
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  methods: {
    closeModal () {
      this.isModal = false
    },
    openModal () {
      this.isModal = true
    }
  }
}
</script>
