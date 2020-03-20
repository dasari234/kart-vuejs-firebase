<template>
  <section id="settings">
    <div class="col1">
      <h3>Update profile ({{userProfile.firstName}}, {{userProfile.lastName}})</h3>
      <form @submit.prevent>
        <label for="name">First Nmae</label>
        <input v-model.trim="firstName" type="text" :placeholder="userProfile.firstName" />

        <label for="title">Last Name</label>
        <input v-model.trim="lastName" type="text" :placeholder="userProfile.lastName" />

        <button @click="updateProfile" class="button">
          <span v-if="!isPerformingRequest">Update Profile</span>
          <div class="dot-pulse" v-if="isPerformingRequest"></div>
        </button>
      </form>
    </div>
  </section>
</template>

<script>
const fb = require("../fireBaseConfig");
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      isPerformingRequest: false
    };
  },
  computed: {
    ...mapGetters("users", { userProfile: "getUserProfile" }),
  },
  methods: {
    async updateProfile() {
      this.isPerformingRequest = true;
      let profile = {
        firstName:
          this.firstName !== "" ? this.firstName : this.userProfile.firstName,
        lastName:
          this.lastName !== "" ? this.lastName : this.userProfile.lastName
      };
      try {
        await fb.usersCollection.doc(this.$store.state.users.currentUser.uid).update(profile);
        this.isPerformingRequest = false;
        this.firstName = "";
        this.lastName = "";
        this.$toast.success('Profile updated successfully.');
      } catch (error) {
      console.log(error)
      }
    }
  }
};
</script>
