<template>
  <div>
    <FlightList :flights="flights"></FlightList>
  </div>
</template>

<script>
import FlightList from "@/components/search/FlightList";
export default {
  name: "flights",
  components: { FlightList },
  props: ["flights"]
};
</script>

<style lang="scss" scoped>
</style>