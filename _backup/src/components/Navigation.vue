<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="/">
          <h3>DASARI</h3>
        </router-link>
        <ul class="inline">
          <li>
            <router-link to="cart" class="nav-link">Cart ({{cartCount}})</router-link>
          </li>
          <li v-if="currentUser">
            <router-link to="dashboard" class="nav-link">Dashboard</router-link>
          </li>
          <li v-if="!currentUser">
            <router-link to="login" class="nav-link">Login</router-link>
          </li>
          <b-nav-item-dropdown right v-if="currentUser">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{userProfile.firstName}}</em>
            </template>

            <li>
              <router-link to="profile" class="dropdown-item nav-link">Profile</router-link>
            </li>
            <li v-if="userProfile.role=='admin'">
              <router-link to="admin" class="dropdown-item nav-link">Admin</router-link>
            </li>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
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
    ...mapGetters("shops", ["cartCount"])
  },
  created() {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        this.setCurrentUser(user);
        this.fetchUserProfile();
        fb.usersCollection.doc(user.uid).onSnapshot(doc => {
          this.setUserProfile(doc.data());
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
    async logout() {
      try {
        fb.auth.signOut();
        this.clearData();
        this.$router.push("/login");
      } catch (error) {
        this.$notify({
          group: "notify",
          type: "error",
          title: "",
          text: `${error.message}`
        });
      }
    }
  }
};
</script>

<style lang='scss'>
</style>
