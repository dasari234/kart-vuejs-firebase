<template>
  <div class="__city">
   <span>{{ad.city}}</span>
     <!-- <br/>
    <span class="_airport-name">{{ad.name}}</span> -->
  </div>
</template>

<script>
export default {
  name: "airportdetails",
  props: ["ad"]
};
</script>

<style lang="scss" scoped>
.__city{
  color: #878787;
  font-size: 13px;
  text-align: center;
  ._airport-name{
    font-size: 10px;
  }
}
</style>