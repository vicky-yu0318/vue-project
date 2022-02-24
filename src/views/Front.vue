<template>

<div class="front">
  <div id="nav">
    <Navbar></Navbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</div>
</template>

<script>
/* global$ */
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>

<style lang="scss">
@import '../assets/stylesheets/style.css';
</style>
