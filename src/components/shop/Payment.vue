<template>
  <div class="card-body">
    <card
      id="card-element"
      class="credit-card-inputs"
      :class="{ complete }"
      stripe="pk_test_FPGscyWoGiacTZDmekonKzFA00XUW16RZH"
      :options="stripeOptions"
      @change="complete = $event.complete"
    />

    <div class="continue-container">
      <button class="chekout-button" @click="pay()" :disabled="!complete">
        <span>CHECKOUT</span>
      </button>
    </div>
  </div>
</template>

<script>
import { stripeKey, stripeOptions } from "../../config/stripe-config.json";
const fb = require("../../fireBaseConfig");
import { Card, createToken } from "vue-stripe-elements-plus";

export default {
  name: "payment",
  components: { Card },
  props: ["total"],
  data: () => ({
    complete: false,
    stripeOptions: {
      hidePostalCode: true
    }
  }),
  methods: {
    pay() {
      createToken().then(data => {
        var stripeObject = {
          userId: localStorage.getItem("uid"),
          amount: this.total,
          source: data.token
        };
        this.saveDataToFireStore(stripeObject);
      });
    },
    saveDataToFireStore(stripeObject) {
      const pushId = fb.chargesCollection.doc().id;
      fb.chargesCollection.doc(pushId).set(stripeObject);
      fb.chargesCollection.doc(pushId).onSnapshot(snapShot => {
        const charge = snapShot.data();
        if (charge.error) {
          this.$toast.error(`${charge.error}.`);
          fb.chargesCollection.doc(pushId).delete();
          return;
        }
        if (charge.status && charge.status == "succeeded") {
          this.$toast.success("charged successfully.");
          this.$emit("continue-payment");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
}
.chekout-button {
  border-radius: 4px;
  background: #30a0ee;
  border: 0;
  outline: 0;
  color: #fff;
  padding: 8px 10px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
}
.credit-card-inputs {
  padding: 10px;
  border: 1px solid #ddd;
  width: 50%;
}
.continue-container {
  text-align: right;
  padding: 10px;
  border-top: 1px solid #dee2e6;
  margin-top: 30px;
}
</style>