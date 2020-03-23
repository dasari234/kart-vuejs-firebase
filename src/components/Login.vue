<template>
  <section id="settings">
    <div class="col1">
      <div class="person-icon">
        <i class="fas fa-user-circle"></i>
      </div>
      <v-form @submit.prevent="login" ref="form" v-model="valid" :lazy-validation="lazy">
        <v-text-field
          v-model.trim="loginForm.email"
          :error-messages="emailErrors"
          label="Email"
          required
          @input="$v.loginForm.email.$touch()"
          @blur="$v.loginForm.email.$touch()"
        ></v-text-field>

        <v-text-field
          type="password"
          v-model.trim="loginForm.password"
          :error-messages="passwordErrors"
          label="Password"
          required
          @input="$v.loginForm.password.$touch()"
          @blur="$v.loginForm.password.$touch()"
        ></v-text-field>

        <button class="button" :disabled="isPerformingRequest">
          <span v-if="!isPerformingRequest">Log In</span>
          <div class="dot-pulse" v-if="isPerformingRequest"></div>
        </button>

        <div class="extras d-flex flex-column justify-content-between">
          <router-link to="resetpassword">Forgot Password?</router-link>
          <router-link to="signup">Create an Account</router-link>
        </div>
      </v-form>
    </div>
  </section>
</template>

<script>
const fb = require("../fireBaseConfig");
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      lazy: false,
      valid: true,
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
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.loginForm.email.$dirty) return errors;
      !this.$v.loginForm.email.email && errors.push("Must be valid e-mail");
      !this.$v.loginForm.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.loginForm.password.$dirty) return errors;
      !this.$v.loginForm.password.required &&
        errors.push("Password is required");
      return errors;
    }
  },
  created() {
    fb.auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // fb.auth.currentUser.getIdTokenResult().then(user => {
        // console.log(user)
        this.$router.push({ path: "/" });
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
        this.fetchUserProfile(user.uid);
      } catch (error) {
        console.log(error);
        this.isPerformingRequest = false;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.fa-user-circle {
  font-size: 100px;
  color: #30a0ee;
}
.error--text {
  color: #ff5252 !important;
  caret-color: #ff5252 !important;
}
.theme--light.v-messages {
  color: #ff5252 !important;
}
.theme--light.v-label {
  color: #ff5252 !important;
}

.v-input > .v-input__control > .v-input__slot {
  border: 1px solid #e6ecf0;
  padding: 10px;
  border-radius: 3px;
}

#settings .col1 {
  max-width: 350px;
}
.person-icon svg {
  margin-top: -25px;
}
</style>