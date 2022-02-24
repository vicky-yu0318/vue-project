<template>
  <section class="section section-progressbar" id="section-progressbar">
    <div class="container">
      <ul class="progressbar">
        <li class="progressCart" :class=" { active: currentProgress === 'Cart' } ">購物車</li>
        <li class="progressFill" ref="progressFill" :class=" { active: currentProgress === 'Payment' } ">填寫資料</li>
        <li class="progressOrder" :class=" { active: currentProgress === 'Order' } ">訂單確認</li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    currentProgress: {
      type: String
    }
  }
}
</script>
