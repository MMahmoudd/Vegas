<template>
  <div class="category-component">
    <div class="container">
      <h2 class="header-section">Category</h2>
      <div class="category-items">
      <div v-for="(item, i) in data" :key="i">
          <div class="category-item">
            <div class="category-image">
              <img :src="item.image" alt="category-image">
              <!-- <img src="../../assets/images/Component 3 – 1.png" alt="category-image"> -->
            </div>
            <p class="category-name">
              {{ item.name_translate }}
            </p>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from '../../services/ServiceFactory'
const CategoryService = ServiceFactory.get('Category')
export default {
  name: 'Category',
  data: () => ({
    data: [],
    }),
    created() {
      this.fetchAllItems()
    },
    methods: {
      async fetchAllItems () {
        this.dataLoading = true
        const items = await CategoryService.getAllCategories()
        this.data = items.categories
        this.dataLoading = false
      },
    }
}
</script>
