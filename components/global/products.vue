<template>
  <div class="products-component">
    <div class="container">
      <div class="row">
      <div class="col-md-3" v-for="(item, i) in data" :key="i">
          <div class="product-item">
            <div class="product-image">
              <img :src="item.image" alt="product-image">
              <div class="overlay">
              <div class="addToCart d-flex justify-content-between">
                <i class="fas fa-eye" @click="showProductDetails(item)"></i>
                <b-button class="btn"><i class="fas fa-shopping-cart"></i> Add To Cart</b-button>
              </div>
            </div>
            </div>
            <div class="product-details d-flex justify-content-between">
              <p>{{ item.name_translate }}</p>
              <p>{{item.price}} LE</p>
            </div>
          </div>
      </div>
      </div>
    </div>
    <b-modal
        v-model="showDetails"
        size="lg"
        centered
        title="BootstrapVue"
        >
        <template #modal-header="{ close }">
          <!-- Emulate built in modal header close button action -->
          <b-button class="close" size="sm" variant="outline-danger" @click="close()">
            <i class="fas fa-times"></i>
          </b-button>
        </template>
          <div class="d-flex">
            <div class="img">
              <img :src="product.image" alt="product.image">
            </div>
            <div class="content">
              <h4>{{product.name_translate}}</h4>
              <p>{{product.description_translate}}</p>
              <p>{{product.price}} LE</p>
            </div>
          </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'products',
  props:['data'],
  data: () => ({
    showDetails: false,
    product: {}
  }),
  methods: {
    showProductDetails(item){
      this.showDetails = true
      this.product = item
      console.log(`item`, item)
    }
  }
}
</script>
