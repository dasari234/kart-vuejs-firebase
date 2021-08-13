<template>
  <div>
    <b-form-group>
      <b-form-radio-group
        id="radio-group-2"
        v-model="searchType"
        name="radio-sub-component"
        v-on:change="onSearchTypeChecked($event)"
      >
        <b-form-radio value="ONEWAY">ONEWAY</b-form-radio>
        <b-form-radio value="RETURN">ROUND TRIP</b-form-radio>
        <!-- <b-form-radio value="MULTICITY">MULTI CITY</b-form-radio> -->
      </b-form-radio-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "searchType",
  data: () => ({
    searchType: "ONEWAY"
  }),
  methods: {
    onSearchTypeChecked: function(e) {
      this.$emit("search-type-value", e );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>