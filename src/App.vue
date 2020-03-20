<template>
  <div id="app">
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
.app-container{
    margin: 10px 20px;
}
</style>