<template>
  <div id="settings">
    <section>
      <div class="col1">
        <!-- -->
        <form @submit.prevent>
          <h1>Get Started</h1>
            <!-- -->
          <label for="name">First Name</label>
          <input
            v-model.trim="signupForm.firstName"
            type="text"
            placeholder="First Name"
            id="firstName"
            :class="{ 'is-invalid': submitted && $v.signupForm.firstName.$error }"
          />
          <div v-if="submitted && !$v.signupForm.firstName.required" class="invalid-feedback">
            <span v-if="!$v.signupForm.firstName.required">First name is required</span>
          </div>
            <!-- -->
          <label for="title">Last Name</label>
          <input
            v-model.trim="signupForm.lastName"
            type="text"
            placeholder="Last Name"
            id="lastName"
            :class="{ 'is-invalid': submitted && $v.signupForm.lastName.$error }"
          />
          <div v-if="submitted && !$v.signupForm.lastName.required" class="invalid-feedback">
            <span v-if="!$v.signupForm.lastName.required">Last name is required</span>
          </div>
            <!-- -->
          <label for="email">Email</label>
          <input
            v-model.trim="signupForm.email"
            type="text"
            placeholder="you@email.com"
            id="email"
            :class="{ 'is-invalid': submitted && $v.signupForm.email.$error }"
          />
          <div v-if="submitted && !$v.signupForm.email.required" class="invalid-feedback">
            <span v-if="!$v.signupForm.email.required">Email is required</span>
            <span v-if="!$v.signupForm.email.email">Email is invalid</span>
          </div>
            <!-- -->
          <label for="password">Password</label>
          <input
            v-model.trim="signupForm.password"
            type="password"
            placeholder="min 6 characters"
            id="password"
            :class="{ 'is-invalid': submitted && $v.signupForm.password.$error }"
          />
          <div v-if="submitted && !$v.signupForm.password.required" class="invalid-feedback">
            <span v-if="!$v.signupForm.password.required">Password is required</span>
            <span v-if="!$v.signupForm.password.minLength">Password must be at least 6 characters</span>
          </div>


            <!-- -->
          <label for="confirmPassword">Confirm Password</label>
          <input
            v-model.trim="signupForm.confirmPassword"
            type="password"
            placeholder="min 6 characters"
            id="confirmPassword"
            :class="{ 'is-invalid': submitted && $v.signupForm.confirmPassword.$error }"
          />
          <div v-if="submitted && !$v.signupForm.confirmPassword.required" class="invalid-feedback">
            <span v-if="!$v.signupForm.confirmPassword.required">Password is required</span>
            <span v-if="!$v.signupForm.confirmPassword.minLength">Password must be at least 6 characters</span>
          </div>
            <!-- -->
          <button @click="signup" class="button">
            <span v-if="!isPerformingRequest">Sign Up</span>
            <div class="dot-pulse" v-if="isPerformingRequest"></div>
          </button>

          <div class="extras">
            <router-link to="login">Back to login</router-link>
          </div>
        </form>
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
      confirmPassword: { required, sameAsPassword: sameAs('password') }
    }
  },
  methods: {
    ...mapActions('users', ["fetchUserProfile", "setCurrentUser"]),
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
        this.$notify({ group: 'notify', type: 'error', title: '', text: `${error.message}`});
      }
    },
    async createUser(uid) {
      this.isPerformingRequest = true;
      try {
        await fb.usersCollection.doc(uid).set({
          firstName: this.signupForm.firstName,
          lastName: this.signupForm.lastName,
          role:''
        });
        this.performingRequest = false;
        this.$notify({ group: 'notify', type: 'success', title: '', text: 'User created successfully.' });
        this.fetchUserProfile();
        this.$router.push("/dashboard");
      } catch (error) {
        console.log(error);
        this.performingRequest = false;
        this.$notify({ group: 'notify', type: 'error', title: '', text: `${error.message}`});
      }
    }
  }
};
</script>
<style lang='scss' scoped>
    .is-invalid {
    border-color: #dc3545;
    }
</style>