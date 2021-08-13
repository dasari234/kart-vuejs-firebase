<template>
  <div class="__duration">
    <span v-html="time"></span>
  </div>
</template>

<script>
import * as moment from "moment/moment";
export default {
  name: "duration",
  props: ["duration"],
  computed: {
    time() {     
       const _d = moment.duration(this.duration, 'minutes');
      return `<b>${_d.hours()} </b> hrs <b>${_d.minutes()}</b>  mins`
    }
  }
};
</script>

<style lang="scss" scoped>
.__duration{
  text-align: center;
}
</style>