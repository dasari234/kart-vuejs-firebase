<template>
  <div>
    <section class="load loaded">
      <div class="wrapper">
        <div class="load__empty"></div>
        <div class="load__ok" :style="{'width': `${progress}%`}">
          <img src="../../assets/images/load__ok.png" alt="fly" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "preloader",
  data: () => ({
    progress: 0,
    completed: false,
    tempo: 0
  }),
  created: function() {
    this.timer(this.tempo);
  },
  methods: {
    timer: function(tempo) {
      let vm = this;
      let setIntervalRef = setInterval(function() {
        vm.progress++;
        if (vm.progress == 100) {
          clearInterval(setIntervalRef);
          vm.completed = true;
        }
      }, tempo);
    }
  }
};
</script>

<style lang="scss" scoped>
.load {
  padding: 30px 0;
  position: relative;
}

.load__empty {
  background: #fff;
}

.load__empty,
.load__ok {
  height: 5px;
  border-radius: 15px;
}

.load__ok {
  background: #44b4d8;
  width: 20px;
  position: absolute;
  z-index: 10;
  top: 0;
}

.load__ok img {
  position: absolute;
  right: -13px;
  top: -14px;
}

.load.loaded .load__ok {
  width: 1162px;
  transition-property: width;
  transition-duration: 10s;
}
</style>