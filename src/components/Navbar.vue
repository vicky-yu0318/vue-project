<template>
  <header class="main-header" id="main-header" ref="mainHeader">
    <div class="container">
      <div class="logo">
        <a href="index.html">
          <h1 class="sr-only">pure tea</h1>
          <i class="fab fa-envira"></i>PURE
        </a>
      </div>
      <nav class="main-navbar" :class="{ active: isMenuDisplay }">
        <router-link to="/" @click="isMenuDisplay = false">首頁</router-link>
        <router-link to="/products" @click="isMenuDisplay = false">精選茶</router-link>
        <router-link to="/question" @click="isMenuDisplay = false">常見問題</router-link>

        <div class="fas fa-times" id="btn-closeMenu"
        :class="{ active: isMenuDisplay }"
        @click="isMenuDisplay = false"></div>
      </nav>
      <div class="main-icons">
        <router-link to="/cart" class="fas fa-shopping-cart" id="btn-cart">
          <span
            v-if="cart.carts && cart.carts.length > 0"
            :class="{ active: isJump }"
          >
            {{ cart.carts.length }}
          </span>
        </router-link>
        <div
          class="fas fa-search"
          id="btn-search"
          @click="changeSearchDisplay"
        ></div>
        <div class="fas fa-heart" id="btn-heart" @click="changeFavoriteDisplay">
          <span class="active" v-if="favoriteProduct.length > 0">
            {{ favoriteProduct.length }}
          </span>
        </div>
        <div class="fas fa-bars" id="btn-menu"
        @click=" isMenuDisplay = true "></div>
      </div>

      <div class="main-search" :class="{ active: isSearchDisplay }">
        <input
          type="search"
          class="input-box"
          placeholder="搜尋您要找的商品"
          v-model.trim.number="inputSearch"
        />
        <button class="fas fa-search" @click="searchRelative"></button>
      </div>
      <div
        class="main-search-wrap"
        v-if="(relativeDatas.length > 0) && isSearchDisplay"
      >
        <ul class="main-search-list">
          <li class="search-item" v-for="item in relativeDatas" :key="item.id">
            <a @click.prevent="goProduct(item.id)"> {{ item.title }} </a>
          </li>
        </ul>
      </div>
      <div class="favorite-list" :class="{ active: isFavoriteDisplay }">
        <h3 class="title">收藏清單
        </h3>
        <div class="emptyFavorite" v-if="favoriteProduct.length < 1">
          <p>目前沒有收藏的商品喔，趕快來收藏吧!</p>
          <router-link
            to="/products"
            class="btn-block"
            @click="isFavoriteDisplay = false"
            >前往收藏</router-link
          >
        </div>
        <div class="available-favorite" v-else>
          <div class="item" v-for="item in favoriteProduct" :key="item.id">
            <a @click.prevent="goProduct(item.product.id)" class="favoritePic">
              <img :src="item.product.imageUrl" alt="" />
            </a>
            <div class="content">
              <h3>{{ item.product.title }}</h3>
              <span class="price">  {{ $filters.toCurrency(item.product.price) }} </span>
            </div>
            <div class="interact">
                <div
                  class="btnAddCart"
                  @click="addToCart(item.product)">
                    <span class="fas fa-spinner fa-spin"
                      v-if="isFavoriteLoading.loadingItem === item.product.id">
                    </span>
                    <span class="fas fa-shopping-cart" v-else></span>
                </div>
                <div
                  class="btnDeleteFavorite"
                  @click="deleteMyFavorite(item.product.id)"
                >
                  <span class="fas fa-spinner fa-spin"
                    v-if="isFavoriteLoading.loadingItem === item.product.id">
                  </span>
                  <span class=" fas fa-times" v-else></span>
                </div>
            </div>
          </div>
          <div class="btn-group">
            <router-link to="/products" class="btn-block" data-not="not" @click="isFavoriteDisplay=false">繼續購物</router-link>
            <router-link to="/cart"  class="btn-block"  data-not="not" @click="isFavoriteDisplay=false">前往結帳</router-link>
          </div>
        </div>
        <div
          class="fas fa-times"
          id="btn-closeFavorite"
          :class="{ active: isFavoriteDisplay }"
          @click="isFavoriteDisplay = !isFavoriteDisplay"
        ></div>
      </div>

      <div id="btn-goTop" ref="btnGotop" @click="goToTop">
        <i class="fas fa-angle-up"></i>
      </div>
    </div>
  </header>
</template>

<script>
import emitter from '@/methods/eventBus'
import localStorage from '@/mixins/localStorage'
import goTop from '@/methods/goTop'

export default {
  data () {
    return {
      cart: {},
      focusPage: '',
      isJump: false,
      inputSearch: '',
      isSearchDisplay: '',
      isFavoriteDisplay: '',
      isMenuDisplay: '',
      myFavorite: this.get() || [],
      favoriteProduct: [],
      isFavoriteLoading: {
        loadingItem: ''
      }
    }
  },
  mixins: [localStorage],
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.cart = res.data.data
          this.isJump = false
        } else {
          this.$httpMessageState(res, '取得購物車清單')
        }
      }).catch((err) => {
        this.$httpMessageState(err, '取得購物車清單')
      })
    },
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
          } else {
            this.$httpMessageState(res, '取得產品清單')
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, '取得產品清單')
        })
    },
    goProduct (goID) {
      this.$router.push(`/product/${goID}`)
      this.inputSearch = ''
      this.isSearchDisplay = false
      this.isFavoriteDisplay = false
    },
    searchRelative () {
      const searchProduct = this.products.filter((item) => {
        return item.title === this.inputSearch
      })
      if (searchProduct.length < 1) {
        const status = '無相關產品 / 請輸入搜尋關鍵字'
        this.$httpSideMessageState(status, false)
        return
      }
      const goId = searchProduct[0].id
      this.goProduct(goId)
    },
    windowListen () {
      window.addEventListener('scroll', this.windowScroll)
    },
    windowScroll () {
      if (window.pageYOffset > 50) {
        this.$refs.mainHeader.classList.add('active')
        this.$refs.btnGotop.classList.add('active')
        this.isFavoriteDisplay = false
        setTimeout(() => {
          this.isSearchDisplay = false
        }, 1000)
      } else {
        this.$refs.mainHeader.classList.remove('active')
        this.$refs.btnGotop.classList.remove('active')
      }
    },
    changeFavoriteDisplay () {
      this.isFavoriteDisplay = !this.isFavoriteDisplay
      this.isSearchDisplay = false
    },
    changeSearchDisplay () {
      this.isSearchDisplay = !this.isSearchDisplay
      this.inputSearch = ''
    },
    getFavorite () {
      this.myFavorite = this.get() || []
      this.favoriteProduct = []
      if (this.myFavorite.length > 0) {
        this.myFavorite.forEach((item) => {
          const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${item}`
          this.$http.get(api).then((res) => {
            if (res.data.success) {
              this.favoriteProduct.push(res.data)
            }
          })
        })
      }
    },
    addToCart (item) {
      this.isFavoriteLoading.loadingItem = item.id
      const status = '加入購物車'
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: item.id,
        qty: 1
      }
      this.$http
        .post(api, { data: cart })
        .then((res) => {
          this.$httpMessageState(res, status)
          emitter.emit('update-cart')
          this.isFavoriteLoading.loadingItem = ''
        })
        .catch((err) => {
          this.$httpMessageState(err, status)
        })
    },
    deleteMyFavorite (id) {
      const status = '商品從收藏清單中移除'
      this.myFavorite.splice(this.myFavorite.indexOf(id), 1)
      this.$httpSideMessageState(status, false)
      this.save(this.myFavorite)
      this.emitter.emit('update-favorite')
    },
    goToTop () {
      goTop()
    }
  },
  mounted () {
    this.getProducts()
    this.getCart()
    this.windowListen()
    this.getFavorite()
    emitter.on('update-cart', () => {
      this.isJump = true
      this.getCart()
    })
    emitter.on('update-favorite', () => {
      this.getFavorite()
    })
  },
  computed: {
    relativeDatas () {
      const keyword = this.inputSearch
      if (!keyword) {
        return []
      }
      const result = this.products.filter((item) => {
        return item.title.match(keyword)
      })
      return result || []
    }
  }
}
</script>

<style>
.router-link-active.router-link-exact-active {
  color: #fff;
}
@media (max-width: 767px) {
  .router-link-active.router-link-exact-active:not([data-not="not"]) {
    color: var(--main-color);
  }
}
</style>
