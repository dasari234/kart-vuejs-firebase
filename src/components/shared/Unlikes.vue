<template>
  <div class="likes" v-on:click="save">
    <div class="likes-icon">
      <i class="fas fa-thumbs-down"></i>
      {{count}}
    </div>
  </div>
</template>

<script>
const fb = require("../../fireBaseConfig");
export default {
  name: "unlikes",
  props: ["item"],
  data: () => ({
    count: null
  }),
  created() {
    this.get();
  },
  methods: {
    async get() {
      try {
        let query = fb.unLikesCollection.where("pId", "==", this.item.id);
        await query.get().then(docs => {
          this.count = docs.size ? docs.size : 0;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async save() {
      this.count = this.count + 1;
      const likes = {
        pId: this.item.id,
        userId: localStorage.getItem("uid"),
        likes: 1
      };
      try {
        await fb.unLikesCollection.add(likes).then(() => {
          this.$toast.success("You unliked this item.");
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.likes {
  font-size: 12px;
  cursor: pointer;
  color: #c2c2c2;
  i {
    transform: scaleX(-1);
    color: #c2c2c2;
    font-size: 13px;
  }
  &:hover i {
    color: #636363;
  }
}
</style>