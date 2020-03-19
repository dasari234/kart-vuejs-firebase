<template>
  <div class="app-container">
    ADMIN
    <div class="row">
      <div class="col-2">
        <router-link to="/admin/addproduct" class="nav-link">Add Product</router-link>
      </div>
      <div class="col-5">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
const fb = require("../fireBaseConfig");
export default {
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
     // let users = [];
      await fb.usersCollection.get().then(querySnapshot => {
        // querySnapshot.docs.forEach(doc => {
        //   users.push({ id: doc.id, ...doc.data() });
        // });
        querySnapshot.docChanges().forEach(change => {
            if (change.type === "added") {
                console.log("New :", change.doc.data());
                //do what you want here!
                //function for rearranging or sorting etc.
            }
            if (change.type === "modified") {
                console.log("Modified : ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed : ", change.doc.data());
            }
        });
      });
      //console.log("USERS", users);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>