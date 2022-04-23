<template>
  <div class="branches-component">
    <div class="container">
      <h2 class="text-center header-section">
        {{ $t("branches.branches") }}
      </h2>
      <div v-if="data.length > 0" class="row details">
        <div v-for="(item, i) in data" :key="i" class="col-md-6">
          <GmapMap
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
          </GmapMap>
          <h3 class="m-1 text-left col-md-6 header-section">
            {{ item.name_translate }}
          </h3>
          <div class="phone text-left col-md-6">
            <i class="fas fa-phone-alt"></i>
            {{ item.phone }}
          </div>
          <!-- <div class="row workdays">
            <div class="col-md-4">
              {{$t('branches.workdays')}}
            </div>
            <div class="col-md-8">
              {{item.work_days}}
            </div>
          </div> -->
          <div class="card col-md-9 m-2">
            <div class="row Times">
              <div class="col-md-4">
                {{ $t("branches.timesofWork") }}
              </div>
              <div class="col-md-4">
                {{ item.time_from }}
              </div>
              <div class="col-md-4">
                {{ item.time_to }}
              </div>
            </div>
          </div>
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

      console.log("this.data", this.data);
      this.dataLoading = false;
    },
  },
};
</script>
