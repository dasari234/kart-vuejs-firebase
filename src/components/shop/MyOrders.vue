<template>
  <div class="cart app-container">
    <card-loader :loopCount="1" v-if="isLoading" />
    <div v-cloak class="row" v-if="!isLoading">
      <div class="col-md-8">
        <div class="card mb-4 shadow-sm my-cart">
          <div class="title" v-if="orders.length > 0">My Orders ({{orders.length}})</div>
          <div class="card-body">
            <p v-if="!orders.length">
              <i>No orders yet! &nbsp;</i>
              <router-link to="/products">Go to Shopping</router-link>
            </p>
            <table class="table is-striped" v-for="(order, index) in orders" :key="index">
              <thead class="thead-light">
                <tr>
                  <td><b>Order ID:</b> {{order.orderId}}</td>
                  <td><b>Status:</b> {{order.status}}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="2">
                    <table class="table is-striped">
                      <thead class="thead-light">
                        <tr>
                          <td>Name</td>
                          <td>Quantity</td>
                          <td>Price</td>
                          <td>Total</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(o, index) in order.order_items" :key="index">
                          <td>{{ o.name }}</td>
                          <td>{{o.quantity}}</td>
                          <td>₹{{ o.price }}</td>
                          <td>₹{{o.quantity * o.price}}</td>
                          <td>
                            <!-- <a href="javascript:void(0)" v-on:click="removeItemFromCart(item)">
                            <b-icon-trash></b-icon-trash>
                            </a>-->
                          </td>
                        </tr>
                        <tr>
                            <td><b>Total</b></td>
                            <td colspan="3" style="text-align:right; padding-right: 80px;"><b>₹{{order.total}}</b></td>
                            <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-4" v-if="products.length > 0">
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
      </div>-->
    </div>
  </div>
</template>

<script>
import CardLoader from "@/components/shared/CardLoader";
const fb = require("../../fireBaseConfig");

export default {
  name: "cart",
  components: { CardLoader },
  data() {
    return {
      orders: [],
      isLoading: false
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      try {
        this.isLoading = true;
        await fb.ordersCollection.where('userId', '==',  localStorage.getItem('uid'))
          .get()
          .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
              const _total = doc.data().order_items.reduce((total, p) => {
                return total + p.price * p.quantity;
              }, 0);

              this.orders.push({ orderId: doc.id, total:_total, ...doc.data() });
            });
            this.isLoading = false;
          })
          .catch(function(error) {
            console.error("Error getting products: ", error);
            this.isLoading = false;
          });
      } catch (error) {
        this.isLoading = false;
        console.error("Error getting products: ", error);
      }
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
.cart{
  margin-left: 10px;
}
</style>