<template>
  <div class="products-component">
    <div class="container">
      <div class="row">
      <div class="col-md-3" v-for="(item) in allProducts" :key="item.id">
          <div class="product-item" @click="showProductDetails(item)">
            <div class="product-image">
              <img :src="item.image" alt="product-image">
              <div class="overlay">
              <div class="addToCart d-flex justify-content-center">
                <i class="fas fa-eye" @click="showProductDetails(item)"></i>
                <!-- <b-button class="btn" @click="addToCart(item, i)"><i class="fas fa-shopping-cart"></i> Add To Cart</b-button> -->
              </div>
            </div>
            </div>
            <div class="product-details d-flex justify-content-center">
              <p>{{ item.name_translate }}</p>
            </div>
          </div>
      </div>
      </div>
    </div>
    <b-modal
        v-model="showDetails"
        size="xl"
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
              <p v-html="product.description_translate"></p>
              <p>Sizes:</p>
              <div class="row">
              <div class="col-md-3" v-for="(size) in product.sizes" :key="size.id">
              <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio v-model="selecetdSize" :aria-describedby="ariaDescribedby" name="some-radios" :value="size">
                  {{size.name}} <span class="price">{{' ' + size.price}} L.E</span></b-form-radio>
                </b-form-group>
              </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="row" v-if="product.addson">
                <div class="col-md-3" v-for="(addon) in product.addson" :key="addon.id">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-checkbox-group
                    id="checkbox-group-2"
                    v-model="selecetdSize.selectedAddons"
                    :aria-describedby="ariaDescribedby"
                    name="flavour-2"
                  >
                    <b-form-checkbox :value="addon">
                      {{addon.name_translate}}
                      <span class="price"> {{ '  ' + addon.price}}L.E</span>
                    </b-form-checkbox>
                  </b-form-checkbox-group>
                </b-form-group>
              </div>
              </div>
              <div v-if="selecetdSize.id" class="row actions">
                <b-button class="btn" @click="increase()"><i class="fas fa-shopping-cart"></i>
                  Add To Cart
                </b-button>
              </div>

      </b-modal>
      <div class="alert-div">
        <b-alert
          :show="dismissCountDown"
          dismissible
          variant="success"
          @dismissed="dismissCountDown=0"
          @dismiss-count-down="countDownChanged"
          >
            Item Added To Your Cart <nuxt-link to="/cart">Go To Your Cart</nuxt-link>
        </b-alert>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
export default {
  name: 'products',
  props:['allProducts'],
  data: () => ({
    disabled: true,
    showDetails: false,
    product: {},
    selectedAddons: [],
    dismissSecs: 5,
    dismissCountDown: 0,
    selecetdSize: {
      selectedAddons: [],
    }
  }),
  computed: {
    products() {
      return this.allProducts
    },
    productsState() {
      return this.$store.state.products;
    },
  },
  watch: {

    // productsState: {
    //   // This will let Vue know to look inside the array
    //   deep: true,

    //   // We have to move our method to a handler field
    //   handler(){
    //     console.log('The list of colours has changed!')
    //     this.productsState.map(item => {
    //       if (item.id = this.product.id) {
    //         this.product.sizes = item.sizes;
    //       }
    //     })
    //   }
    //   }
    },
  methods: {
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
    increase() {
      this.$store.commit("increase", this.selecetdSize);
      this.dismissCountDown = this.dismissSecs
      this.selecetdSize = {
        selectedAddons: [],
      }
    },
    decrease() {
      if (this.product.quantity >= 1) {
        this.$store.commit("decrease", this.selecetdSize);
      }
    },
    showProductDetails(productItem){
      this.showDetails = true
      // this.productsState.map(item => {
      //     if (item.id = productItem.id) {
      //       productItem.sizes = item.sizes;
      //     }
      //   })
      this.product = productItem
    },
  }
}
</script>
