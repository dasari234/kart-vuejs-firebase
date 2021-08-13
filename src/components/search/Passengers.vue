<template>
  <div>
    <div class="twidget-cell twidget-age-name">
      <span>{{passenger}}</span>
    </div>
    <div class="twidget-cell twidget-age-select">
      <div class="twidget-dec" v-on:click="reducePassenger">-</div>
      <div class="twidget-num">{{quantity}}</div>
      <div class="twidget-inc" v-on:click="increasePassenger">+</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "passengers",
  props: ["passenger", "quantity"],
  methods: {
    increasePassenger() {
      let qty = this.quantity;
      this.$emit("quantity-value", qty+1);
    },
    reducePassenger() {
      if (this.quantity != 0) {
        let qty = this.quantity;
        this.$emit("quantity-value", qty-1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.twidget-passenger-form-wrapper .twidget-age-group {
  display: table;
  width: 100%;
}

.twidget-passenger-form-wrapper .twidget-age-group li {
  display: table-row;
}

.twidget-passenger-form-wrapper .twidget-age-group li .twidget-cell {
  display: table-cell;
  height: 44px;
  vertical-align: middle;
}

.twidget-passenger-form-wrapper .twidget-age-group li .twidget-age-name {
  padding-left: 5px;
  width: 45%;
}

.twidget-passenger-form-wrapper .twidget-age-group li .twidget-age-select {
  width: 30%;
}

.twidget-passenger-form-wrapper .twidget-age-select .twidget-dec {
  width: 35px;
  height: 35px;
  display: inline-block;
  text-indent: -9999px;
  cursor: pointer;
  border-radius: 25px;
  line-height: 35px;
  background: #fff 50% 50%/14px no-repeat;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512'%3E%3Cpath d='M491.318 235.318H20.682C9.26 235.318 0 244.578 0 256c0 11.423 9.26 20.682 20.682 20.682h470.636c11.423 0 20.682-9.259 20.682-20.682 0-11.422-9.259-20.682-20.682-20.682z' fill='%2300b1dd'/%3E%3C/svg%3E");
}

.twidget-passenger-form-wrapper .twidget-age-select .twidget-dec:hover {
  background-color: #e0e0e0;
}

.twidget-passenger-form-wrapper .twidget-age-select .twidget-num {
  width: 30%;
  text-align: center;
  line-height: 1.4;
  display: inline-block;
}

.twidget-passenger-form-wrapper .twidget-age-select .twidget-inc {
  width: 35px;
  height: 35px;
  display: inline-block;
  text-indent: -9999px;
  cursor: pointer;
  border-radius: 25px;
  line-height: 35px;
  background: #fff 50% 50%/14px no-repeat;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512'%3E%3Cpath d='M256 0c-11.422 0-20.682 9.26-20.682 20.682v470.636c0 11.423 9.26 20.682 20.682 20.682 11.423 0 20.682-9.259 20.682-20.682V20.682C276.682 9.26 267.423 0 256 0z' fill='%2300b1dd'/%3E%3Cpath d='M491.318 235.318H20.682C9.26 235.318 0 244.578 0 256c0 11.423 9.26 20.682 20.682 20.682h470.636c11.423 0 20.682-9.259 20.682-20.682 0-11.422-9.259-20.682-20.682-20.682z' fill='%2300b1dd'/%3E%3C/svg%3E");
}

.twidget-passenger-form-wrapper .twidget-age-select .twidget-inc:hover {
  background-color: #e0e0e0;
}
</style>