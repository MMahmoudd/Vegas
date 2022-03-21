<template>
    <div class="cart-component checkout-component">
      <div v-if="Products.length > 0">
        <div class="deliveryMethod">
            <div class="container" v-if="UserData.length > 0">
            <div class="row">
              <div class="col-md-4" v-for="i in UserData" :key="i.id">
                    <div class="address">
                        <b-form-group v-slot="{ ariaDescribedby }">
                            <b-form-radio v-model="selectedAddress" :aria-describedby="ariaDescribedby" name="some-radios" :value="i">{{i.name_translate}}</b-form-radio>
                        </b-form-group>
                    </div>
                </div>
            </div>
            <div class="actions my-4">
                <b-button class="success" @click="addNewAddress()">{{$t('checkout.chooseNewLocation')}}</b-button>
            </div>
            </div>
            <div class="container my-4 actions" v-else>
                <b-button class="success" @click="addNewAddress()">{{$t('checkout.addNewAddress')}}</b-button>
            </div>
        </div>
        <div class="container products">
            <div class="row">
                <div class="cart-item" v-for="(item) in Products" :key="item.id">
                    <div class="cart-image">
                        <img :src="item.cartable.image" alt="product-image">
                    </div>
                    <div class="cart-details row">
                        <p class="font-weight-bold text-left col-sm-3">
                            {{ item.cartable.name_translate }}
                        </p>
                        <p class="font-weight-bold text-left main-color col-sm-2">{{ item.cartable.price }} LE</p>
                        <div class="quantity text-left col-sm-3">
                            <span class="font-weight-bold mx-2">{{item.qty}}</span>
                        </div>
                        <p class="font-weight-bold col-sm-2 text-right">
                            {{ item.total_price }} LE</p>
                    </div>
                    <b-button class="delete" @click="deleteProductFromCart(item)">
                    x
                  </b-button>
                </div>

                <!-- coupon -->
                <coupon @change="(value) => {this.coupon = value.coupon; this.discount_amount = value.discount_amount}" />

                <div class="tatal-details d-flex justify-content-between">
                    <div class="back">
                        <nuxt-link :to="localePath('/')"><i class="fas fa-arrow-left"></i> {{$t('cart.backToShop')}}</nuxt-link>
                    </div>
                    <b-button class="delete" @click="resetCart()">
                      {{$t('checkout.deleteAllCartData')}}
                    </b-button>
                    <div class="total">
                        <p class="font-weight-bold mr-3" v-if="discount_amount > 0">
                          <span class="header-section">{{$t('checkout.discount')}}:</span> - {{ discount_amount }} L.E
                        </p>
                        <div v-if="selectedAddress.id">
                        <p class="font-weight-bold mr-3" >
                          <span class="header-section">{{$t('checkout.delivery')}}:</span>
                          {{ selectedAddress.price }} L.E
                        </p>
                        <p class="font-weight-bold mr-3">
                          <span class="header-section">{{$t('checkout.subtotal')}}:</span>
                          {{ total + selectedAddress.price - discount_amount }} L.E
                        </p>
                        </div>
                        <p v-else class="font-weight-bold mr-3" >
                          <span class="header-section">{{$t('checkout.subtotal')}}:</span> {{ finalTotal }}  L.E
                        </p>
                    </div>
                </div>
                <div class="shop">
                    <b-button @click="createOrder()" class="btn">
                        {{$t('checkout.checkout')}}
                    </b-button>
                </div>
            </div>
        </div>
      </div>
      <div v-else>
        <h3 class="header-section">
          {{$t('checkout.noOrdersYet')}} <nuxt-link :to="localePath('/')">{{$t('checkout.backToProducts')}}</nuxt-link>
        </h3>
      </div>
        <div class="mt-5">
            <b-alert v-if="ErrorMessage" show class="text-center alert" dismissible variant="danger">
                {{ ErrorMessage }}
            </b-alert>
            <b-alert v-if="SuccessMessage" show class="text-center alert" dismissible variant="success">
                {{ SuccessMessage }}
            </b-alert>
        </div>
        <b-modal
        v-model="addLocation"
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
        <h2 class="text-center header-section">{{$t('checkout.addNewAddress')}}</h2>
          <div class="row">
            <div class="col-md-6">
            <label>{{$t('checkout.selectGovernrate')}}</label>
              <b-form-select
                v-model="locationData.governrate_id"
                :options="governrate"
                class="mb-3"
                value-field="id"
                text-field="name_translate"
                @input="getAreas(locationData.governrate_id)"
              ></b-form-select>
            </div>
            <div class="col-md-6">
            <label>{{$t('checkout.selectArea')}}</label>
              <b-form-select
                v-model="locationData.area_id"
                :options="area"
                class="mb-3"
                value-field="id"
                text-field="name_translate"
              ></b-form-select>
            </div>
            <div class="col-md-6">
            <label>{{$t('checkout.steetAddress')}}</label>
              <b-input
                v-model="locationData.street_address"
                type="text"
                class="mb-3"
              ></b-input>
            </div>
            <div class="col-md-6">
            <label>{{$t('checkout.phone')}}</label>
              <b-input
                v-model="locationData.phone"
                type="tel"
                class="mb-3"
              ></b-input>
            </div>
            <div class="actions text-center m-auto">
                    <b-button @click="createNewAddress()" class="btn">
                        {{$t('checkout.createAddress')}}
                    </b-button>
                </div>
          </div>
      </b-modal>
    </div>
</template>

<script>
import { ServiceFactory } from '../../services/ServiceFactory'
import coupon from './coupon.vue'
const Service = ServiceFactory.get('Cart')
const profileService = ServiceFactory.get('profile')
const ordersService = ServiceFactory.get('orders')


export default {
  components: { coupon },
    name: 'products',
    data: () => ({
        product: {},
        Products: [],
        UserData: [],
        selectedAddress: {},
        ErrorMessage: '',
        SuccessMessage: '',
        showDetails: false,
        addLocation: false,
        locationData: {
          governrate_id: 0,
          area_id: 0,
          street_address: '',
          phone: '',
        },
        governrate: [],
        area: [],
        product: {},
        payment_type: 'cash',
        coupon: '',
        discount_amount: 0,
    }),
    created() {
        this.getCart()
    },
    computed: {
        total() {
          return this.Products.reduce((p, item) => p + +item.total_price, 0) || 0
        },

        finalTotal () {
          //  * (this.total + (this.selectedAddress.price || 0))
          // TODO : don't calc the address price. do the discount on total only
          if (this.selectedAddress.price) {
            return (this.total + (this.selectedAddress.price || 0)) - (this.discount_amount )
          } else {
            return (this.total + 0) - (this.discount_amount )
            //  * (this.total + 0)
          }

        }
    },
    methods: {
        async addNewAddress () {
          this.getGovernrates()
          this.addLocation = true
        },
        async getGovernrates() {
            const Governrates = await profileService.getGovernrate()
            // if (getGovernrate.status === true) {
                this.governrate = Governrates.governrates
            // } else {
            //     this.ErrorMessage = 'Something Error'
            //     // this.ErrorMessage = getGovernrate.message[0]
            //     setTimeout(() => {
            //         this.ErrorMessage = ''
            //       }, 1500)
            // }
        },
        async getAreas (id) {
              const areas = await profileService.getAreas(id)
            if (areas.status === true) {
                this.area = areas.areas
            // } else {
            //     this.ErrorMessage = 'Something Error'
            //     // this.ErrorMessage = getGovernrate.message[0]
            //     setTimeout(() => {
            //         this.ErrorMessage = ''
            //       }, 1500)
            }
        },
        async getCart() {
            const getCart = await Service.getCart()
            if (getCart.status === true) {
                this.Products = getCart.data
                this.getAddress()
            } else {
                this.ErrorMessage = getCart.message[0]
                setTimeout(() => {
                    this.ErrorMessage = ''
                  }, 1500)
            }
        },
        async getAddress() {
            const UserData = await profileService.getUserAddress()
            console.log('UserData', UserData)
            if (UserData.status === true) {
                this.UserData = UserData.data
            } else {
                this.ErrorMessage = UserData.message[0]
            }
        },
        async createOrder() {
            if (this.selectedAddress) {

              const data = {
                address_id : this.selectedAddress.id,
                payment_type : this.payment_type,
                // TODO : Not Applied by backend
                code: this.coupon
              }

                const createOrder = await ordersService.sendOrderData(data)

                if (createOrder.data.status === true) {
                  this.$store.commit("resetCart");
                  this.SuccessMessage = 'The Order is Created Successfully'
                  setTimeout(() => {
                    this.SuccessMessage = ''
                    this.$router.push(this.localePath('/profile'))
                  }, 1500)
                  // this.SuccessMessage = createOrder.data.message
                } else {
                  this.ErrorMessage = createOrder.message[0]
                }
            } else {
                this.ErrorMessage = 'please choose address'
            }
        },
        async createNewAddress() {
                const createAddress = await profileService.addAddress(this.locationData)
                if (createAddress.status === true) {
                  this.getCart()
                  // this.getAddress()
                  this.addLocation = false
                  this.SuccessMessage = 'The address is Created Successfully'
                  setTimeout(() => {
                    this.SuccessMessage = ''

                  }, 1500)
                } else {
                  this.ErrorMessage = createAddress.message[0]
                  setTimeout(() => {
                    this.ErrorMessage = ''
                  }, 1500)
                }
        },
        async deleteProductFromCart (item) {
          const remove = await Service.deleteProductFromCart(item.id)
          if (remove.data.status === true) {
            const index = this.Products.indexOf(item);
            if (index > -1) {
                this.Products.splice(index, 1);
            }
            this.getCart()
          }
        },
        async resetCart() {
          const reset = await Service.resetCart()
          if (reset.data.status === true) {
            this.$store.commit("resetCart");
            this.$router.push(this.localePath('/'))
          }
        }
    },

}
</script>
9
