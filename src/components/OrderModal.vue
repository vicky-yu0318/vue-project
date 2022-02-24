<template>
  <section class="section section-orderModal" :class="{active:isModal}">
    <div class="container">
      <div class="orderModal">
        <div class="modal-header">
          <div class="modal-title">訂單資料</div>
          <div class="fas fa-times" id="btn-closeModal" @click="isModal= false"></div>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody  v-if="tempOrder.user">
                  <tr>
                    <th>姓名</th>
                    <td> {{ tempOrder.id}}</td>
                  </tr>

                  <tr>
                    <th>email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>

                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>

                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th>訂單編號</th>
                    <td> {{ tempOrder.id }} </td>
                  </tr>

                  <tr>
                    <th>下單時間</th>
                    <td> {{ $filters.date(tempOrder.create_at) }} </td>
                  </tr>

                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid">已付款</strong>
                      <span v-else>尚未付款</span>
                    </td>
                  </tr>

                  <tr>
                    <th>總金額</th>
                    <td>${{ tempOrder.total }} </td>
                  </tr>
                </tbody>
              </table>

              <div class="input-field">
                <input type="checkbox" id="is_paid" v-model="tempOrder.is_paid"/>
                <label for="is_paid">
                  <span v-if="tempOrder.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn" @click="closeModal">取消</button>
          <button type="button" class="btn" @click="$emit('emit-order', tempOrder)">修改付款狀態</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      isModal: false,
      tempOrder: {}
    }
  },
  props: ['orders'],
  methods: {
    openModal () {
      this.isModal = true
    },
    closeModal () {
      this.isModal = false
    }
  },
  watch: {
    orders () {
      this.tempOrder = this.orders
    }
  }
}
</script>
