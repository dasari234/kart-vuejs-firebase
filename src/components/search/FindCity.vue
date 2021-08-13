<template>
  <div>
    <vue-bootstrap-typeahead
      class="mb-4"
      v-model="query"
      :data="cities"
      :serializer="item => item.city"
      @hit="selectedCity($event)"
      placeholder="Select City"
    >
      <template slot="append">
        <div class="d-flex align-items-center" style="background: #fff; color:#999;padding: 10px;">{{iataCode}}</div>
      </template>

      <template slot="suggestion" slot-scope="{ data, htmlText }">
        <div class="d-flex align-items-center">
          <div style="width:89%">{{data.city}}</div>
          <div class="d-flex justify-content-between align-items-center" style="width:100%">
            <span class="ml-4" v-html="htmlText">{{data.name}}</span>
            <span class="ml-4">{{data.iataCode}}</span>
          </div>
        </div>
      </template>
    </vue-bootstrap-typeahead>
  </div>
</template>

<script>
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import json from "../../assets/airports-india.json";

export default {
  name: "findcity",
  components: { VueBootstrapTypeahead },
  data: () => ({
    query: "",
    cities: json,
    iataCode: null
  }),
  methods: {
    selectedCity(e) {
      this.iataCode = e.iataCode;
      this.$emit("airport-city-code", e.iataCode );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>