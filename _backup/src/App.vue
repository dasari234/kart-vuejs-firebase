<template>
  <div id="app">
    <notifications
      group="notify"
      position="top center"
      animation-type="velocity"
    />
    <Navigation></Navigation>
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  components: { Navigation }, 
};
</script>
<style lang='scss'>
</style>