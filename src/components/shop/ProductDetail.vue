<template>
  <div class="app-container list">
    <card-loader :loopCount="1" v-if="isLoading" />
    <div v-cloak class="list_item" v-if="!isLoading">
      <h2>{{product.name}}</h2>
      <h4>{{product.description}}</h4>
      <h6>₹{{product.price}}</h6>
      <div class="d-flex justify-content-between align-items-center">
        <small class="footer-icons">
          <button class="add-to-cart-button" v-on:click="addItemToCart(product)">
            <svg
              class="cart-icon"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="_color"
                d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                fill="#fff"
              />
            </svg>
            <span>ADD TO CART</span>
          </button>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CardLoader from "@/components/shared/CardLoader";
const fb = require("../../fireBaseConfig");

export default {
  name: "productDetails",
  components: { CardLoader },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapGetters("shops", { product: "getProductDetails" })
  },
  created() {
    this.getDetails();
  },
  methods: {
    ...mapActions("shops", ["addToCart", "getProduct"]),
    async getDetails() {
      try {
        this.isLoading = true;
        await fb.productsCollection
          .doc(this.$route.params.id)
          .get()
          .then(querySnapshot => {
            const product = { id: querySnapshot.id, ...querySnapshot.data() };
            this.getProduct(product);
            this.isLoading = false;
          })
          .catch(function(error) {
            console.error("Error getting details: ", error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    addItemToCart(product) {
      this.addToCart(product);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: row;
  .list_item {
    display: flex;
    flex-direction: column;

    .footer-icons {
      margin-top: 10px;
      .add-to-cart-button {
        border-radius: 4px;
        background: #30a0ee;
        border: 0;
        outline: 0;
        color: #fff;
        padding: 8px 10px;
        font-size: 12px;
        &:hover {
          background: #0056b3;
        }
        svg {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>