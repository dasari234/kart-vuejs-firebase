<template>
  <div class="heart" :class="{ 'active' : isWish}" v-on:click="saveWishList">
    <div class="heart-icon">
      <i class="fas fa-heart"></i>
    </div>
  </div>
</template>

<script>
const fb = require("../../fireBaseConfig");
export default {
  name: "whish",
  props: ["item"],
  data: () => ({
    isWish: false
  }),
  created() {
    this.getWhishList();
  },
  methods: {
    async getWhishList() {
      try {
        let query = fb.wishListCollection
          .where("userId", "==", localStorage.getItem("uid"))
          .where("pId", "==", this.item.id)
          .where("isWish", "==", true);
        await query.get().then(docs => {
          docs.forEach(doc => {
            this.isWish = doc.data().isWish;
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    async saveWishList() {
      this.isWish = !this.isWish;
      const wishList = {
        pId: this.item.id,
        userId: localStorage.getItem("uid"),
        isWish: this.isWish,
        item:this.item
      };
      try {
        const tempWishList = [];
        await fb.wishListCollection
          .where("userId", "==", localStorage.getItem("uid"))
          .get()
          .then(docs => {
            docs.forEach(doc => {
              tempWishList.push({ id: doc.id, ...doc.data() });
            });

            const findWishItem = tempWishList.find(p => p.pId === this.item.id);
            if (!findWishItem) {
              fb.wishListCollection.add(wishList).then(() => {
                this.$toast.success("Wish list added successfully.");
              });
            } else {
              fb.wishListCollection
                .where("pId", "==", this.item.id)
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    doc.ref.update({ isWish: this.isWish });
                  });
                });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.heart {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #f0f0f0;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  background: #fff;
  i {
    color: #c2c2c2;
    font-size: 13px;
  }
  &:hover i {
    color: #ff4343;
  }
  .heart-icon {
    position: relative;
    display: inline-flex;
  }
}
.heart.active i {
  color: #ff4343;
}
</style>