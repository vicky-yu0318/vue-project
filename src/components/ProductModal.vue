<template>
  <section
    class="section section-productModal"
    :class="{ active: isModal }"
    id="productModal"
    ref="productModal"
  >
    <div id="btn-closeModal" @click="isModal = false">
      <i class="fas fa-times"></i>
    </div>

    <div class="container">
      <div class="productModal">
        <div class="theme-title">
          <span  v-if="isNew">建立產品</span>
          <span v-else>編輯產品</span>
        </div>
        <div class="row">
          <div class="col">
            <div class="input-field">
              <label for="">名稱</label>
              <input type="text" v-model="tempProduct.title" />
            </div>
            <div class="input-field">
              <label for="">單位</label>
              <input type="text" v-model="tempProduct.unit" />
            </div>
            <div class="input-field">
              <label for="">分類</label>
              <input type="text" v-model="tempProduct.category" />
            </div>
            <div class="input-field">
              <label for="">原價</label>
              <input
                type="number"
                v-model.number="tempProduct.origin_price"
              />
            </div>
            <div class="input-field">
              <label for="">售價</label>
              <input type="number" v-model.number="tempProduct.price" />
            </div>
            <div class="input-field">
              <label for="">產品描述</label>
              <input type="text" v-model="tempProduct.description" />
            </div>
            <div class="input-field">
              <label for="">主圖網址</label>
              <input type="text" v-model="tempProduct.imageUrl" />
            </div>
            <div class="image" v-if="tempProduct.imageUrl">
              <img :src="tempProduct.imageUrl" alt="" />
            </div>
          </div>

          <div class="col">
            <div>多圖新增</div>
            <div
              class="available-image"
              v-if="Array.isArray(tempProduct.imagesUrl)"
            >
              <div
                class="more-image"
                v-for="(image, key) in tempProduct.imagesUrl"
                :key="key"
              >
                <div class="input-field">
                  <label>圖片網址</label>
                  <input
                    type="text"
                    placeholder="請輸入副圖 連結"
                    v-model="tempProduct.imagesUrl[key]"
                  />
                </div>
                <div v-if="image"><img :src="image" alt="" /></div>
              </div>

              <div class="add-image" v-if="
                !tempProduct.imagesUrl.length ||
                tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                <button class="btn-add" @click="tempProduct.imagesUrl.push('')" >新增圖</button>
              </div>
              <div class="delete-image" v-else>
                <button class="btn-delete" @click="tempProduct.imagesUrl.pop()">刪除圖</button>
              </div>

            </div>
            <div v-else class="empty-image">
              <button class="btn-add" @click="createImages">
                首次新增多圖
              </button>
            </div>

            <div class="input-check">
              <input
                type="checkbox"
                :true-value="1"
                :false-value="0"
                id="is_enabled"
                v-model="tempProduct.is_enabled"
              />
              <label for="is_enabled">是否啟用</label>
            </div>
            <input type="file" id="file" @change="upload" ref="fileInput"
            name="file-to-upload">
            <button class="btn" @click="$emit('emit-update', tempProduct )">確認</button>
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
      isModal: false,
      tempProduct: {}
    }
  },
  props: ['isNew', 'product'],
  watch: {
    product () {
      this.tempProduct = this.product
    }
  },
  methods: {
    showModal () {
      this.isModal = true
    },
    closeModal () {
      this.isModal = false
    },
    createImages () {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    },
    upload () {
      const file = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.$http.post(api, formData).then((res) => {
        if (res.data.success) {
          this.tempProduct.imageUrl = res.data.imageUrl
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
