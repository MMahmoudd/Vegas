<template>
  <div class="wrapper">
    <navbarComponent />
    <div class="pages">
      <Nuxt />
    </div>
    <div>
      <!-- <a class="btn" target="_blank" rel="noopener noreferrer">
        {{ $t("global.visitLink") }}
      </a> -->
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
};
</script>
