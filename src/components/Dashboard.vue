<template>
  <div id="dashboard" class="app-container">
    <section class="row">
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

<style lang="scss" scoped>
.app-container{
  margin-left: 10px;
}
</style>