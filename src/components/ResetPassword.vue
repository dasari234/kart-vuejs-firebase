<template>
  <div id="settings">
    <section>
      <div class="col1">
        <!-- -->
         <form @submit.prevent class="password-reset">
          <div v-if="!isPasswordResetSuccess">
            <h1>Reset Password</h1>
            <p>We will send you an email to reset your password</p>

            <label for="email3">Email</label>
            <input
              v-model.trim="passwordForm.email"
              type="text"
              placeholder="you@email.com"
              id="email3"
            
          :class="{ 'is-invalid': submitted && $v.passwordForm.email.$error }" />
         <div v-if="submitted && !$v.passwordForm.email.required" class="invalid-feedback">
           <span v-if="!$v.passwordForm.email.required">Email is required</span></div>


            <button @click="resetPassword" class="button">
                <span v-if="!isPerformingRequest">Submit</span>
                <div class="dot-pulse" v-if="isPerformingRequest"></div>
            </button>

            <div class="extras">
              <routerLink to="login">Back to login</routerLink>
            </div>
          </div>
          <div v-else>
            <h1>Email Sent</h1>
            <p>check your email for a link to reset your password</p>
            <routerLink to="login">Back to login</routerLink>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
const fb = require("../fireBaseConfig");
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {   
      passwordForm: {
        email: ""
      },
      isPasswordResetSuccess: false,
      isPerformingRequest: false,
      submitted: false
    };
  },
  validations: {
     passwordForm: {
        email: { required, email },
      },  
  },
  methods: {
    async resetPassword() {
        this.submitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
      this.isPerformingRequest = true;
      try {
        await fb.auth.sendPasswordResetEmail(this.passwordForm.email);
        this.isPerformingRequest = false;
        this.isPasswordResetSuccess = true;
        this.passwordForm.email = "";
        this.$toast.success('Reset password link sent successfully.');
      } catch (error) {
        console.log(error.message);
        this.isPerformingRequest = false;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
  .is-invalid {
      border-color: #dc3545;
  }
#settings .extras {
    margin-top: 25px;
}
</style>