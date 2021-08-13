<template>
  <div class="flights__lists">
    <div class="flights__lists__item" v-for="(flight, index) in flights" :key="index">
      <FlightListItem :flight="flight"></FlightListItem>
    </div>
  </div>
</template>

<script>
import FlightListItem from "@/components/search/FlightListItem";
export default {
  name: "flightlist",
  components: { FlightListItem },
  props: ["flights"]
};
</script>

<style lang="scss" scoped>
.flights__lists__item {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 20px;
  &:hover {
    -webkit-box-shadow: 0 0 5px 0 rgba(52, 73, 94, 0.5);
    box-shadow: 0 0 5px 0 rgba(52, 73, 94, 0.5);
  }
}
</style>