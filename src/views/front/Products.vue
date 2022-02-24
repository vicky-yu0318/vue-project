<template>
  <section class="section section-products" id="section-products">
    <div class="container">
      <div class="select-button-group">
        <button class="btn-main btn-select" @click="selectCategory = ''"
        :class="{ active: selectCategory==='' }">全部</button>
        <button class="btn-main btn-select" v-for="category in categories" :key="category"
        :class = "{ active: selectCategory === category}"
         @click="selectCategory = category">
          {{ category }}
        </button>
      </div>
      <div class="item-group">
        <div class="item" v-for="item in filterProducts" :key="item.id"
          data-aos="fade-up" data-aos-duration="2000">
          <span class="discount-label">sale</span>

          <div class="image">
            <img :src="item.imageUrl"/>
            <div class="icons">
              <div
                class="fas fa-shopping-cart"
                @click.prevent="addToCart(item)"
              ></div>
              <router-link
                :to="`/product/${item.id}`"
                class="fas fa-eye"
              ></router-link>
            </div>
          </div>

          <div class="content">
            <div class="flex">
              <div class="price"> {{ $filters.toCurrency(item.price) }} </div>
              <i class="fas fa-heart"
              :class="{ active: myFavorite.includes(item.id) }"
              @click="addMyFavorite(item.id)">
              </i>
            </div>
            <h3>{{ item.title }} </h3>
            <div class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
              <span>(50)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Pagination :pages="pagination" @emit-page="getProducts" v-if="pagination"></Pagination>
</template>

<script>
import emitter from '@/methods/eventBus'
import Pagination from '@/components/Pagination.vue'
import goTop from '@/methods/goTop'
import localStorage from '@/mixins/localStorage'

export default {
  data () {
    return {
      products: [],
      categories: '',
      selectCategory: '',
      pagination: '',
      myFavorite: this.get() || []
    }
  },
  mixins: [localStorage],
  mounted () {
    this.getProducts()
    emitter.on('update-favorite', () => {
      this.myFavorite = this.get() || []
    })
  },
  components: {
    Pagination
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
            this.pagination = res.data.pagination
            goTop()
            this.getCategories()
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, '接收產品資訊')
        })
    },
    getCategories () {
      const categories = new Set()
      this.products.forEach((item) => {
        categories.add(item.category)
      })
      this.categories = [...categories]
    },
    addToCart (item) {
      const status = '加入購物車'
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: item.id,
        qty: 1
      }
      this.$http
        .post(api, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.$httpMessageState(res, status)
            emitter.emit('update-cart')
          } else {
            this.$httpMessageState(res, status)
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, status)
        })
    }
  },
  computed: {
    filterProducts () {
      return this.products.filter((item) => {
        return item.category.match(this.selectCategory)
      })
    }
  }
}
</script>
