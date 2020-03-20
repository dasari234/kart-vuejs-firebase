<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="/">
          <h3>DASARI</h3>
        </router-link>
        <ul class="inline">
          <li v-if="currentUser">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          </li>

          <li v-if="!currentUser">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <b-nav-item-dropdown right v-if="currentUser">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <span>{{userProfile.firstName}}</span>
            </template>
            <li>
              <router-link to="/profile" class="dropdown-item">Profile</router-link>
            </li>
            <li>
              <router-link to="/myorders" class="dropdown-item">Orders</router-link>
            </li>
            <li v-if="userProfile.role=='admin'">
              <router-link to="/admin" class="dropdown-item">Admin</router-link>
            </li>
            <li>
              <a href="javascript:void(0)" class="dropdown-item" @click="logout">Logout</a>
            </li>
          </b-nav-item-dropdown>
          <li>
            <router-link to="/cart" class="nav-link">
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
              Cart ({{cartCount}})
            </router-link>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const fb = require("../fireBaseConfig");

export default {
  computed: {
    ...mapGetters("users", {
      userProfile: "getUserProfile",
      currentUser: "getCurrentUser"
    }),
    ...mapGetters("shops", { cartCount: "cartCount" })
  },
  created() {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        this.setCurrentUser(user);
        this.fetchUserProfile();
        fb.usersCollection.doc(user.uid).onSnapshot(doc => {
          this.setUserProfile(doc.data());
          this.getCartItems();
        });
      }
    });
  },
  methods: {
    ...mapActions("users", [
      "clearData",
      "setUserProfile",
      "setCurrentUser",
      "fetchUserProfile"
    ]),
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
header section .col1 {
  padding: 0.6rem;
}
.cart-icon {
  margin-top: -4px;
  height: 16px;
  width: 16px;
  ._color {
    fill: #30a0ee;
  }
}

.inline a:hover,
.dropdown-toggle span:hover {
  color: #0056b3;
}
.dropdown-toggle span {
  text-transform: capitalize;
}

.dropdown {
   .dropdown-menu {
    li {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
