<template>
  <div class="cart app-container">
    <div v-cloak class="row">
      <div class="col-md-8">
        <div class="card mb-4 shadow-sm my-cart">
          <div class="title" v-if="count > 0">My Cart ({{count}})</div>
          <div class="card-body">
            <p v-if="count == 0">
              <i>Your cart is empty! &nbsp;</i>
              <router-link to="/products">Go to Products</router-link>
            </p>

            <CartList v-if="count > 0"></CartList>

            <div v-cloak class="footer-section d-flex justify-content-between" v-if="count > 0">
              <div>
                <button class="chekout-button" v-on:click="gotoProducts()">
                  <span>Continue Shopping</span>
                </button>
              </div>
              <div>
                <button class="chekout-button" v-on:click="gotoCheckout()">
                  <span>PLACE ORDER</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4" v-if="count > 0">
        <PriceDetails :total="total"></PriceDetails>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PriceDetails from "@/components/shop/PriceDetails";
import CartList from "@/components/shop/CartList";

export default {
  name: "cart",
  components: { PriceDetails, CartList },
  computed: {
    ...mapGetters("shops", { total: "getTotal", count: "cartCount" })
  },
  methods: {
    ...mapActions("shops", ["removeFromCart"]),
    gotoProducts() {
      this.$router.push({
        name: "products"
      });
    },
    gotoCheckout() {
      this.$router.push({
        name: "checkout"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.thead-light {
  background: #f8f9fa;
}
.title {
  font-size: 16px;
  font-weight: bold;
  padding: 15px 15px;
}
.card-body {
  padding: 1.25rem 1.25rem 0px;
}
.my-cart {
  .card-body {
    padding: 0px 0px;
    p {
      padding: 15px;
    }
  }
}

.chekout-button {
  margin-right: 10px;
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
}
.footer-section {
  border-top: 1px solid #dee2e6;
  padding: 15px 10px;
}
</style>