<template>
  <div class="products">
    <div class="row">
      <div class="col-md-12">
        <card-loader :loopCount="3" v-if="loading" />
        <products-list :products_list="products" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardLoader from "@/components/shared/CardTemplate";
import ProductsList from "@/components/shop/ProductsList";
export default {
  name: "products",
  components: { CardLoader, ProductsList },
  data() {
    return {
      loading: false,
      products_list: [],
    };
  },
  computed: {
    ...mapState("shops", ["products"])
  }
};
</script>

<style lang="scss" scoped>
.products{
    margin: 25px;
}
</style>