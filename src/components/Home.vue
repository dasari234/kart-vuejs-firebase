<template>
  <div class="app-container">
    <Products />
  </div>
</template>

<script>
import Products from "@/components/shop/Products";
const fb = require("../fireBaseConfig");
import { mapActions } from "vuex";
export default {
  name: "Home",
  components: { Products },  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
