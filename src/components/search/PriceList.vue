<template>
  <div>
    <div class="__price">₹{{adultPrice}}</div>
  </div>
</template>

<script>
export default {
  name: "pricelist",
  props: ["price"],
  computed: {
    adultPrice() {
      return this.price.ADULT.fC.TF.toFixed(0);
    }
  }
};
</script>

<style lang="scss" scoped>
.__price {
  font-size: 16px;
  font-weight: bold;
}
</style>