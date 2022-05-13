<template>
  <div class="branches-component">
    <div class="container">
      <h2 class="text-center header-section">
        {{ $t("branches.branches") }}
      </h2>
      <div v-if="data.length > 0" class="row details">
        <div v-for="(item, i) in data" :key="i" class="col-md-12">
          <!-- <GmapMap
            :center="{ lat: +item.lat, lng: +item.long }"
            :zoom="15"
            map-type-id="terrain"
            style="width: auto; height: 300px"
          >
            <GmapMarker
              :position="item.position"
              :clickable="false"
              :draggable="false"
              @click="center = position"
            />
          </GmapMap> -->

          <h3 class="header-section text-left">{{ item.name_translate }}</h3>
          <strong>
            <h4 class="d-flex justify-content-left">
              {{ item.address_translate }}
            </h4></strong
          >
          <div class="d-flex justify-content-center w-100">
            <div class="phone text-right col-md-6 m-1">
              <i class="fas fa-phone-alt m-1"></i>
              {{ item.phone }}
            </div>

            <a :href="item.google_location">
              <h4 class="header-section text-center">
                {{ $t("global.GoToMap") }}
                <img
                  class="m-1"
                  src="https://icon-library.com/images/ios-location-icon/ios-location-icon-6.jpg"
                  width="5%"
                />
              </h4>
            </a>

            <!-- href="https://www.google.com/maps/place/30%C2%B003'11.7%22N+31%C2%B012'20.5%22E/@30.05325,31.2035057,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xf5425a6e81d3486f!8m2!3d30.0532494!4d31.205683?hl=en" -->

            <!-- <div class="card row-md-4 align-self-start">
              <div class="col Times">
                <div class="col-md-12">
                  {{ $t("branches.timesofWork") }}
                </div>
                <div class="col-md-12">
                  {{ item.time_from }}
                </div>
                <div class="col-md-12">
                  {{ item.time_to }}
                </div>
              </div>
            </div> -->
          </div>
          <hr style="width: 100%" />
        </div>
      </div>
      <div v-else>
        <h4>{{ $t("branches.noBranchesYet") }}</h4>
      </div>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from "../../services/ServiceFactory";
const BranchesService = ServiceFactory.get("Branches");
export default {
  name: "Branches",
  data: () => ({
    data: [],
    position: { lat: 0, lng: 0 },
  }),
  created() {
    this.fetchAllItems();
  },
  methods: {
    async fetchAllItems() {
      this.dataLoading = true;
      const items = await BranchesService.getAllBranchess();
      this.data = items.branches;
      this.data.forEach((item) => {
        // this.position.lat = +item.lat;
        // this.position.lng = +item.long;
        item.position = { lat: +item.lat, lng: +item.long };
      });

      this.dataLoading = false;
    },
  },
};
</script>
