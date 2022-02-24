<template>
  <section class="section section-pagination">
    <div class="container">
      <ul class="pagination">
        <li class="page-item" :class="{disabled: pages.current_page === 1}">
          <a @click.prevent="emitPage(pages.current_page - 1)" class="page-link" >
            <i class="fas fa-angle-left"></i>
          </a>
        </li>
        <li class="page-item" v-for="page in pages.total_pages" :key="page"
        :class="{active: pages.current_page === page}">
          <span href="" class="page-link" v-if="pages.current_page === page">{{ page }}</span>

          <a @click.prevent="emitPage(page)" class="page-link" v-else>{{ page }}</a>
        </li>

        <li class="page-item" :class="{ disabled: pages.current_page === pages.total_pages}">
          <a @click.prevent="emitPage(pages.current_page + 1)" class="page-link">
            <i class="fas fa-angle-right"></i>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: ['pages'],
  mounted () {
  },
  methods: {
    emitPage (page) {
      this.$emit('emit-page', page)
    }
  }
}
</script>
