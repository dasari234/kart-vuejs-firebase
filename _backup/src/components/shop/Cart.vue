<template>
  <div class="cart">
    <h1 class="title">Your Cart</h1>
    <div class="row">
      <div class="col-md-8">
        <div class="card mb-4 shadow-sm">
          <div class="card-body">
            <p v-if="!products.length">
              <i>Your cart is empty!</i> <router-link to="/products">Go shopping</router-link>
            </p>
            <table class="table is-striped" v-if="products.length">
              <thead class="thead-light">
                <tr>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Quantity</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in products" :key="index">
                  <td>{{ item.name }}</td>
                  <td>₹{{ item.price }}</td>
                  <td>{{ item.quantity }}</td>
                </tr>
                <tr>
                  <td>
                    <b>Total:</b>
                  </td>
                  <td></td>
                  <td>
                    <b>₹{{ total }}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("shops", { products: "cartProducts" }),
    total() {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity;
      }, 0);
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.cart{
    margin: 25px;
}
.thead-light{
    background: #f8f9fa;
}
</style>