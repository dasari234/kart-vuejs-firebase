<template>
  <div>
    <v-avatar color="indigo" size="40" style="margin-top:-4px">
      <div v-if="shortName">
        <img v-if="imageUrl"
        :src="imageUrl"
        style="width:40px">
        <span class="white--text headline" style="font-size: 1.2rem!important;" v-else>{{shortName}}</span>
        
      </div>

      <div class="dot-pulse" v-else></div>
    </v-avatar>
  </div>
</template>

<script>
const fb = require("../../fireBaseConfig");
import { mapActions } from "vuex";
export default {
  name: "avatar",
  data: () => ({
    showMenu: false,
    shortName: null,
    imageUrl:null
  }),
  created() {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        this.fetchUserProfile(user.uid);
        fb.usersCollection.doc(user.uid).onSnapshot(doc => {
          const fName = doc.data().firstName.charAt(0);
          const lName = doc.data().lastName.charAt(0);
          const shortName = fName.toUpperCase() + lName.toUpperCase();

          this.shortName = shortName;
          this.imageUrl = doc.data().imageUrl;
          this.setUserProfile(doc.data());
        });
      }
    });
  },
  methods: {
    ...mapActions("users", ["setUserProfile", "fetchUserProfile"])
  }
};
</script>