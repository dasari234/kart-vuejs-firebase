<template>
  <div>
    <div class="col1">
      <!-- -->
      <form @submit.prevent="saveProduct">
        <h1>Add Product</h1>
        <!-- -->
        <label for="name">Product Name</label>
        <input
          v-model.trim="product.name"
          type="text"
          :class="{ 'is-invalid': submitted && $v.product.name.$error }"
        />
        <div v-if="submitted && !$v.product.name.required" class="invalid-feedback">
          <span v-if="!$v.product.name.required">Product name required</span>
        </div>
        <!-- -->
        <label for="title">Product Description</label>
        <textarea
          rows="4"
          cols="50"
          v-model.trim="product.description"
          type="text"
          :class="{ 'is-invalid': submitted && $v.product.description.$error }"
        ></textarea>
        <div v-if="submitted && !$v.product.description.required" class="invalid-feedback">
          <span v-if="!$v.product.description.required">Description is required</span>
        </div>
        <!-- -->
        <label for="email">Price</label>
        <input
          v-model.trim="product.price"
          type="text"
          onkeypress="return event.charCode >= 48 && event.charCode <= 57"
          :class="{ 'is-invalid': submitted && $v.product.price.$error }"
        />
        <div v-if="submitted && !$v.product.price.required" class="invalid-feedback">
          <span v-if="!$v.product.price.required">Price is required</span>
        </div>

        <!-- -->
        <button class="button">
          <span v-if="!isPerformingRequest">SAVE</span>
          <div class="dot-pulse" v-if="isPerformingRequest"></div>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
const fb = require("../../fireBaseConfig");
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      product: {
        name: "",
        description: "",
        price: ""
      },
      isPerformingRequest: false,
      submitted: false
    };
  },
  validations: {
    product: {
      name: { required },
      description: { required },
      price: { required, minLength: minLength(1) }
    }
  },
  methods: {
    async saveProduct() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        this.isPerformingRequest = true;
        await fb.productsCollection
          .add({
            createdOn: new Date(),
            name: this.product.name,
            description: this.product.description,
            price: this.product.price
          })
          .then(() => {
            this.isPerformingRequest = false;
            this.$toast.success('Product created successfully.');
          });
      } catch (error) {
        console.log(error.message);
        this.isPerformingRequest = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>