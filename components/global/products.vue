<template>
  <div class="products-component">
    <div class="container">
      <div class="pt-3" v-for="item in productsTest" :key="item.id">
        <h4 v-if="item.products.length > 0" class="header-section">
          {{ item.categoryName }}
        </h4>
        <div class="row">
          <div
            class="menue-items col-md-3"
            v-for="product in item.products"
            :key="product.id"
          >
            <div class="product-item" @click="showProductDetails(product)">
              <div class="product-image">
                <img :src="product.image" alt="product-image" />
                <div class="overlay">
                  <div class="addToCart d-flex justify-content-center">
                    <i
                      class="fas fa-eye"
                      @click="showProductDetails(product)"
                    ></i>
                  </div>
                </div>
              </div>

              <div class="product-details d-flex justify-content-center mt-1">
                <p>{{ product.name_translate }}</p>
              </div>
              <p class="product_price">
                <strong>( {{ product.sizes[0].price }} LE ) </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="showDetails" size="xl" centered title="BootstrapVue">
      <template #modal-header>
        <div></div>
        <!-- Emulate built in modal header close button action -->
      </template>
      <b-button
        class="close"
        size="sm"
        variant="outline-danger"
        @click="close()"
      >
        <i class="fas fa-times"></i>
      </b-button>
      <div class="d-flex">
        <div class="img">
          <img :src="product.image" alt="product.image" />
        </div>
        <div class="content">
          <h4>{{ product.name_translate }}</h4>
          <p v-html="product.description_translate"></p>
          <!-- <p>{{ $t("sizes") }}:</p> -->
          <div class="row">
            <div class="col-md-3" v-for="size in product.sizes" :key="size.id">
              <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio
                  v-model="selecetdSize"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  :value="size"
                  @change="resetType()"
                >
                  <span v-if="$i18n.locale == 'en'"> {{ size.name }}</span>
                  <span v-if="$i18n.locale == 'ar'"> {{ size.name_ar }}</span>
                  <span class="price">( {{ " " + size.price }} L.E )</span>
                </b-form-radio>
              </b-form-group>
            </div>
          </div>
          <div v-if="selecetdSize.quantity >= 0" class="quantity text-center">
            <i
              class="add fas fa-plus"
              @click="increaseSelecetdSize(selecetdSize)"
            ></i>
            <span class="font-weight-bold mx-2">{{
              selecetdSize.quantity
            }}</span>
            <i
              class="minus fas fa-minus"
              @click="decreaseSelecetdSize(selecetdSize)"
            ></i>
          </div>
          <br>
          <div class="row" v-if="selecetdSize.quantity >= 0">
            <div class="col-md-3" v-for="(type) in product.types" :key="type.id">
              <b-form-group v-slot="{ ariaDescribedby1 }">
                <b-form-radio
                  v-model="selecetdSize.type_id"
                  :aria-describedby="ariaDescribedby1"
                  name="type-radios"
                  :value="type"
                >
                  <span>{{ type.name_translate }}</span>
                </b-form-radio>
              </b-form-group>
            </div>
            <div class="col-12" v-if="selecetdSize.type_id">
              <div
                v-if="selecetdSize.type_id.name_translate === 'Regular' || selecetdSize.type_id.name_translate === 'Spicy'"
                class="quantity text-center"
              >
              <p>{{ selecetdSize.type_id.name_translate + ' ' + $t('global.pieces')}}</p>
                <span class="font-weight-bold mx-2">
                  {{ selecetdSize.type_id.pieces = selecetdSize.pieces * selecetdSize.quantity }}
                </span>
              </div>
              <div
                v-if="selecetdSize.type_id.name_translate === 'Mixed'"
                class="quantity text-center d-flex justify-content-center"
              >
              <div class="Regular mx-2">
                <p>{{ 'Regular' + ' ' + $t('global.pieces')}}</p>
                <i
                  class="add fas fa-plus"
                  @click="increaseRegularPieces(selecetdSize)"
                ></i>
                <span class="font-weight-bold mx-2">
                  {{ selecetdSize.type_id.regularPieces }}
                </span>
                <i
                  class="minus fas fa-minus"
                  @click="decreaseRegularPieces(selecetdSize)"
                ></i>
              </div>
              <div class="Spicy mx-2">
                <p>{{ 'Spicy' + ' ' + $t('global.pieces')}}</p>
                <i
                  class="add fas fa-plus"
                  @click="increaseSpicyPieces(selecetdSize)"
                ></i>
                <span class="font-weight-bold mx-2">
                  {{ selecetdSize.type_id.spicyPieces }}
                </span>
                <i
                  class="minus fas fa-minus"
                  @click="decreaseSpicyPieces(selecetdSize)"
                ></i>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row" v-if="product.addson">
        <div class="col-md-3" v-for="addon in product.addson" :key="addon.id">
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              id="checkbox-group-2"
              v-model="selecetdSize.selectedAddons"
              :aria-describedby="ariaDescribedby"
              name="flavour-2"
            >
              <b-form-checkbox :value="addon">
                {{ addon.name_translate }}
                <span class="price"
                  ><strong> ( {{ "  " + addon.price }}L.E ) </strong></span
                >
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <b-form-textarea
            id="textarea-rows"
            :placeholder="$t('global.addComment')"
            v-model="selecetdSize.comment"
            rows="3"
            class="my-3"
          />
        </div>
      </div>
      <div
        v-if="selecetdSize.id || selecetdSize.price == 0"
        class="row actions"
      >
        <b-button class="btn" @click="increase()"
          ><i class="fas fa-shopping-cart"></i>
          {{ $t("global.addToCart") }}
        </b-button>
      </div>
    </b-modal>
    <div class="alert-div">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="success"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        {{ $t("global.itemAdded") }}
        <nuxt-link :to="localePath('/cart')">{{
          $t("global.goToCart")
        }}</nuxt-link>
      </b-alert>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from "../../services/ServiceFactory";
const CategoryService = ServiceFactory.get("Category");
export default {
  name: "products",
  props: ["allProducts"],
  data: () => ({
    disabled: true,
    showDetails: false,
    product: {},
    categories: [],
    finalProducts: [],
    selectedAddons: [],
    dismissSecs: 5,
    dismissCountDown: 0,
    selecetdSize: {
      selectedAddons: [],
      type_id: {},
      comment: '',
    },
  }),
  computed: {
    productsTest() {
      if (this.categories.length > 0) {
        const all = [];
        this.categories.forEach((category) => {
          const test = this.allProducts.filter((product) => {
            if (product.main_category_id === category.id) {
              return true;
            }
          });
          if (test.length > 0) {
            all.push({ categoryName: category.name_translate, products: test });
          }
          this.allProducts.sort(function (a, b) {
            return a.name_translate.localeCompare(b.name_translate);
          });
          this.categories.sort((a, b) =>
            a.name_translate.localeCompare(b.name_translate)
          );
        });
        this.finalProducts = all;
      }
      console.log('this.finalProducts', this.finalProducts)
      return this.finalProducts;
    },
  },
  created() {
    this.fetchAllCategories();
  },
  methods: {
    resetType () {
      console.log('this.selecetdSize', this.selecetdSize)
      this.selecetdSize.quantity = 1
      if (this.selecetdSize.type_id) {
        this.selecetdSize.type_id.regularPieces = 0;
        this.selecetdSize.type_id.spicyPieces = 0;
      }
    },
    async fetchAllCategories() {
      this.dataLoading = true;
      const items = await CategoryService.getAllCategories();
      this.categories = items.categories;
      this.dataLoading = false;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    increasePieces (Pieces) {
      Pieces.type_id.pieces += 1;
    },
    decreasePieces (Pieces) {
      if (Pieces.type_id.pieces >= 2) {
        Pieces.type_id.pieces -= 1;
      }
    },
    increaseRegularPieces (Pieces) {
      console.log('Pieces', Pieces)
      Pieces.type_id.pieces = Pieces.quantity * Pieces.pieces
      if ((Pieces.type_id.regularPieces + Pieces.type_id.spicyPieces) < Pieces.type_id.pieces ) {
        Pieces.type_id.regularPieces += 1;
      }
    },
    decreaseRegularPieces (Pieces) {
      if (Pieces.type_id.regularPieces >= 2) {
        Pieces.type_id.regularPieces -= 1;
      }
    },
    increaseSpicyPieces (Pieces) {
      console.log('Pieces', Pieces)
      Pieces.type_id.pieces = Pieces.quantity * Pieces.pieces
      if ((Pieces.type_id.regularPieces + Pieces.type_id.spicyPieces) < Pieces.type_id.pieces) {
        Pieces.type_id.spicyPieces += 1;
      }
    },
    decreaseSpicyPieces (Pieces) {
      if (Pieces.type_id.spicyPieces >= 2) {
        Pieces.type_id.spicyPieces -= 1;
      }
    },
    increaseSelecetdSize(selecetdSize) {
      console.log('selecetdSize', selecetdSize)
      selecetdSize.quantity += 1;
      if (selecetdSize.type_id) {
        selecetdSize.type_id.pieces += 1;
      }
    },
    decreaseSelecetdSize(selecetdSize) {
      if (selecetdSize.quantity >= 2) {
        selecetdSize.quantity -= 1;
        if (selecetdSize.type_id) {
          selecetdSize.type_id.pieces -= 1;
            selecetdSize.type_id.spicyPieces = 0;
            selecetdSize.type_id.regularPieces = 0;
        }
      }
    },
    increase() {
      this.$store.commit("addItem", this.selecetdSize);
      this.dismissCountDown = this.dismissSecs;
      this.selecetdSize = {
        selectedAddons: [],
        type_id: {},
        comment: ''
      };
      this.showDetails = false;
    },
    decrease() {
      if (this.product.quantity >= 1) {
        this.$store.commit("decrease", this.selecetdSize);
      }
    },
    showProductDetails(productItem) {
      this.selecetdSize = {
        selectedAddons: [],
      }
      this.showDetails = true;
      this.product = {}
      this.product = productItem;
    },
    close() {
      this.selecetdSize.quantity = 1;
      this.showDetails = false;
    },
  },
};
</script>
