<template>
  <div class="card shadow-sm">
    <!-- <img
        class="card-img-top mt-2"
        v-bind:src="item.productImage"
        alt="Card image cap"
        style="max-height: 700px; max-width: 127.135px;margin: auto"
    >-->

    <div class="card-body">
      <HeartIcon :item="item"></HeartIcon>
      <h6 class="title" v-on:click="addItemToCart(item)">{{item.name}}</h6>
      <p class="description">{{item.description}}</p>
      <div class="d-flex justify-content-between align-items-center">
    
         <Likes :item="item"></Likes>
        <Unlikes :item="item"></Unlikes>
            <a
          href="javascript:void(0)"
          class="view-details-link"
          v-on:click="gotoProductDetails(item)"
        >View</a>
        <small class="footer-icons">
          <button class="add-to-cart-button" v-on:click="addItemToCart(item)">
            <svg
              class="cart-icon"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="_color"
                d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                fill="#fff"
              />
            </svg>
            <span>ADD TO CART</span>
          </button>
        </small>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const fb = require("../../fireBaseConfig");
import HeartIcon from "@/components/shared/HeartIcon";
import Likes from "@/components/shared/Likes";
import Unlikes from "@/components/shared/Unlikes";
export default {
  name: "cardTemplate",
  components: { HeartIcon, Likes, Unlikes },
  props: ["item"],
  methods: {
    ...mapActions("shops", ["addToCart"]),
    addItemToCart(product) {
      fb.auth.onAuthStateChanged(user => {
        if (!user) {
          this.$router.push({
            name: "login"
          });
        } else {
          this.addToCart(product);
        }
      });
    },
    gotoProductDetails(item) {
      this.$router.push({
        name: "productDetails",
        params: { id: item.id }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.card {
  cursor: pointer;
  .title {
    text-transform: capitalize;
  }
  &:hover {
    .title {
      color: #30a0ee;
    }
  }
  flex: 1 0 auto;
  .card-body {
    display: flex;
    flex-direction: column;
    padding: 10px;
    .view-details-link {
      text-decoration: none;
      &:hover {
        color: #0056b3;
      }
    }
    p {
      flex: 1 0 auto;
    }
    .footer-icons {
      .add-to-cart-button {
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
        svg {
          margin-right: 5px;
        }
      }
    }
    .social-icons {
      display: flex;
      flex-direction: row;
      .likes {
        margin-right: 10px;
      }
    }
  }
}
</style>