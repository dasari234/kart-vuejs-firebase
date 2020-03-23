<template>
  <div id="app">
    <v-app>
      <Navigation :style="styleObject"></Navigation>
      <router-view />
    </v-app>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  components: { Navigation },
  data: () => ({
    scrollY: null,
    styleObject: null
  }),
  mounted() {
    window.addEventListener("scroll", () => {
      this.scrollY = Math.round(window.scrollY);
    });
  },
  watch: {
    scrollY() {
      if (this.scrollY > 0) {
        this.styleObject = {
          position: "fixed",
          width: "100%"
        };
      } else {
        this.styleObject = {
          position: "relative",
          width: "100%"
        };
      }
    }
  }
};
</script>
<style lang='scss'>
.theme--light.v-application {
  background: #e6ecf0 !important;
  color: rgba(0, 0, 0, 0.87);
}
</style>