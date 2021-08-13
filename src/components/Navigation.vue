<template>
  <header>
    <section>
      <div class="col1">
        <div class="logo">
          <router-link to="/">DASARI</router-link>
        </div>

        <ul class="inline">
          <li v-if="!currentUser">
            <router-link to="/login">
              <i class="fas fa-user-circle"></i>
            </router-link>
          </li>
          <li v-if="currentUser">
            <CartBadge :count="count"></CartBadge>
          </li>
          <li v-if="currentUser">
            <div class="dropdown">
              <AvatarIcon></AvatarIcon>
              <div class="dropdown-content">
                <router-link to="/profile">
                  <i class="fas fa-user-circle"></i> My Profile
                </router-link>
                <router-link to="/myorders">
                  <i class="fas fa-bars"></i> My Orders
                </router-link>
                <router-link v-if="userProfile.role=='admin'" to="/admin">
                  <i class="fas fa-user-cog"></i> Admin
                </router-link>
                <a href="javascript:void(0)" @click="logout">
                  <i class="fas fa-power-off"></i> Logout
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AvatarIcon from "@/components/shared/AvatarIcon";
import CartBadge from "@/components/shared/CartBadge";
const fb = require("../fireBaseConfig");

export default {
  name: "navigation",
  components: { AvatarIcon, CartBadge },
  computed: {
    ...mapGetters("users", {
      userProfile: "getUserProfile",
      currentUser: "getCurrentUser"
    }),
    ...mapGetters("shops", ["cartCount"]),
    count: {
      get() {
        return this.cartCount;
      },
      set(nCount) {
        return nCount;
      }
    }
  },
  created() {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        this.setCurrentUser(user);
        this.getCartItems();
      }
    });
  },
  methods: {
    ...mapActions("users", ["clearData", "setCurrentUser"]),
    ...mapActions("shops", ["clearCart", "updateCart"]),
    async logout() {
      try {
        await fb.auth.signOut().then(() => {
          this.$router.push("/login");
          this.clearData();
          this.clearCart();
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getCartItems() {
      try {
        const uid = localStorage.getItem("uid");
        const cart = [];
        await fb.cartsCollection
          .where("userId", "==", uid)
          .get()
          .then(docs => {
            docs.forEach(doc => {
              cart.push({ id: doc.id, ...doc.data() });
            });
            this.count = cart.length;
            this.updateCart(cart);
          })
          .catch(function(error) {
            console.error("Error getting cart: ", error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.inline {
  a {
       padding-top: 10px;
    text-decoration: none;
    i {
      font-size: 20px;
    }
  }
}
@keyframes bounceIn {
  0% {
    opacity: 1;
    transform: scale(0.3);
  }

  50% {
    opacity: 1;
    transform: scale(1.05);
  }

  70% {
    opacity: 1;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.logo {
  float: left;
  font-size: 26px;
  font-weight: bold;

  animation: bounceIn 0.6s;
  transform: rotate(0deg) scale(1) translateZ(0);
  transition: all 0.4s cubic-bezier(0.8, 1.8, 0.75, 0.75);
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }

  a {
    color: #3f6ad8;
    text-decoration: none;
  }
}
.dropdown {
  position: relative;
  display: inline-block;
  &:hover .dropdown-content {
    display: block;
  }

  .dropdown-content {
    top: 35px;
    display: none;
    position: absolute;
    right: 0;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      border-bottom: 1px solid #f0f0f0;
      text-align: left;
      font-size: 13px;
      i {
        color: #30a0ee;
        padding-right: 6px;
      }
      &:hover {
        background-color: #f1f1f1;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
