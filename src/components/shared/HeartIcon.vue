<template>
  <div class="heart">
    <div class="heart-icon">
      <i class="fas fa-heart"></i>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.heart {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #f0f0f0;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  background: #fff;
  i {
    color: #c2c2c2;
    font-size: 13px;
  }
  &:hover i {
    color: #ff4343;
  }
  .active i {
    color: #ff4343;
  }
  .heart-icon {
    position: relative;
    display: inline-flex;
  }
}
</style>