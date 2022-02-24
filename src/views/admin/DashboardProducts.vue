<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>dashboard-product</title>
    </head>
    <body>
      <ProductModal
        ref="productModal"
        @emit-update="updateProduct"
        :isNew="isNew"
        :product="tempProduct"
      ></ProductModal>
      <section class="section section-products">
        <div class="container">
          <div class="products-list">
            <h2 class="theme-title">產品列表</h2>
            <button class="btn" @click="openModal(true)">建立新產品</button>
            <table class="products-table">
              <tr>
                <th scope="col">名稱</th>
                <th scope="col">原價</th>
                <th scope="col">售價</th>
                <th scope="col">是否啟用</th>
                <th scope="col">查看細節</th>
                <th scope="col">編輯</th>
                <th scope="col">刪除</th>
              </tr>
              <tr v-for="item in products" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.origin_price }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.is_enabled === 1 ? '是' : '否' }}</td>
                <td>
                  <button class="btn" @click="getProduct(item)">
                    查看細節
                  </button>
                </td>
                <td>
                  <button class="btn" @click="openModal(false, item)">
                    編輯
                  </button>
                </td>
                <td>
                  <button class="btn" @click="deleteProduct(item)">刪除</button>
                </td>
              </tr>
            </table>
          </div>
          <div class="product-detail">
            <h2 class="theme-title">單一產品細節</h2>
            <span v-if="!product">請選擇一個商品查看</span>
            <div class="product-block" v-if="product">
              <div class="image">
                <img :src="product.imageUrl" />
              </div>
              <div class="content">
                <h3>{{ product.title }}</h3>
                <span class="category"> {{ product.category }}</span>
                <div class="description">
                  <span>商品描述：</span>
                  <p>{{ product.description }}</p>
                </div>

                <ins>{{ $filters.toCurrency(product.price) }}</ins>
                <del>{{ $filters.toCurrency(product.origin_price) }}</del
                >元/個
              </div>
            </div>
            <div class="subimage-block" v-if="product.imagesUrl">
              <img :src="product.imagesUrl[0]" alt="" />
              <img :src="product.imagesUrl[1]" alt="" />
            </div>
          </div>
        </div>
      </section>
      <Pagination :pages="pagination" @emit-page = "getProducts"></Pagination>
    </body>
  </html>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  components: {
    ProductModal,
    Pagination
  },
  data () {
    return {
      products: [],
      product: '',
      tempProduct: '',
      isNew: '',
      pagination: ''
    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    getProducts (page) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
        } else {
          this.$httpMessageState(res, '匯入產品資料')
        }
      }).catch((err) => {
        this.$httpMessageState(err, '匯入產品資料')
      })
    },
    getProduct (item) {
      this.product = item
    },
    deleteProduct (item) {
      const status = '刪除商品'
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.$httpMessageState(res, status)
          this.getProducts()
        } else {
          this.$httpMessageState(res, status)
        }
      }).catch((err) => {
        this.$httpMessageState(err, status)
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = isNew
      } else {
        this.isNew = false
        this.tempProduct = { ...item }
      }
      this.$refs.productModal.showModal()
    },
    updateProduct (tempProduct) {
      this.tempProduct = tempProduct
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      let status = '新增產品'
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        httpMethod = 'put'
        status = '更新產品'
      }
      const data = { data: this.tempProduct }
      this.$http[httpMethod](api, data)
        .then((res) => {
          if (res.data.success) {
            this.$httpMessageState(res, status)
            this.getProducts()
            this.$refs.productModal.closeModal()
          } else {
            this.$httpMessageState(res, status)
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, status)
        })
    }
  }
}
</script>
