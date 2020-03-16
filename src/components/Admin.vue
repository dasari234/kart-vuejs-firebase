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
export default {};
</script>

<style lang="scss" scoped>
</style>