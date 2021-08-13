<template>
  <div id="dashboard" class="app-container">
    <!-- <section class="row">
      <div class="col1">
        <div class="profile">
          <h5>Hi {{userProfile.firstName}}, {{userProfile.role}}</h5>
        </div>
      </div>
    </section>-->
    <SearchForm></SearchForm>
  </div>
</template>

<script>

import SearchForm from "@/components/search/SearchForm";

export default {
  name: "dashboard",
  components: { SearchForm },
};
</script>

<style lang="scss" scoped>

</style>