<template>
  <div class="cart app-container">
    <div v-cloak class="row">
      <div class="col-md-3">
        <div class="card mb-3 shadow-sm">
          <div class="card-body"> 
            <h3>Hi {{userProfile.firstName}}</h3>
            <div>
              <router-link to="/myorders">
                  <i class="fas fa-bars"></i> My Orders
                </router-link>
            </div>
          </div>         
        </div>
      </div>
      <div class="col-md-5">
        <div class="card mb-4 shadow-sm">
           <div class="title">Update Profile</div>
          <div class="card-body">
            <v-form
              @submit.prevent="updateProfile"
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
            >
             
              <v-text-field
                v-model.trim="firstName"
                :error-messages="firstNameErrors"
                :placeholder="userProfile.firstName"
                label="First Name"
                required
                @input="$v.firstName.$touch()"
                @blur="$v.firstName.$touch()"
              ></v-text-field>

              <v-text-field
                v-model.trim="lastName"
                :error-messages="lastNameErrors"
                :placeholder="userProfile.lastName"
                label="Last Name"
                required
                @input="$v.lastName.$touch()"
                @blur="$v.lastName.$touch()"
              ></v-text-field>

              <v-text-field label="Profile Picture" @click="pickFile" v-model="imageName"></v-text-field>
              <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
              />
              <div>
                <img :src="userProfile.imageUrl" height="150" v-if="userProfile.imageUrl" />
              </div>

              <button class="button" :disabled="isPerformingRequest">
                <span v-if="!isPerformingRequest">Update Profile</span>
                <div class="dot-pulse" v-if="isPerformingRequest"></div>
              </button>
            </v-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const fb = require("../fireBaseConfig");
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  data: () => ({
    lazy: false,
    valid: true,
    firstName: "",
    lastName: "",
    imageName: "",
    imageUrl: "",
    imageFile: "",
    isPerformingRequest: false
  }),
  validations: {
    firstName: { required },
    lastName: { required }
  },
  computed: {
    ...mapGetters("users", { userProfile: "getUserProfile" }),
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("Last Name is required");
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("First Name is required");
      return errors;
    }
  },
  methods: {
    async updateProfile() {
      this.isPerformingRequest = true;
      let profile = {
        firstName:
          this.firstName !== "" ? this.firstName : this.userProfile.firstName,
        lastName:
          this.lastName !== "" ? this.lastName : this.userProfile.lastName,
        imageUrl: this.userProfile.imageUrl
      };
      try {
        await fb.usersCollection
          .doc(localStorage.getItem("uid"))
          .update(profile);
        this.isPerformingRequest = false;
        this.clear();
        this.$toast.success("Profile updated successfully.");
      } catch (error) {
        console.log(error);
      }
    },
    clear() {
      this.$v.$reset();
      this.firstName = "";
      this.lastName = "";
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.userProfile.imageUrl = fr.result;
          this.imageFile = files[0];
          this.uploadProfilePicture();
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.userProfile.imageUrl = "";
      }
    },
    uploadProfilePicture() {
      var mountainsRef = fb.storageRef.child(
        `profile-images/${this.imageName}`
      );

      mountainsRef.put(this.imageFile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadUrl => {
          this.userProfile.imageUrl = downloadUrl;
          fb.usersCollection
            .doc(localStorage.getItem("uid"))
            .update({ imageUrl: downloadUrl });
        });
      });
    }
  }
};
</script>
<style scoped>
  .app-container {
    margin: 0px 10px;
  }
  button{
    margin-top: 20px;
  }
  .title {
  font-size: 14px;
  font-weight: bold;
  padding: 15px 0px 0px 15px;
  text-transform: uppercase;
}
</style>
