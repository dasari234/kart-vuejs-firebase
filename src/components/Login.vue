<template>
  <section id="settings">
    <div class="col1">
      <div class="person-icon">
        <b-icon-person-fill></b-icon-person-fill>
      </div>
      <form @submit.prevent="login" class="d-flex flex-column">
        <label for="email1">Email</label>
        <input
          v-model.trim="loginForm.email"
          type="text"
          placeholder="you@email.com"
          id="email1"
          :class="{ 'is-invalid': submitted && $v.loginForm.email.$error }"
        />
        <div v-if="submitted && !$v.loginForm.email.required" class="invalid-feedback">
          <span v-if="!$v.loginForm.email.required">Email is required</span>
        </div>
        
        <label for="password1">Password</label>
        <input
          v-model.trim="loginForm.password"
          type="password"
          placeholder="******"
          id="password1"
          :class="{ 'is-invalid': submitted && $v.loginForm.password.$error }"
        />
        <div v-if="submitted && !$v.loginForm.password.required" class="invalid-feedback">
          <span v-if="!$v.loginForm.password.required">Password is required</span>
        </div>

        <button class="button" :disabled="isPerformingRequest">
          <span v-if="!isPerformingRequest">Log In</span>
          <div class="dot-pulse" v-if="isPerformingRequest"></div>
        </button>

        <div class="extras d-flex justify-content-between">
          <router-link to="resetpassword">Forgot Password?</router-link>
          <router-link to="signup">Create an Account</router-link>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
const fb = require("../fireBaseConfig");
import { mapActions } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      isPerformingRequest: false,
      submitted: false
    };
  },
  validations: {
    loginForm: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  created() {
    fb.auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // fb.auth.currentUser.getIdTokenResult().then(user => {
        // console.log(user)
         this.$router.push({path: '/'});
        //});
      }
    });
  },
  methods: {
    ...mapActions("users", ["fetchUserProfile", "setCurrentUser"]),
    async login() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        this.isPerformingRequest = true;
        const { user } = await fb.auth.signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        );
        this.isPerformingRequest = false;
        this.setCurrentUser(user);
        this.fetchUserProfile();
      } catch (error) {
        console.log(error);
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
#settings .col1 {
    max-width: 350px;
}
.person-icon svg{
  margin-top: -25px;
}
</style>