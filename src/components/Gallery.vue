<template>
  <section class="section section-gallery up-down">
      <div class="container">
        <h2 class="main-title"><span>環境</span>把關</h2>
        <div class="gallery item-group">
            <a class="thumbnail item" @click.prevent="show(image)" v-for="image in galleryImages" :key="image">
              <img :src="image.url" />
              <div class="txt"> {{ image.txt }} </div>
            </a>
        </div>
        <div class="lightbox" v-if="visible" @click="hide">
          <div id="btn-close" class="fas fa-times" @click="hide"></div>
          <div class="flex">
            <div
              class="lightbox-navigation"
              @click.stop="prePage"
              :class="{ invisible: !hasPre() }"
            >
              <i class="fas fa-angle-left"></i>
            </div>
            <div class="lightbox-image" @click.stop="">
              <img :src="galleryImages[index].url" />
            </div>
            <div
              class="lightbox-navigation"
              @click.stop="nextPage"
              :class="{ invisible: !hasNext() }"
            >
              <i class="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      index: ''
    }
  },
  props: {
    galleryImages: {
      type: Array,
      required: true
    }
  },
  mounted () {
    window.addEventListener('keydown', this.onKeydown)
  },
  methods: {
    show (image) {
      this.index = this.galleryImages.indexOf(image)
      this.visible = true
    },
    hide () {
      this.visible = false
    },
    hasNext () {
      return this.index + 1 < this.galleryImages.length
    },
    hasPre () {
      return this.index - 1 >= 0
    },
    nextPage () {
      if (this.hasNext()) {
        this.index += 1
      }
    },
    prePage () {
      if (this.hasPre()) {
        this.index -= 1
      }
    },
    onKeydown (e) {
      if (this.visible) {
        switch (e.key) {
          case 'ArrowRight':
            this.nextPage()
            break
          case 'ArrowLeft':
            this.prePage()
            break
          case 'ArrowDown':
          case 'ArrowUp':
          case ' ':
            e.preventDefault()
            break
          case 'Escape':
            this.hide()
            break
        }
      }
    }
  }
}
</script>
<style>
</style>
