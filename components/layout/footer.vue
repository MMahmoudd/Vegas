<template>
  <div id="footer">
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <div class="logo">
              <img src="../../assets/images/VegasLogo.svg" alt="logo">
              <div class="social">
                <i class="fab fa-facebook-square"></i>
                <i class="fab fa-instagram"></i>
                <i class="fab fa-twitter-square"></i>
                <i class="fab fa-youtube-square"></i>
              </div>
            </div>

          </div>
          <div class="col-md-3">
            <div class="my-account">
              <h4>My Account</h4>
              <p>
                <nuxt-link to="/profile">My account</nuxt-link>
              </p>
              <p>
                <nuxt-link to="/profile">Order History</nuxt-link>
              </p>
              <p>
                <nuxt-link to="/contactUs">Contact Us </nuxt-link>
              </p>
              <p>
                <nuxt-link to="/gallery">Gallery</nuxt-link>
              </p>
              <p>
                <nuxt-link to="/news">News</nuxt-link>
              </p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="my-account">
              <h4>Information</h4>
              <p v-for="i in pages" :key="i.id">
                <a @click="goToPage(i)">{{i.title}}</a>
              </p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="my-account">
              <h4>Newsletter</h4>
              <p>
                Subscribe to our newsletter and get10% off your first purchase.
              </p>
              <b-input
                type="email"
                placeholder="Email Address"
              ></b-input>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
</template>

<script>
import { ServiceFactory } from '../../services/ServiceFactory'
const Service = ServiceFactory.get('pages')
export default {
  name: 'footer',
  data: () => ({
    pages: [],
  }),
  created() {
    this.getPages()
  },
  methods: {
    async getPages() {
      const pages = await Service.getPages()
      if (pages.data.status === true) {
        this.pages = pages.data.pages
      }
    },
    goToPage(i) {
      this.$router.push('/pages/' + i.id)
    }
  }
}
</script>
