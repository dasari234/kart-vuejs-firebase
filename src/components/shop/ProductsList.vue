<template>
  <div class="products">
    <div class="products__item" v-for="(item, index) in products_list" :key="index">
      <div class="products__content">
        <card-template :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import CardTemplate from "@/components/shared/CardTemplate";
export default {
  name: "productslist",
  props: ["products_list"],
  components: { CardTemplate }
};
</script>

<style lang="scss" scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  .products__item {
    display: flex;
    padding: 0.5em;
    width: 100%;
    .products__content {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
}

@media all and (min-width: 40em) {
  .products {
    .products__item {
      width: 50%;
    }
  }
}
@media all and (min-width: 60em) {
  .products {
    .products__item {
      width: 25%;
    }
  }
}
</style>