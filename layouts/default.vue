<template>
  <div class="wrapper">
    <navbarComponent />
    <div class="pages">
      <Nuxt />
    </div>
    <div class="justify-content-center">
      <a
        href="https://foodclub-eg.com/"
        target="_blank"
        rel="noopener noreferrer"
        style="position: fixed"
      >
        <img id="over" src="../assets/images/Foodclup.jpg" />
      </a>
    </div>
    <div class="justify-content-center">
      <a @click="scrollToTop" target="_blank" rel="noopener noreferrer">
        <img id="over1" src="../assets/images/ui.png" />
      </a>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import navbarComponent from "../components/layout/navbar.vue";
import FooterComponent from "../components/layout/footer.vue";
export default {
  components: {
    navbarComponent,
    FooterComponent,
  },
  data() {
    return {};
  },
  methods: {
    scrollToTop() {
      let currentScroll = document.documentElement.scrollTop,
        int = setInterval(frame);

      function frame() {
        if (0 > currentScroll) clearInterval(int);
        else {
          currentScroll = currentScroll - 100;
          document.documentElement.scrollTop = currentScroll;
        }
      }
    },
  },
};
</script>
