<template>
  <div class="products">
    <div class="row">
      <div class="col-md-4" v-for="(item, index) in products_list" :key="index">
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
</style>