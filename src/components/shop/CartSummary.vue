<template>
  <div class="cart app-container">
    <div v-cloak class="row">
      <div class="col-md-8">
        <div class="card mb-4 shadow-sm my-cart" :class="{'_active' :!isAddress}">
          <div class="_title">Delivery Address</div>
          <Address @continue-address="continueAddress()" v-if="isAddress"></Address>
        </div>

        <div class="card mb-4 shadow-sm my-cart" :class="{'_active' :isOrderActive}">
          <div class="_title">Order Summary</div>
          <div class="card-body" v-if="isOrder">
            <CartList></CartList>
            <div class="continue-container">
              <button class="chekout-button" v-on:click="continueOrdersummary()">
                <span>CONTINUE</span>
              </button>
            </div>
          </div>
        </div>

        <div class="card mb-4 shadow-sm my-cart" :class="{'_active' :isPaymentActive}">
          <div class="_title">Payment</div>
          <Payment :total="total" v-if="isPayment" @continue-payment="continuePayment"></Payment>
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
import Payment from "@/components/shop/Payment";
import Address from "@/components/shared/Address";
const fb = require("../../fireBaseConfig");

export default {
  name: "cart",
  components: { PriceDetails, CartList, Address, Payment },
  data: () => ({
    isAddress: true,
    isOrderActive: false,
    isPaymentActive: false,
    isOrder: false,
    isPayment: false
  }),
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
    },
    continueAddress() {
      console.log("Address Clicked!");
      this.isAddress = !this.isAddress;
      this.isOrder = !this.isOrder;
    },
    continueOrdersummary() {
      console.log("summury Clicked!");
      this.isOrder = !this.isOrder;
      this.isPayment = !this.isPayment;
      this.isOrderActive = true;
    },
    continuePayment() {
      console.log("payment Clicked!");
      this.isPayment = !this.isPayment;
      this.isPaymentActive = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.thead-light {
  background: #f8f9fa;
}
._active {
  ._title {
    background: #4fc08d;
  }
}
._title {
  font-size: 14px !important;
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

<style lang="scss" scoped>
.continue-container {
  text-align: right;
  margin-bottom: 10px;
}
.app-container {
  margin: 0px 10px;
}
</style>