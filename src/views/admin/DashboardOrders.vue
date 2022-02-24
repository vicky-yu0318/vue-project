<template>
  <section class="section section-order">
    <div class="container">
      <button type="button" class="btn" @click="deleteAllOrder">刪除全部訂單</button>
      <table>
        <caption class="theme-title">
          訂單資料
        </caption>
        <tr>
          <th scope="col">訂單號碼</th>
          <th scope="col">購買人email</th>
          <th scope="col">購買時間</th>
          <th scope="col" width="20%">購買商品內容</th>
          <th scope="col">應收金額</th>
          <th scope="col">訂單收款狀態</th>
          <th scope="col">編輯/刪除</th>
        </tr>
        <tr v-for= "item in orders" :key="item.id">
          <td> {{ item.id }} </td>
          <td v-if="item.user"> {{ item.user.email }} </td>
          <td> {{ $filters.date(item.create_at) }} </td>
          <td  style="text-align:left" >
            <template v-for="pro in item.products" :key="pro">
              <div>
                {{ pro.product.title }}=>
                {{ pro.qty }}*{{ pro.product.price }}
                <span v-if="pro.coupon">*{{pro.coupon.percent/100}} </span>
                = {{ pro.final_total }}
              </div>
            </template>
            <div v-if="item.total < 850">運費=> $100</div>
          </td>
          <td>
            <span v-if="item.total < 850">${{ item.total+ 100}}</span>
            <span v-else>${{ item.total }}</span>
          </td>
          <td> {{ item.is_paid ? '是' : '否' }}</td>
          <td>
            <button type="button" class="btn" @click="openModal(item)">編輯</button>
            <button type="button" class="btn" @click="deleteOrder(item)">刪除</button>
          </td>
        </tr>
      </table>
    </div>
  </section>
  <Pagination :pages="pagination" @emit-page="getOrders"></Pagination>
  <OrderModal ref="orderModal" :orders="tempOrder" @emit-order="updateOrder"></OrderModal>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import OrderModal from '@/components/OrderModal.vue'

export default {
  data () {
    return {
      orders: [],
      pagination: '',
      tempOrder: {}
    }
  },
  components: {
    Pagination,
    OrderModal
  },
  mounted () {
    this.getOrders()
  },
  methods: {
    getOrders (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        } else {
          this.$httpMessageState(res, '接收訂單清單')
        }
      }).catch((err) => {
        this.$httpMessageState(err, '接收訂單清單')
      })
    },
    openModal (item) {
      this.$refs.orderModal.openModal()
      this.tempOrder = { ...item }
    },
    updateOrder (item) {
      const paid = {
        is_paid: item.is_paid
      }
      const status = '更新訂單內容'
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      this.$http.put(api, { data: paid }).then((res) => {
        if (res.data.success) {
          this.$httpMessageState(res, status)
          this.getOrders()
          this.$refs.orderModal.closeModal()
        } else {
          this.$httpMessageState(res, status)
        }
      }).catch((err) => {
        this.$httpMessageState(err, status)
      })
    },
    deleteOrder (item) {
      const status = '刪除訂單'
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.$httpMessageState(res, status)
          this.getOrders()
        } else {
          this.$httpMessageState(res, status)
        }
      }).catch((err) => {
        this.$httpMessageState(err, status)
      })
    },
    deleteAllOrder () {
      const status = '刪除全部訂單'
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/all`
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.$httpMessageState(res, status)
          this.getOrders()
        } else {
          this.$httpMessageState(res, status)
        }
      }).catch((err) => {
        this.$httpMessageState(err, status)
      })
    }
  }
}
</script>
