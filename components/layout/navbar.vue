<template>
  <div class="navbar">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <nuxt-link to="/">Home</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/menu">Menu</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/search">Search</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/branches">Branchs</nuxt-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        <!--<b-nav-item class="radio">
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              id="btn-radios-1"
              v-model="selected"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="radios-btn-default"
              buttons
            ></b-form-radio-group>
          </b-form-group>
        </b-nav-item>-->
        <!-- <b-nav-item class="text-center">
          <nuxt-link to="#">
            <i class="fa fa-power-off"></i>
          </nuxt-link>
        </b-nav-item> -->
        <b-nav-item class="text-center">
          <nuxt-link to="/cart">
            <i class="fa fa-shopping-cart"><span class="qty" v-if="products > 0">{{products}}</span></i>
          </nuxt-link>
        </b-nav-item>
        <b-nav-item class="text-center">
          <nuxt-link to="/profile">
            <i class="fa fa-user"></i>
          </nuxt-link>
        </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: 'radio1',
      options: [
          { text: 'ar', value: 'ar' },
          { text: 'en', value: 'en' },
      ]
    }
  },
    computed: {
    products() {
      return this.$store.state.products.length;
    },
  },
}
</script>
