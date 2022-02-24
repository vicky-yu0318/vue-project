<template>
  <ToastMessage></ToastMessage>
  <router-view />
</template>

<script>
import emitter from '@/methods/eventBus'
import $httpMessageState from '@/methods/pushMessageState'
import ToastMessage from '@/components/ToastMessage.vue'

export default {
  data () {
    return {
      name: process.env.VUE_APP_NAME
    }
  },
  provide () {
    return {
      emitter,
      $httpMessageState
    }
  },
  components: {
    ToastMessage
  }
}
</script>
<style>
  * {
    margin:0;
    padding:0;
  }
  body,html {
    overflow-x: hidden;
  }
</style>
