<template>
  <section class="section section-question">
    <div class="container">
      <div class="title-wrap">
        <h2 class="main-title">常見問題</h2>
      </div>

      <div class="accordion-wrap">
        <div
          class="accordion"
          @click="openAccordion(i)"
          v-for="(item, i) in accordionData"
          :key="item"
        >
          <div class="accordion-heading">
            <span class="fas fa-plus"></span>
            <h3>{{ item.heading }}</h3>
            <i class="fas fa-angle-down"></i>
          </div>

          <div class="accordion-content">
            <p>
              {{ item.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import goTop from '@/methods/goTop'

export default {
  data () {
    return {
      accordions: [],
      btnCloses: [],
      currentAccordion: '',
      accordionData: [
        {
          heading: '請問下單後，何時會出貨？',
          content: '收到訂單後2-3個工作天內會出貨，運送方式如下。(一) 選擇宅配：出貨後1-2天到貨(星期日不送貨)。 (二) 選擇便利商店取貨：我們採集貨方式出貨。'
        },
        {
          heading: '請問生理期來，可以喝嗎？',
          content: '店內全部商品，除「新武洛神仙楂」不建議在生理期飲用，其他皆可酌量飲用。注意：「薑黃枸杞養神茶」視體質而定，若體質較燥熱或是經血量較多，亦不建議飲用。'
        },
        {
          heading: '可以冷泡嗎？',
          content: '店內所有的茶都可以冷泡，等待期會較長，常溫約2小時，冷藏約6小時。「洋甘菊香柚綠茶」要經由熱水，花草及水果的香氣才能釋放出來，一般建議先熱泡高濃度，再加冰塊或冷水降溫。'
        }
      ]
    }
  },
  methods: {
    accordionInit () {
      this.accordions = document.querySelectorAll('.accordion')
      this.btnCloses = document.querySelectorAll('.accordion .fa-plus')
    },
    openAccordion (order) {
      this.accordions.forEach((acco) => {
        acco.classList.remove('active')
        // 以上  先讓所有有class的消除，後面再讓按的那個物件將class加回來
        this.accordions[order].classList.add('active')
      })
      this.btnCloses.forEach((acco) => {
        acco.classList.remove('fa-minus')
        acco.classList.add('fa-plus')
        // 以上  先讓所有有+-圖的消除，後面再讓按的那個物件將class加回來
        this.btnCloses[order].classList.remove('fa-plus')
        this.btnCloses[order].classList.add('fa-minus')
      })
    }
  },
  mounted () {
    this.accordionInit()
    goTop()
  }
}
</script>
