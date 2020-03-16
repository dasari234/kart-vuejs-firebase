<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>Hi {{userProfile.firstName}}, {{userProfile.role}}</h5>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("users", { userProfile: "getUserProfile" })
  }
};
</script>

<style scoped>
</style>