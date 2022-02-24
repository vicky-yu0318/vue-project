export default {
  methods: {
  // 存檔save:
    save (favorite) {
      const favoriteString = JSON.stringify(favorite)
      localStorage.setItem('teaFavorite', favoriteString)
    },
    get () {
    // 讀檔get:
      return JSON.parse(localStorage.getItem('teaFavorite'))
    },
    addMyFavorite (id) {
      if (this.myFavorite.includes(id)) {
        const status = '商品已從收藏清單中移除'
        this.myFavorite.splice(this.myFavorite.indexOf(id), 1)
        this.$httpSideMessageState(status, false)
      } else {
        const status = '加入我的收藏清單'
        this.myFavorite.push(id)
        this.$httpSideMessageState(status)
      }
      this.save(this.myFavorite)
      this.emitter.emit('update-favorite')
    }
  },
  inject: ['emitter'],
  watch: {
    myFavorite: {
      handler () {
        this.save(this.myFavorite)
      },
      deep: true
    }
  }
}
