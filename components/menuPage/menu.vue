<template>
  <div class="menu-component py-5">
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-10">
        <h2 class="header-section text-left">Menu</h2>
          <ProductComponent class="pt-5" :data="products" />
        </div>
        <div class="col-md-2">
          <h2 class="header-section text-left">Category</h2>
          <div class="menue-items pt-5">
            <div v-for="(item, i) in categories" :key="i">
              <div class="category-item text-left">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio @input="fetchAllItems()" v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" :value="item.id">{{item.name_translate}}</b-form-radio>
                </b-form-group>
              </div>
            </div>
          </div>
          <h4 class="header-section text-left pt-3">Filter By Price</h4>
          <div class="range-filter">
            <div class='range-slider'>
              <input type="range" min="1" max="500" step="1" v-model="sliderMin" @change="fetchAllItems()">
              <input type="range" min="1" max="500" step="1" v-model="sliderMax" @change="fetchAllItems()">
            </div>
            <p class="pt-3"><span>Price {{ sliderMin }} LE</span> : <span>{{ sliderMax }}LE</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from '../../services/ServiceFactory'
import ProductComponent from '../global/products.vue'
const CategoryService = ServiceFactory.get('Category')
const topProductService = ServiceFactory.get('Products')
export default {
  name: 'topProduct',
  components: {
    ProductComponent,
  },
  data: () => ({
    products: [],
    categories: [],
    selected: '',
    minAngle: 1,
    maxAngle: 500,
    data: [],
    }),
      computed: {
        sliderMin: {
          get: function() {
            var val = parseInt(this.minAngle);
            return val;
          },
          set: function(val) {
            val = parseInt(val);
            if (val > this.maxAngle) {
              this.maxAngle = val;
            }
            this.minAngle = val;
          }
        },
        sliderMax: {
          get: function() {
            var val = parseInt(this.maxAngle);
            return val;
          },
          set: function(val) {
            val = parseInt(val);
            if (val < this.minAngle) {
              this.minAngle = val;
            }
            this.maxAngle = val;
          }
        }
      },
    created() {
      this.fetchAllItems(),
      this.fetchAllCategories()
    },
    methods: {
      async fetchAllItems () {
        this.dataLoading = true
        const items = await topProductService.getAllProducts(this.selected, this.sliderMin, this.sliderMax)
        this.products = items.items
        this.dataLoading = false
      },
      async fetchAllCategories () {
        this.dataLoading = true
        const items = await CategoryService.getAllCategories()
        this.categories = items.categories
        this.dataLoading = false
      },
    }
}
</script>
