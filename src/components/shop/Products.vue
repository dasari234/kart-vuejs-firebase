<template>
  <div class="products app-container">
    <div class="row">
      <div class="col-md-12">
        <card-loader :loopCount="8" v-if="isLoading" />
        <products-list :products_list="products" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CardLoader from "@/components/shared/CardLoader";
import ProductsList from "@/components/shop/ProductsList";
const fb = require("../../fireBaseConfig");
export default {
  name: "products",
  components: { CardLoader, ProductsList },
  data() {
    return {
      isLoading: false,
      products_list: []
    };
  },
  computed: {
    ...mapGetters("shops", { products: "getAllProducts" })
  },
  created() {
    this.getAll();
  },
  methods: {
    ...mapActions("shops", ["getProducts"]),
    async getAll() {
      try {
        this.isLoading = true;
        const products = [];
        await fb.productsCollection
          .get()
          .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
              products.push({ id: doc.id, ...doc.data() });
            });
          })
          .catch(function(error) {
            console.error("Error getting products: ", error);
          });
        this.getProducts(products);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>