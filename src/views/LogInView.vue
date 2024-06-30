<template>
  <div class="">
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input 
          type="text" 
          class="form-control" 
          id="username" 
          v-model="form.username" 
          :class="{'is-invalid': errors.username}" 
        />
        <div v-if="errors.username" class="invalid-feedback">{{ errors.username }}</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input 
          type="password" 
          class="form-control" 
          id="password" 
          v-model="form.password" 
          :class="{'is-invalid': errors.password}" 
        />
        <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <button type="submit" class="btn btn-outline-light">Login</button>
    </form>
    <div v-if="loginMessage" class="alert mt-3" :class="{'alert-success': loginSuccess, 'alert-danger': !loginSuccess}">
      {{ loginMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      errors: {},
      loginMessage: '',
      loginSuccess: false
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.username) {
        this.errors.username = 'Korisničko ime je obavezno.';
      }

      if (!this.form.password) {
        this.errors.password = 'Lozinka je obavezna.';
      }

      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      if (this.validateForm()) {
        try {
          const response = await this.$store.dispatch("auth/login",{
            username: this.form.username,
            password: this.form.password
          });
          this.loginMessage = response.message;
          this.loginSuccess = response.success;
          if (response.success) {
            this.$router.push({ name: 'myprofile' });
          }
        } catch (error) {
          console.error(error);
          this.loginMessage = 'Došlo je do greške prilikom logovanja.';
          this.loginSuccess = false;
        }
      }
    }
  }
};
</script>

<style scoped>
h2{
    font-style: italic;
    font-weight: bold;
    color:#543310;
    margin-left:10px;
}
form{
  color:#74512D;
}
.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  display: block;
  color: #dc3545;
}

.alert {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
.btn-outline-light{
    border-color: #AF8F6F;
    color:#AF8F6F;
}
</style>
