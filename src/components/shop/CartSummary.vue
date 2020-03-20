<template>
  <div class="cart app-container">
    <div v-cloak class="row">
      <div class="col-md-8">
        <div class="card mb-4 shadow-sm my-cart">
          <div class="title">Delivery Address</div>
            <Address/>
        </div>

        <div class="card mb-4 shadow-sm my-cart">
          <div class="title">Order Summary</div>
          <div class="card-body">
            <CartList></CartList>
          </div>
        </div>

        <div class="card mb-4 shadow-sm my-cart">
          <div class="title">Payment</div>
          <div class="card-body">
            <div>fdfdfd</div>
          </div>
        </div>
      </div>

      <div class="col-md-4" v-if="total > 0">
        <PriceDetails :total="total"></PriceDetails>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PriceDetails from "@/components/shop/PriceDetails";
import CartList from "@/components/shop/CartList";

import Address from "@/components/shared/Address";
const fb = require("../../fireBaseConfig");

export default {
  name: "cart",
  components: { PriceDetails, CartList, Address },
  computed: {
    ...mapGetters("shops", { total: "getTotal" })
  },
  methods: {
    ...mapActions("shops", ["removeFromCart"]),
    gotoProducts() {
      this.$router.push({
        name: "products"
      });
    },
    saveOrder(items) {
      let _orderObject = {
        placedOn: new Date(),
        userId: localStorage.getItem("uid"),
        status: "new",
        updatedOn: "",
        paymentStatus: "",
        order_items: items
      };
      fb.ordersCollection
        .add(_orderObject)
        .then(() => {
          this.$toast.success("Order placed successfully committed.");
        })
        .catch(error => {
          console.log("Transaction failed: ", error);
        });
      //  this.deleteItemsFromCart(_orderObject);
    },
    deleteItemsFromCart(_orderObject) {
      _orderObject.order_items.forEach(item => {
        console.log(item);
        this.removeFromCart(item);
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
  font-size: 14px;
  font-weight: bold;
  padding: 15px 15px;
  text-transform: uppercase;
}
.card-body {
  padding: 1.25rem 1.25rem 0px;
}
.my-cart {
  .card-body {
    padding: 0px 15px;
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