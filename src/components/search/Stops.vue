<template>
  <div>
    <Duration :duration="stops.duration"></Duration>
    <div class="s__border"></div>
    <span class="s__stop" v-if="stops.stops == 0 || !stops.stops">Non stop</span>
    <span
      class="s__stop"
      v-else
      v-b-tooltip.html
      :title="viaStop"
      variant="outline-success"
    >{{viaCity}}</span>
  </div>
</template>

<script>
import Duration from "@/components/search/Duration";
export default {
  name: "stops",
  components: { Duration },
  props: ["stops"],
  computed: {
    viaStop() {
      if(this.stops.stops){ 
          return `${this.stops.so[0].cityCode}, ${this.stops.so[0].name}`;
      }else{
         return ''
      }
    },
    viaCity() {
      if(this.stops.stops){         
        return `${this.stops.stops} stop via ${this.stops.so[0].city.slice(0, 20 )}...`;
      }else{return ''}
    }
  }
};
</script>

<style lang="scss" scoped>
.s__stop {
  color: #008cff;
  font-size: 10px;
}
.s__border {
  border-top: 1px solid #979797;
  height: 1px;
}
</style>