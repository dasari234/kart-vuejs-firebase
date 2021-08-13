<template>
  <div class="twidget-pas-class">
    <div class="twidget-pass-check" :class="{'twidget-pass-check-checked':isChecked}">
      <label>
        <input type="checkbox" v-model="className" value="business" v-on:click="onClassChecked($event)" />Business Class
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "class",
  data: () => ({
    className: []
  }),
  computed: {
    isChecked() {
      return this.className.length > 0 ? true : false;
    }
  },
  methods: {
    onClassChecked: function(e) {
      this.$emit("checkbox-value", e.target.checked ? 'business' : "economy");
    }
  }
};
</script>

<style lang="scss" scoped>
.twidget-pas-class {
  margin-top: 5px;
  border-top: 1px solid #e0e0e0;
}

.twidget-pas-class .twidget-pass-check {
  margin-top: 11px;
  padding-left: 5px;
}

.twidget-pas-class .twidget-pass-check input[type="checkbox"] {
  display: none;
}

.twidget-pas-class .twidget-pass-check label {
  line-height: 16px;
  cursor: pointer;
  position: relative;
  padding-left: 24px;
  display: inline-block;
  color: #424242;
  font-size: 14px;
}

.twidget-pas-class .twidget-pass-check label:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  border: 1px solid #00b1dd;
}

.twidget-pas-class .twidget-pass-check-checked label:before,
.twidget-pas-class
  .twidget-pass-check
  input[type="checkbox"]:checked
  + label:before {
  background: url("data:image/svg+xml;charset=utf-8,%3Csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8.5 6'%3E%3Cstyle%3E.st0{fill:%2300b9ff}%3C/style%3E%3Cpath class='st0' d='M8.5 1.1L7.4 0 3.6 3.8 1.1 1.3 0 2.4 3.6 6z'/%3E%3C/svg%3E")
    no-repeat 50% 50%;
  background-size: 12px;
}
</style>