<template>
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
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "priceDetails",
  props: ["total"],
  computed: {
    ...mapGetters("shops", { count: "cartCount" })
  }
};
</script>

<style lang="scss" scoped>
.card {
  .price-details {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    color: #878787;
    padding: 15px 15px;
    border-bottom: 1px solid #dee2e6;
  }
  .card-body {
    padding: 1.25rem 1.25rem 0px;
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
  }
}
</style>