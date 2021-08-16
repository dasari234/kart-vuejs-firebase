<template>
  <div>
    <p style="color:red; text-align:center" v-if="products.length == 0">Your checkout has no items.</p>
    <p v-if="products.length == 0"><router-link to="/products">Add few items to cart.</router-link></p>
    
    <table class="table is-striped" v-if="products.length>0">
      <thead class="thead-light">
        <tr>
          <td>Item Name</td>
          <td style="padding-left: 35px;">Quantity</td>
          <td>Price</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="index">
          <td>{{ item.name }}</td>
          <td>
            <div class="qty-container">
              <button
                class="icon minus"
                :disabled="item.quantity == 1"
                v-on:click="addItemToCart(item, true)"
              >&#45;</button>
              <div class="qty-input">
                <!-- <input
                          type="text"
                          v-model="item.quantity"
                          v-on:keyup="onQtyChange(item)"                          
                          onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                />-->
                {{item.quantity}}
              </div>
              <button class="icon plus" v-on:click="addItemToCart(item)">+</button>
            </div>
          </td>
          <td>₹{{ item.price }}</td>
          <td>
            <a href="javascript:void(0)" v-on:click="removeItemFromCart(item)">
              <i class="fas fa-trash-alt"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "cartList",
  computed: {
    ...mapGetters("shops", { products: "cartProducts", count: "cartCount" })
  },
  methods: {
    ...mapActions("shops", ["addToCart", "removeFromCart"]),
    addItemToCart(product, isMinus) {
      if (isMinus) {
        product.qtyType = "minus";
      }else{product.qtyType = "plus";}
      this.addToCart(product);
    },
    removeItemFromCart(item) {
      this.removeFromCart(item);
    },
    onQtyChange(item) {
      item.qtyType = "input";
      this.addToCart(item);
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

.icon {
  width: 28px;
  height: 28px;
  background: linear-gradient(#fff, #f9f9f9);
  display: inline-block;
  border: 1px solid #c2c2c2;
  cursor: pointer;
  font-size: 16px;
  border-radius: 50%;
  padding-top: 1px;
  line-height: 1;
  font-weight: bold;
  &:disabled {
    color: #c2c2c2;
    border-color: #e0e0e0;
    cursor: auto;
  }
  &:focus {
    outline: none;
  }
}
.qty-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  .qty-input {
    display: inline-block;
    padding: 1px;
    width: calc(100% - 60px);
    height: 100%;
    width: 46px;
    border-radius: 2px;
    background-color: #fff;
    border: 1px solid #c2c2c2;
    margin: 0 5px;
    text-align: center;
    input {
      border: none;
      width: 100%;
      font-size: 14px;
      font-weight: 500;
      vertical-align: middle;
      text-align: center;
    }
  }
}
.table {
  margin-bottom: 10px;
  border-bottom: 1px solid #dee2e6;
}
.fa-trash-alt {
  margin-top: 5px;
  font-size: 16px;
  color: #b5b3b3;
  &:hover {
    color: #0056b3;
  }
}
</style>
