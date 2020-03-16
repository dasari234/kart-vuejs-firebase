<template>
  <div class="cardTemplate">
    <div class="card mb-4 shadow-sm">
      <!-- <img
        class="card-img-top mt-2"
        v-bind:src="item.productImage"
        alt="Card image cap"
        style="max-height: 700px; max-width: 127.135px;margin: auto"
      >-->
      <div class="card-body">
        <h6 class="card-text">{{item.name}}.</h6>
        <p class="card-text">{{item.description}}.</p>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted footerIcons">
            <button class="add-to-cart-button" v-on:click="addItemToCart(item)">
              <span>ADD TO CART</span>
            </button>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "cardTemplate",
  props: ["item"],
  data() {
    return {
      showModal: false
    };
  },
  components: {},
  computed: {},
  methods: {
    ...mapActions("shops", ["addToCart"]),
    addItemToCart(product) {
      this.addToCart(product);
    }
  }
};
</script>
<style lang='scss' scoped>
.add-to-cart-button {
  background: #30a0ee;
  border: 0;
  outline: 0;
  color: #fff;
  padding: 5px;
  font-size: 12px;
}
</style>