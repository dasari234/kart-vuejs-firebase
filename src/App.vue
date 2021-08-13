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
.popover-header {
  width: 278px !important;
  .close-icon {
    float: right;
    font-size: 25px;
    margin-top: -4px;
    color: #888;
    cursor: pointer;
    &:hover {
      color: #444;
    }
  }
}
.popover-body {
  width: 280px !important;
}
.popover {
  max-width: 280px !important;
}
.v-application ol,
.v-application ul {
  padding-left: 0px !important;
}
.custom-control-label {
  padding-top: 7px;
  font-size: 12px;
}
fieldset.form-group {
  margin-bottom: 0.3rem !important;
}
.input-group {
  border: 1px solid #ddd;
}
.input-daterange.input-group {
  border: 0px;
}

.input-group > .form-control {
  padding: 0 37px 0 12px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  height: 49px !important;
  border-radius: 0px !important;
  border: 0px !important;
}
.vbt-autcomplete-list {
  padding-top: 0px !important;
}

.list-group-item.active {
  background-color: #017cfd !important;
  border-color: #017cfd !important;
}

.list-group-item:first-child {
  border-top-left-radius: 0rem !important;
  border-top-right-radius: 0rem !important;
}
.form-control:focus {
  border-color: none !important;
  outline: 0 !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.modal-footer {
  justify-content: center !important;
}
.v-application .title {
  font-size: 16px !important;
}
</style>