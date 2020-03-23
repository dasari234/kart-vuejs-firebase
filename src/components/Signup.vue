<template>
  <div id="settings">
    <section>
      <div class="col1">
        <!-- -->

        <v-form @submit.prevent="signup" ref="form" v-model="valid" :lazy-validation="lazy">
          <h1>Get Started</h1>
          <!-- -->
          <v-text-field
            v-model.trim="signupForm.firstName"
            :error-messages="firstNameErrors"
            label="First Name"
            required
            @input="$v.signupForm.firstName.$touch()"
            @blur="$v.signupForm.firstName.$touch()"
          ></v-text-field>

          <v-text-field
            v-model.trim="signupForm.lastName"
            :error-messages="lastNameErrors"
            label="Last Name"
            required
            @input="$v.signupForm.lastName.$touch()"
            @blur="$v.signupForm.lastName.$touch()"
          ></v-text-field>
          <!-- -->

          <v-text-field
            v-model.trim="signupForm.email"
            :error-messages="emailErrors"
            label="Email"
            required
            @input="$v.signupForm.email.$touch()"
            @blur="$v.signupForm.email.$touch()"
          ></v-text-field>

          <!-- -->

          <v-text-field
            type="password"
            v-model.trim="signupForm.password"
            :error-messages="passwordErrors"
            label="Password"
            required
            @input="$v.signupForm.password.$touch()"
            @blur="$v.signupForm.password.$touch()"
          ></v-text-field>

          <!-- -->
          <!-- <label for="confirmPassword">Confirm Password</label>
          <input
            v-model.trim="signupForm.confirmPassword"
            type="password"
            placeholder="min 6 characters"
            id="confirmPassword"
            :class="{ 'is-invalid': submitted && $v.signupForm.confirmPassword.$error }"
          />
          <div v-if="submitted && !$v.signupForm.confirmPassword.required" class="invalid-feedback">
            <span v-if="!$v.signupForm.confirmPassword.required">Password is required</span>
            <span
              v-if="!$v.signupForm.confirmPassword.minLength"
            >Password must be at least 6 characters</span>
          </div>-->
          <v-text-field
            type="password"
            v-model.trim="signupForm.confirmPassword"
            :error-messages="confirmPasswordErrors"
            label="Confirm Password"
            required
            @input="$v.signupForm.confirmPassword.$touch()"
            @blur="$v.signupForm.confirmPassword.$touch()"
          ></v-text-field>
          <!-- -->
          <button class="button" :disabled="isPerformingRequest">
            <span v-if="!isPerformingRequest">Sign Up</span>
            <div class="dot-pulse" v-if="isPerformingRequest"></div>
          </button>

          <div class="extras">
            <router-link to="login">Back to login</router-link>
          </div>
        </v-form>
      </div>
    </section>
  </div>
</template>

<script>
const fb = require("../fireBaseConfig");
import { mapActions } from "vuex";

import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {

  data() {
    return {
      lazy: false,
      valid: true,
      signupForm: {
        firstName: "",
        LastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      isPerformingRequest: false,
      submitted: false
    };
  },
  validations: {
    signupForm: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password"),
        minLength: minLength(6)
      }
    }
  },
  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.signupForm.firstName.$dirty) return errors;
      !this.$v.signupForm.firstName.required &&
        errors.push("First Name is required");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.signupForm.lastName.$dirty) return errors;
      !this.$v.signupForm.lastName.required &&
        errors.push("Last Name is required");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.signupForm.email.$dirty) return errors;
      !this.$v.signupForm.email.email && errors.push("Must be valid e-mail");
      !this.$v.signupForm.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.signupForm.password.$dirty) return errors;
      !this.$v.signupForm.password.required &&
        errors.push("Password is required");
      !this.$v.signupForm.password.minLength &&
        errors.push("Password must be at least 6 characters");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.signupForm.confirmPassword.$dirty) return errors;
      !this.$v.signupForm.confirmPassword.required &&
        errors.push("Password is required");
      !this.$v.signupForm.confirmPassword.minLength &&
        errors.push("Password must be at least 6 characters");
      !this.$v.signupForm.confirmPassword.sameAsPassword &&
        errors.push("Passwords must be identical");
      return errors;
    }
  },
  methods: {
    ...mapActions("users", ["fetchUserProfile", "setCurrentUser"]),
    async signup() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.isPerformingRequest = true;
      try {
        let { user } = await fb.auth.createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        );
        this.isPerformingRequest = false;
        this.setCurrentUser(user);
        //creste user collection
        this.createUser(user.uid);
      } catch (error) {
        console.log(error.message);
        this.isPerformingRequest = false;
        this.$notify({
          group: "notify",
          type: "error",
          title: "",
          text: `${error.message}`
        });
      }
    },
    async createUser(uid) {
      this.isPerformingRequest = true;
      try {
        await fb.usersCollection.doc(uid).set({
          firstName: this.signupForm.firstName,
          lastName: this.signupForm.lastName,
          role: "",
          address: []
        });
        this.performingRequest = false;
        this.$toast.success("User created successfully.");
        this.fetchUserProfile(uid);
        this.$router.push("/dashboard");
      } catch (error) {
        console.log(error);
        this.performingRequest = false;
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