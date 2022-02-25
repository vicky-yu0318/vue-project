<template>
  <Loading :active="isLoading"></Loading>
  <section class="section section-singleProduct" id="section-singleProduct">
    <div class="container">
      <div class="image">
        <div class="main-pic"
            :style="{ background: `url(${selectImageUrl})` }">
        </div>
        <div class="small-pic-wrap">
          <div
            class="small-pic"
            :style="{ background: `url(${product.imageUrl})` }"
            @mouseover="selectImageUrl = product.imageUrl"
            @click="selectImageUrl = product.imageUrl"
          ></div>
          <div
            v-for = "(img, i) in product.imagesUrl" :key="i"
            class="small-pic"
            :style="{ background: `url(${img})` }"
            @mouseover="selectImageUrl = img"
            @click="selectImageUrl = img"
          ></div>
        </div>
        <div class="link-group" >
          <a class="btn-more" @click.prevent="changeProduct(pre.id)">
            <i class="fas fa-angle-double-left"></i>
            {{ pre.title }}
          </a>
          <a  class="btn-more" @click.prevent="changeProduct(next.id)">
            <i class="fas fa-angle-double-left"></i>
            {{ next.title }}
          </a>
        </div>
      </div>

      <div class="content">
        <p class="route">
          <router-link to="/products">全部</router-link> /
          <router-link to="/products"> <span> {{ product.category }} </span> </router-link>
        </p>
        <h2>{{ product.title }}</h2>
        <span class="price"> {{ $filters.toCurrency(Number(product.price)) }}</span>
        <div class="buyqua">
          <input type="number" min="1" max="99" v-model="qty"/>
          <button class="btn-main" @click="addToCart(product, qty)">
            加入購物車
          </button>
        </div>

        <div class="description-title">產品內容</div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
          repellat assumenda architecto? Eius accusantium eaque velit nisi autem
          harum repellendus a. Et impedit ipsum magnam optio minus modi, ullam
          recusandae?
        </p>
      </div>
    </div>
  </section>

  <section class="section section-notice" id="section-notice">
    <div class="container">
      <div class="content">
        <h3>注意事項</h3>
        <ul class="notice-list">
          <li>
            <i class="fab fa-envira"></i>Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Mollitia, minus fuga dolor aut modi nisi
            necessitatibus eligendi aspernatur eveniet dicta!
          </li>
          <li>
            <i class="fab fa-envira"></i>orem ipsum dolor sit amet consectetur
            adipisicing elit. Mollitia, min
          </li>
          <li>
            <i class="fab fa-envira"></i>ojrem ipsum dolor sit amet consectetur
            adipisicing elit. Mollitia, min
          </li>
        </ul>
      </div>
      <div class="image">
        <img src="https://upload.cc/i1/2022/02/08/DEixKT.jpg" alt="" />
      </div>
    </div>
  </section>

  <section class="section section-recommend" id="section-recommend">
    <div class="container">
      <div class="content">
        <h3>經典茶款7折起</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit,
          obcaecati?
        </p>
        <router-link to="/products" class="btn-main">更多產品</router-link>
      </div>

      <div class="recommend-slider-wrap">
        <h3 class="title">你可能會喜歡...</h3>
        <Swiper
          class="recommend-slider swiper"
          :breakpoints="swiperOptions.breakpoints"
          :autoplay="{ autoplay: true,
                       disableOnInteraction: false,
                       pauseOnMouseEnter: false
                      }"
          :navigation="{ nextEl: '.nextArrow', prevEl: '.prevArrow' }"
          loop
        >
          <div class="slider-navigation">
            <div class="nav-indicator prevArrow">
              <i class="fas fa-angle-left"></i>
            </div>
            <div class="nav-indicator nextArrow">
              <i class="fas fa-angle-right"></i>
            </div>
          </div>

          <!-- 以下放隨機 同分類商品5樣 -->
          <SwiperSlide
            data-swiper-autoplay="2500"
            class="item swiper-slide"
            v-for="item in randomProducts"
            :key="item.id"
          >
            <div class="image" v-if="item.imageUrl">
              <img :src="item.imageUrl" />
            </div>
            <div class="icons">
              <a class="fas fa-search" @click.prevent="changeProduct(item.id)"></a>
              <a @click="addMyFavorite(item.id)" class="fas fa-heart"
                :class="{ active: myFavorite.includes(item.id)}"></a>
              <a @click="addToCart(item)" class="fas fa-shopping-cart"></a>
            </div>
          </SwiperSlide>
          <img src="https://upload.cc/i1/2022/02/21/cEFly5.png" class="stand" />
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from '@/methods/eventBus'
import goTop from '@/methods/goTop'
import localStorage from '@/mixins/localStorage'

// swiper core
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
// swiper vue
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
// swiper css
import 'swiper/swiper-bundle.css'
SwiperCore.use([Navigation, Pagination, Autoplay])

// 取隨機數(會包含0)
function getRandomInt (max) {
  return Math.floor(Math.random() * max)
}

export default {
  data () {
    return {
      isLoading: false,
      product: {},
      currentProductId: '',
      qty: 1,
      products: [],
      randomProducts: [],
      myFavorite: this.get() || [],
      swiperOptions: {
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 30 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1200: { slidesPerView: 3, spaceBetween: 30 }
        }
      },
      selectImageUrl: '',
      pre: {},
      next: {}
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  mixins: [localStorage],
  methods: {
    getProduct () {
      this.isLoading = true
      const id = this.$route.params.id
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.product = res.data.product
          goTop()
          this.selectImageUrl = this.product.imageUrl
          this.isLoading = false
          this.getProducts()
        }
      }).catch((err) => {
        this.$httpMessageState(err, '取產品')
      })
    },
    getProducts () {
      this.randomProducts = []
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
            // 取同類的"相似產品"
            this.getLookLike()
            this.getSiblingProduct()
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, '取產品')
        })
    },
    // 取同類的"隨機相似產品"(取5個以內)
    getLookLike () {
      const category = this.product.category
      const currentId = this.currentProductId
      // (1) 取此單一產品的分類 & id
      // (2) 找同分類的其他產品(但不要當前產品)
      const filterProducts = this.products.filter((item) => {
        return item.category === category && item.id !== currentId
      })
      // (3) 新增一個最大長度 (取同分類的隨機商品 5個內)
      const maxSize = filterProducts.length < 5 ? filterProducts.length : 5

      // (4) 新增一空陣列，把待會隨機取得重複的品項拿掉
      const arrSet = new Set([])

      // (5) 隨機取得的數字跑回圈，每次會新增一個數字至arrSet, 若重複，arrSet會過濾掉
      for (let index = 0; arrSet.size < maxSize; index++) {
        const num = getRandomInt(filterProducts.length)
        arrSet.add(num)
      }
      this.randomProducts = []
      // (6) 目前arrSet有5個項目，順序隨機抓，放到randomProducts陣列，所以第一個項目是隨機的
      arrSet.forEach((i) => {
        this.randomProducts.push(filterProducts[i])
      })
    },
    addToCart (item, qty = 1) {
      const status = '加入購物車'
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: item.id,
        qty: qty
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
    },
    // 取得前後一筆商品
    getSiblingProduct () {
      this.products.forEach((item, index) => {
        if (item.id === this.currentProductId) {
          this.pre = this.products[index - 1] || this.products[this.products.length - 1]
          this.next = this.products[index + 1] || this.products[0]
        }
      })
    },
    changeProduct (id) {
      this.$router.push(`/product/${id}`)
      this.getProduct()
    }
  },
  watch: {
    $route: {
      handler (val) {
        if (val.name === 'Product') {
          this.currentProductId = this.$route.params.id
          this.getProduct()
          setTimeout(() => {
            this.getProduct()
          }, 1000)
        }
      },
      deep: true
    }
  },
  mounted () {
    this.getProduct()
    this.currentProductId = this.$route.params.id
  }
}
</script>

<style>
.section-singleProduct .main-pic {
  background-repeat: no-repeat !important;
  background-size: cover!important;
  background-repeat: no-repeat!important;
}
.section-singleProduct .small-pic {
  background-repeat: no-repeat !important;
  background-size: cover!important;
  background-repeat: no-repeat!important;
}
.recommend-slider {
  position: relative;
}
.slider-navigation {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: space-between;
  z-index: 5;
}
.slider-navigation .nav-indicator {
  border: 1px solid var(--strong-color);
  height: 50px;
  width: 50px;
  color: var(--strong-color);
  font-size: 30px;
  text-align: center;
  line-height: 50px;
  border-radius: 5px;
  cursor: pointer;
}
.slider-navigation .nav-indicator:hover {
  color: #fff;
  background-color: var(--main-color);
  border-color: transparent;
}
</style>
