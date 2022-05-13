<template>
  <div class="menu-component py-5">
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-10">
          <div class="header-section text-left">
            <strong>
              <h2>
                {{ $t("menu.menu") }} ( {{ $t("home.orderNow") }}
                <img
                  width="5%"
                  src="data:image/png;base64,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"
                />
                )
              </h2></strong
            >
          </div>
          <div v-if="products.length > 0">
            <ProductComponent class="pt-5" :allProducts="products" />
          </div>
          <div v-else>
            {{ $t("global.noData") }}
          </div>
        </div>
        <div class="col-md-2">
          <h2 class="header-section text-left">{{ $t("menu.category") }}</h2>
          <div class="menue-items pt-5">
            <div class="all">
              <b-form-group v-slot="{ ariaDescribedby1 }">
                <b-form-radio
                  @change="fetchAllItems()"
                  v-model="selected"
                  :aria-describedby="ariaDescribedby1"
                  name="some-radios"
                  >{{ $t("menu.all") }}</b-form-radio
                >
              </b-form-group>
            </div>
            <div v-for="item in categories" :key="item.id">
              <div class="category-item text-left">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio
                    @change="
                      (value) => {
                        changeCategory(value);
                        fetchAllItems();
                      }
                    "
                    v-model="selected"
                    :aria-describedby="ariaDescribedby"
                    name="some-radios"
                    :value="item.id"
                    >{{ item.name_translate }}</b-form-radio
                  >
                </b-form-group>
              </div>
            </div>
          </div>
          <!-- <h4 class="header-section text-left pt-3">Filter By Price</h4>
          <div class="range-filter">
            <div class='range-slider'>
              <input type="range" min="1" max="500" step="1" v-model="sliderMin" @change="fetchAllItems()">
              <input type="range" min="1" max="500" step="1" v-model="sliderMax" @change="fetchAllItems()">
            </div>
            <p class="pt-3"><span>Price {{ sliderMin }} LE</span> : <span>{{ sliderMax }}LE</span></p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from "../../services/ServiceFactory";
import ProductComponent from "../global/products.vue";
const CategoryService = ServiceFactory.get("Category");
const topProductService = ServiceFactory.get("Products");
export default {
  name: "topProduct",
  components: {
    ProductComponent,
  },
  data: () => ({
    products: [],
    categories: [],
    selected: "",
    minAngle: 1,
    maxAngle: 500,
    data: [],
  }),
  computed: {
    sliderMin: {
      get: function () {
        var val = parseInt(this.minAngle);
        return val;
      },
      set: function (val) {
        val = parseInt(val);
        if (val > this.maxAngle) {
          this.maxAngle = val;
        }
        this.minAngle = val;
      },
    },
    sliderMax: {
      get: function () {
        var val = parseInt(this.maxAngle);
        return val;
      },
      set: function (val) {
        val = parseInt(val);
        if (val < this.minAngle) {
          this.minAngle = val;
        }
        this.maxAngle = val;
      },
    },
  },
  created() {
    this.selected = +this.$route.query.category || "";
    this.fetchAllItems(), this.fetchAllCategories();
  },
  methods: {
    changeCategory(value) {
      this.$router.push({ query: { category: value } });
    },
    async fetchAllItems() {
      // this.$router.push({query: {category : this.selected}})
      this.dataLoading = true;
      const items = await topProductService.getAllProducts(this.selected);
      this.products = items.items;
      this.dataLoading = false;
    },
    async fetchAllCategories() {
      this.dataLoading = true;
      const items = await CategoryService.getAllCategories();
      this.categories = items.categories;
      this.dataLoading = false;
    },
  },
};
</script>
