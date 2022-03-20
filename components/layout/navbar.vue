<template>
  <div class="navbar">
    <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand :to="localePath('/')">
      <img src="../../assets/images/VegasLogo.svg" alt="logo">
    </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <nuxt-link :to="localePath('/')">{{$t('global.home')}}</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link :to="localePath('/menu')">{{$t('global.menu')}}</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link :to="localePath('/contactUs')">{{$t('global.contactUs')}}</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link :to="localePath('/branches')">{{$t('global.branches')}}</nuxt-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        <div class="radio">
          <b-form-group>
            <!-- <b-form-radio-group
              id="btn-radios-1"
              v-model="selected"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="radios-btn-default"
              buttons
              switch
              @change="value => handleChangeLanguage(value)"
            ></b-form-radio-group> -->
            <b-form-checkbox v-model="selected" switch size="lg" @change="value => handleChangeLanguage(value)">
              {{ !selected ? 'AR' : 'EN' }}
            </b-form-checkbox>
          </b-form-group>
        </div>
        <!-- <b-nav-item class="text-center">
          <nuxt-link to="#">
            <i class="fa fa-power-off"></i>
          </nuxt-link>
        </b-nav-item> -->
        <b-nav-item class="text-center">
          <nuxt-link :to="localePath('/search')">
            <i class="fa fa-search"></i>
          </nuxt-link>
        </b-nav-item>
        <b-nav-item class="text-center">
          <nuxt-link :to="localePath('/cart')">
            <i class="fa fa-shopping-cart"><span class="qty" v-if="products > 0">{{products}}</span></i>
          </nuxt-link>
        </b-nav-item>
        <b-nav-item class="text-center">
          <nuxt-link :to="localePath('/checkout')">
            <i class="fa fa-clipboard-check"></i>
          </nuxt-link>
        </b-nav-item>
        <b-nav-item class="text-center">
          <nuxt-link :to="localePath('/profile')">
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
      selected: false,
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
  created () {
      // if (this.$i18n.locale) {
      //   const userLang = this.$i18n.locale
      //   userLang === 'ar' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'ar'
      // }
      // console.log('this.$i18n.locale', this.$i18n.locale)
    },
  methods : {
    async handleChangeLanguage (value) {
      // console.log('this.$router', this.localePath)
      if (value === false) {
        // this.$cookies.set('i18n_redirected', 'en')
        // this.$router.push(this.$i18n.switchLocalePath(this.$route.fullPath, 'en'))
        await this.$i18n.setLocale('en')
        // document.location = (this.switchLocalePath('en'))

        // document.location = document.location
        // localStorage.setItem('lang', 'en')
        // this.$i18n.locale = 'en'
        // this.$router.push('/en')

      } else{
        // this.$cookies.set('i18n_redirected', 'xz')
        // this.$router.push(this.$i18n.switchLocalePath(this.$route.fullPath, 'ar'))

        await this.$i18n.setLocale('ar')
        // document.location = (this.switchLocalePath('ar'))
        // document.location = document.location
        // localStorage.setItem('lang', 'ar')
        // this.$i18n.locale = 'ar'
        // this.$router.push('/ar')

      }


    }
  }
}
</script>
