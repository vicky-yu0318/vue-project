<template>
  <section class="section-toastMessage">
    <div class="toastMessage" v-for="(item, key) in messages" :key="key">
      <div class="title" :style="`background: ${item.style}`">
        <span>{{ item.title }}</span>
        <div class="fas fa-times" @click="clearToast(key)"></div>
      </div>
      <div class="content" v-if="item.content">{{ item.content }}</div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      messages: [],
      isToast: false
    }
  },
  methods: {
    toastShow () {
      this.isToast = true
      setTimeout(() => {
        this.messages.shift()
      }, 6000)
    },
    clearToast (key) {
      this.messages.splice(key, 1)
    }
  },
  inject: ['emitter'],
  mounted () {
    this.emitter.on('push-message', (message) => {
      const { title, style, content } = message
      this.messages.push({ title, style, content })
      // console.log('toastMessage.vue被觸發了', message)
      this.toastShow()
    })
  }
}
</script>
