<template>
  <section class="section section-home" id="section-home">
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <Swiper
      class="home-slider swiper"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }"
      :autoplay="{ autoplay: true,
                   pauseOnMouseEnter: false,
                   stopOnLastSlide: false,
                   disableOnInteraction: false
                  }"
      :pagination="{ clickable: true }"
      loop
    >
      <SwiperSlide
        v-for="item in bannerImages"
        :key="item"
        data-swiper-autoplay="6000"
        class="slide swiper-slide"
        :style="`background: url(${item.url}) no-repeat`"
      >
        <div class="content">
          <span> {{ item.subTitle }} </span>
          <h2>{{ item.title }}</h2>
          <router-link to="/products" class="btn-main"
            >前往茶鄉之旅</router-link
          >
        </div>
      </SwiperSlide>
    </Swiper>
  </section>

  <section class="section section-arrivals" id="section-arrivals">
    <div class="container">
      <h2 class="main-title"><span>新研發</span>茶種</h2>

      <Swiper
        class="arrivals-slider swiper"
        v-if="products.length"
        :navigation="{
          nextEl: '.arrivals-nextArrow',
          prevEl: '.arrivals-prevArrow'
        }"
        :pagination="{ clickable: true }"
        :breakpoints="swiperOptions.breakpoints"
        :autoplay="{ autoplay: true,
                     disableOnInteraction: false
                    }"
        loop
        :centeredSlides="true"
        :slidesPerView="auto"
      >
        <div class="arrivals-navigation">
          <div class="nav-indicator arrivals-prevArrow">
            <i class="fas fa-angle-left"></i>
          </div>
          <div class="nav-indicator arrivals-nextArrow">
            <i class="fas fa-angle-right"></i>
          </div>
        </div>
        <SwiperSlide
          class="slide swiper-slide arrivals-slide"
          data-swiper-autoplay="5500"
          v-for="item in products"
          :key="item.id"
          @click="previewPage(item)"
        >
          <div class="arrivals-slide-image">
            <img :src="item.imageUrl" />
          </div>
          <h3>{{ item.title }}</h3>
          <div class="price"> {{ $filters.toCurrency(item.price) }}</div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>

  <section
    class="section section-preview"
    :class="{ active: previewBack }"
    @click.self="previewBack = false"
  >
    <div
      id="btn-closePreview"
      class="fas fa-times"
      @click="previewBack = false"
    ></div>

    <div
      class="preview"
      v-for="item in products"
      :key="item.id"
      :class="{ active: previewId === item.id }"
    >
      <img :src="item.imageUrl" alt="" />
      <h3>{{ item.title }}</h3>
      <div class="stars">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
      </div>
      <p>
        {{ item.description }}
      </p>
      <div class="price"> {{ $filters.toCurrency(item.price) }}</div>
      <div class="icons">
        <div @click="addToCart(item)" class="fas fa-shopping-cart"></div>
        <div
          class="fas fa-heart"
          @click="addMyFavorite(item.id)"
          :class="{ active: myFavorite.includes(item.id) }"
        ></div>
        <router-link
          :to="`/product/${item.id}`"
          class="fas fa-eye"
        ></router-link>
      </div>
    </div>
  </section>

  <section
    class="section section-introduction"
    id="section-introduction"
    style="
      background: url(https://upload.cc/i1/2022/03/19/FblsnO.jpg);
      background-attachment: fixed;
      background-size: cover;
      background-position: center;
    "
  >
    <div class="container">
      <div class="content">
        <p>
          <span>品牌理念 </span>  「活在當下」的意義是什麼呢？是仔細欣賞、品味每個「相遇」—— 時光不逆流，深刻的瞬間砌成真實生活，這樣的哲學，讓我們從一杯單品茶開始，舉杯敬賀「當下」的香甘韻，明辨舌尖心頭的幸運，感受「此刻此地・獨一無二」的美好滋味。
        </p>
      </div>
    </div>
  </section>

  <section class="section section-about" id="section-about">
    <div class="container">
      <div class="item-group">
        <div
          class="item"
          v-for="item in aboutDatas"
          :key="item.id"
          :style="{ background: `url(${item.url})` }"
          @click="interactContent(item.id)"
        >
        </div>
      </div>
      <div class="content-block">
        <div class="content">
          <template v-for="item in aboutDatas" :key="item.id">
            <div class="txt" :class="{ active: aboutCurrentId === item.id }">
              <span>{{ item.subtitle }}</span>
              <h3>{{ item.title }}</h3>
              <p>
                {{ item.content }}
              </p>
            </div>
          </template>
          <div class="pagination">
            <div
              class="pagination-bullet"
              v-for="item in aboutDatas"
              :key="item"
              :class="{ active: aboutCurrentId === item.id }"
              @click="interactContent(item.id)"
            ></div>
          </div>
        </div>

        <a href="javascript:;" class="btn-main">了解更多</a>
      </div>
    </div>
  </section>

  <Gallery :galleryImages="galleryImages"></Gallery>

  <section class="section section-features" id="section-features">
    <div class="container">
      <h2 class="main-title"><span>精選</span>茶種</h2>

      <div class="item-group">
        <div class="item">
          <div class="image">
            <img src="https://upload.cc/i1/2022/02/21/tqk4K6.jpg" alt="" />
          </div>
          <div class="content">
            <i class="fas fa-cookie-bite"></i>
            <h3>搭配甜點</h3>
            <p>
              分享甜食的時刻，茶是最重要的配角！花點心思選對茶，就能讓茶與甜點交織出的美味晉升到另一個層次
            </p>
            <router-link to="/product/-MvbZAtrICmL5LyLAPZ-" class="btn"
              >首選茶款</router-link>
          </div>
        </div>

        <div class="item">
          <div class="image">
            <img src="https://upload.cc/i1/2022/02/21/qUaFEX.jpg" alt="" />
          </div>
          <div class="content">
            <i class="fas fa-book"></i>
            <h3>閱讀提神</h3>
            <p>
              研究指出茶葉中的抗氧化物質-兒茶素，可使大腦思緒清晰，活化大腦的記憶力及認知能力，使人在工作時更容易專注，效率提升。
            </p>
            <router-link to="/product/-MvgGSRjeYuppS25l3N_" class="btn"
              >首選茶款</router-link
            >
          </div>
        </div>

        <div class="item">
          <div class="image">
            <img src="https://upload.cc/i1/2022/02/21/ycphxK.jpg" alt="" />
          </div>
          <div class="content">
            <i class="fas fa-mug-hot"></i>
            <h3>天氣微涼最好陪伴</h3>
            <p>
              天氣微涼喝熱茶不但能起到保暖的作用，更能滋養氣色。茶中富含著大量的蛋白質，可以養精蓄銳，增強人體抵抗力。
            </p>
            <router-link to="/product/-MvgETWZOrBtBps8I_a6" class="btn"
              >首選茶款</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import goTop from '@/methods/goTop'
import emitter from '@/methods/eventBus'
import localStorage from '@/mixins/localStorage'
import Gallery from '@/components/Gallery.vue'
// swiper core
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
// swiper vue
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
// swiper css
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination, Autoplay])

export default {
  data () {
    return {
      products: [],
      swiperOptions: {
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 30 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1200: { slidesPerView: 3, spaceBetween: 30 }
        }
      },
      bannerImages: [
        {
          url: 'https://upload.cc/i1/2022/02/08/opMdXO.jpg',
          subTitle: '恬淡風味，為日常生活帶來味蕾慢旅',
          title: '經典茶'
        },
        {
          url: 'https://upload.cc/i1/2022/02/08/bSh92D.jpg',
          subTitle: '精心淬鍊，值得細細品嚐',
          title: '精粹茶'
        }
      ],
      aboutDatas: [
        {
          url: 'https://upload.cc/i1/2022/02/11/CRMLXj.jpg',
          title: '嚴選食材',
          subtitle: '安心保證',
          content: '茶葉來自天然無污染的茶園，採用頂級PET茶包，並通過台灣嚴格檢驗。我們擁有獨自的茶園、茶農及一流的製茶師傅。從茶園管理、採茶、製茶一貫作業，並且不斷提升茶葉品質。讓消費者能享受每一口茶為 PURE 經營理念。',
          id: '1'
        },
        {
          url: 'https://upload.cc/i1/2022/02/11/qM8t96.jpg',
          title: '滴滴回甘',
          subtitle: '就像現淬',
          content: 'PURE 重新定義了喝茶文化，將「茶文化」輕鬆且有態度的融入生活當中，用各種形式讓人感受茶的魅力，啟發生活靈感。',
          id: '2'
        },
        {
          url: 'https://upload.cc/i1/2022/02/11/d4FCZq.jpg',
          title: '獨特風味',
          subtitle: '淡雅清香',
          content: '經典茶葉散發著優雅香氣，應用頂級配料，以感受多層次蔓延的絕佳風味',
          id: '3'
        }
      ],
      previewId: '',
      previewBack: false,
      aboutCurrentId: '1',
      galleryImages: [
        {
          url: 'https://upload.cc/i1/2022/02/06/He2UyC.jpg',
          txt: '茶園環境'
        },
        {
          url: 'https://upload.cc/i1/2022/02/06/LGeAB7.jpg',
          txt: '用心灌溉'
        },
        {
          url: 'https://upload.cc/i1/2022/02/06/NPDLCO.jpg',
          txt: '新鮮原粹'
        },
        {
          url: 'https://upload.cc/i1/2022/02/06/fO3LQw.jpg',
          txt: '獻給特別的您'
        }
      ],
      myFavorite: this.get() || []
    }
  },
  mixins: [localStorage],
  mounted () {
    goTop()
    this.getProducts()
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.products
        })
        .catch((err) => {
          this.$httpMessageState(err, '取產品')
        })
    },
    previewPage (previewItem) {
      this.previewBack = true
      this.previewId = previewItem.id
    },
    interactContent (itemId) {
      this.aboutCurrentId = itemId
    },
    addToCart (item) {
      const status = '加入購物車'
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: item.id,
        qty: 1
      }
      this.$http.post(api, { data: cart }).then((res) => {
        this.$httpMessageState(res, status)
        emitter.emit('update-cart')
      })
        .catch((err) => {
          this.$httpMessageState(err, status)
        })
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    Gallery
  }
}
</script>

<style>
.arrivals-slider {
  background-color: #eee;
  position: relative;
}
.arrivals-slider .arrivals-slide-image {
  width: 100%;
  height: 250px;
}
.arrivals-slider .arrivals-slide-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.arrivals-navigation {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  z-index: 2;
}
.arrivals-navigation .nav-indicator {
  background-color: #fff;
  border: 1px solid var(--light-color);
  height: 50px;
  width: 50px;
  color:  var(--light-color);
  font-size: 30px;
  text-align: center;
  line-height: 50px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s linear;
}
.arrivals-navigation .nav-indicator:hover {
  background-color: var(--main-color);
  color: #fff;
}
.arrivals-slider .swiper-pagination-bullet {
  background-color: var(--main-color);
}
.arrivals-slider .swiper-pagination-bullet-active {
  transform: scale(1.3);
}
</style>
