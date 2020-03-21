<template>
  <div class="card-body">
    <card-loader :loopCount="1" v-if="isLoading" />
    <div v-if="!isLoading">
      <div
        class="address-container d-flex flex-row justify-content-between align-items-center"
        v-for="(a, index) in address"
        :key="index"
      >
        <div class="radio-container d-flex">
          <input class="radioBox" type="radio" v-model="selectedAddress" v-bind:value="a" />
          <div class="radio-button"></div>
        </div>
        <div
          class="flex-grow-1"
        >{{a.name}}, {{a.areaName}}, {{a.street}}, {{a.city}}, {{a.pinCode}}, {{a.state}}</div>
      </div>

      <div class="continue-container">
        <button class="chekout-button" v-on:click="onContinueAddress()">
          <span>CONTINUE</span>
        </button>
      </div>

      <div v-cloak class="d-flex flex-wrap margin-b" v-if="isAddress">
        <div class="floating-label-wrap">
          <input
            type="text"
            class="floating-label-field"
            id="name"
            placeholder=" "
            v-model="addressForm.name"
          />
          <label for="name" class="floating-label">Name</label>
        </div>
        <div class="floating-label-wrap">
          <input
            type="text"
            class="floating-label-field"
            id="mobileNumber"
            placeholder=" "
            v-model="addressForm.mobileNumber"
          />
          <label for="mobileNumber" class="floating-label">Mobile Number</label>
        </div>

        <div class="floating-label-wrap">
          <input
            type="text"
            class="floating-label-field"
            id="pinCode"
            placeholder=" "
            v-model="address.pinCode"
          />
          <label for="pinCode" class="floating-label">Pin Code</label>
        </div>

        <div class="floating-label-wrap">
          <input
            type="text"
            class="floating-label-field"
            id="areaName"
            placeholder=" "
            v-model="addressForm.areaName"
          />
          <label for="areaName" class="floating-label">Area Name</label>
        </div>

        <div class="floating-label-wrap street">
          <textarea
            type="text"
            class="floating-label-field"
            id="street"
            placeholder=" "
            rows="3"
            v-model="addressForm.street"
          ></textarea>
          <label for="street" class="floating-label">House# street and landmark</label>
        </div>

        <div class="floating-label-wrap">
          <input
            type="text"
            class="floating-label-field"
            id="city"
            placeholder=" "
            v-model="addressForm.city"
          />
          <label for="city" class="floating-label">City</label>
        </div>
        <div class="floating-label-wrap">
          <input
            type="text"
            class="floating-label-field"
            id="state"
            placeholder=" "
            v-model="addressForm.state"
          />
          <label for="state" class="floating-label">State</label>
        </div>

        <div class="button-layout">
          <button class="chekout-button" v-on:click="saveAddress()">
            <span>SAVE AND CONTINUE</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const fb = require("../../fireBaseConfig");
import CardLoader from "@/components/shared/CardLoader";
export default {
  name: "addressPage",
  components: { CardLoader },
  data() {
    return {
      addressForm: {
        name: "",
        mobileNumber: "",
        pinCode: "",
        areaName: "",
        street: "",
        city: "",
        state: ""
      },
      address: [],
      isLoading: false,
      selectedAddress: null
    };
  },
  created() {
    this.getAddress();
  },
  computed: {
    isAddress() {
      return this.address.length > 0 ? false : true;
    }
  },
  methods: {
    async getAddress() {
      this.isLoading = true;
      try {
        await fb.usersCollection
          .doc(localStorage.getItem("uid"))
          .collection("address")
          .get()
          .then(docs => {
            docs.forEach(doc => {
              this.address.push({ id: doc.id, ...doc.data() });
            });
          });

        this.isLoading = false;
        this.selectedAddress = this.address[0];

        console.log(this.selectedAddress);
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    async saveAddress() {
      try {
        await fb.usersCollection
          .doc(localStorage.getItem("uid"))
          .collection("address")
          .add(this.address)
          .then(() => {
            this.$toast.success("Delivery  address added successfully.");
          });
      } catch (error) {
        console.log(error);
      }
    },
    onContinueAddress() {
      this.$emit("continue-address");
    }
  }
};
</script>

<style lang="scss" scoped>
.card-body {
  .button-layout {
    width: 600px;
    margin-top: 10px;
  }
  .chekout-button {
    margin-right: 10px;
    border-radius: 4px;
    background: #30a0ee;
    border: 0;
    outline: 0;
    color: #fff;
    padding: 8px 10px;
    font-size: 12px;
    &:hover {
      background: #0056b3;
    }
  }
  .margin-b {
    margin-bottom: 20px;
  }

  .floating-label-wrap.street {
    width: 600px;
    textarea {
      height: 100px;
    }
  }
  .floating-label-wrap {
    width: 280px;
    margin: 5px 40px 5px 0px;
  }
  .address-container {
    margin-bottom: 10px;
    padding: 5px;
    background: #f7f7f7;
  }
  .radio-container {
    margin-right: 10px;
    .radioBox {
      visibility: hidden;
      position: absolute;
    }
    .radioBox:checked ~ .radio-button {
      border-color: #2874f0;
    }
    .radioBox:checked ~ .radio-button:before {
      border: 2px hidden;
      background-color: #2874f0;
    }
    .radio-button {
      display: inline-block;
      border: 2px solid #979797;
      border-radius: 100%;
      height: 16px;
      width: 16px;
      position: relative;
      vertical-align: top;
      margin-top: 3px;
      cursor: pointer;
    }
    .radio-button:before {
      content: "";
      border-radius: 100%;
      height: 8px;
      width: 8px;
      margin: auto;
      position: absolute;
      top: 2px;
      left: 2px;
    }
  }
}
</style>