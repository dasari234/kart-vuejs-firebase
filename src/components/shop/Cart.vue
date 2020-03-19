<template>
  <div class="cart app-container">
    <card-loader :loopCount="1" v-if="isLoading" />
    <div v-cloak class="row" v-if="!isLoading">
      <div class="col-md-8">
        <div class="card mb-4 shadow-sm my-cart">
          <div class="title" v-if="products.length > 0">My Cart ({{count}})</div>
          <div class="card-body">
            <p v-if="!products.length">
              <i>Your cart is empty! &nbsp;</i>
              <router-link to="/products">Go to Products</router-link>
            </p>
            <table class="table is-striped" v-if="products.length">
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
                      <b-icon-trash></b-icon-trash>
                    </a>
                  </td>
                </tr>
                <!-- <tr>
                  <td>
                    <b>Total:</b>
                  </td>
                  <td></td>
                  <td>
                    <b>₹{{ total }}</b>
                  </td>
                </tr>-->
                <tr>
                  <td>
                    <a
                      href="javascript:void(0)"
                      class="view-details-link"
                      v-on:click="gotoProducts()"
                    >
                      <span>Continue Shopping</span>
                    </a>
                  </td>
                  <td colspan="3" style="text-align:right">
                    <button class="chekout-button">
                      <span>CHECKOUT</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-4" v-if="products.length > 0">
        <div class="card mb-4 shadow-sm">
          <div class="price-details">PRICE DETAILS</div>
          <div class="card-body">
            <div class="price_list">
              <div class="price-title">Price ({{count}} items)</div>
              <div>₹{{total}}</div>
            </div>
            <div class="price_list">
              <div class="dot-border">
                <div class="price-title total">Total Payable</div>
                <div class="total">₹{{total}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CardLoader from "@/components/shared/CardLoader";
//const fb = require("../../fireBaseConfig");

export default {
  name: "cart",
  components: { CardLoader },
  data() {
    return {
      qty: "",
      isLoading: false
    };
  },
  computed: {
    ...mapGetters("shops", { products: "cartProducts", count: "cartCount" }),
    total() {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity;
      }, 0);
    }
  },
  methods: {
    ...mapActions("shops", ["addToCart", "removeFromCart"]),
    addItemToCart(product, isMinus) {
      if (isMinus) {
        product.qtyType = "minus";
      }
      this.addToCart(product);
    },
    removeItemFromCart(item) {
      this.removeFromCart(item);
    },
    gotoProducts() {
      this.$router.push({
        name: "products"
      });
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

.price-details {
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
  color: #878787;
  padding: 15px 15px;
  border-bottom: 1px solid #dee2e6;
}
.price_list {
  padding-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-content: space-between;
  flex-wrap: nowrap;
  .price-title {
    width: 90%;
  }
  .dot-border {
    padding: 15px 0 0px 0;
    width: 100%;
    border-top: 1px dashed #dee2e6;
    display: flex;
    flex-direction: row;
    .total {
      font-weight: bold;
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
  margin-bottom: 0rem;
}
.bi-trash {
  margin-top: 5px;
  font-size: 20px;
  color: rgb(22, 22, 22);
  &:hover {
    color: #0056b3;
  }
}
.view-details-link {
  text-decoration: none;
  &:hover {
    color: #0056b3;
  }
}
</style>