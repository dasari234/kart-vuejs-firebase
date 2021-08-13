<template>
  <div class="__fd">
    <div class="__logo">
      <img :src="flightLogo" width="50px" />
    </div>
    <div>
      <div class="f-name">{{flightName}}</div>
      <div class="f-number">{{fd.aI.code}}-{{fd.fN}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "flightdetails",
  props: ["fd"],
  computed: {
    flightName() {
      return `${this.fd.aI.name.slice(0, 8)}`;
    },
    flightLogo() {
      return `https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${this.fd.aI.code}.png?v=4`;
    }
  }
};
</script>

<style lang="scss" scoped>
.__fd {
  display: flex;
  flex-direction: row;
  .__logo {
    margin-right: 5px;
    height: 50px;
    width: 50px;
  }
}
.f-name {
  font-size: 18px;
  overflow: hidden;
}
.f-number {
  color: #878787;
  font-size: 12px;
}
</style>