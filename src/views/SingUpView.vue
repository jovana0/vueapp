<template>
  <div class="">
    <h2>Sign up</h2>
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
        <label for="email" class="form-label">Email</label>
        <input 
          type="email" 
          class="form-control" 
          id="email" 
          v-model="form.email" 
          :class="{'is-invalid': errors.email}" 
        />
        <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
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
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm password</label>
        <input 
          type="password" 
          class="form-control" 
          id="confirmPassword" 
          v-model="form.confirmPassword" 
          :class="{'is-invalid': errors.confirmPassword}" 
        />
        <div v-if="errors.confirmPassword" class="invalid-feedback">{{ errors.confirmPassword }}</div>
      </div>
      <button type="submit" class="btn btn-outline-light">Sign up</button>
    </form>
    <div v-if="registerMessage" class="alert mt-3" :class="{'alert-success': registerSuccess, 'alert-danger': !registerSuccess}">
      {{ registerMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: {},
      registerMessage: '',
      registerSuccess: false
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.username) {
        this.errors.username = 'Korisničko ime je obavezno.';
      }

      if (!this.form.email) {
        this.errors.email = 'Email je obavezan.';
      } else if (!this.validEmail(this.form.email)) {
        this.errors.email = 'Email nije validan.';
      }

      if (!this.form.password) {
        this.errors.password = 'Lozinka je obavezna.';
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Lozinka mora imati najmanje 6 karaktera.';
      }

      if (!this.form.confirmPassword) {
        this.errors.confirmPassword = 'Potvrda lozinke je obavezna.';
      } else if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Lozinke se ne poklapaju.';
      }

      return Object.keys(this.errors).length === 0;
    },
    validEmail(email) {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(email);
    },
    async submitForm() {
      if (this.validateForm()) {
        try {
          const response = await this.$store.dispatch("auth/register",{
            username: this.form.username,
            email: this.form.email,
            password: this.form.password
          });
            this.registerMessage = response.message;
            this.registerSuccess = response.success;
          if (response.success) {
            this.resetForm();
            this.$router.push({ name: 'Home' }); // Redirect to home or any other page after registration
          }
        } catch (error) {
          console.error(error);
          this.registerMessage = 'Došlo je do greške prilikom registracije.';
          this.registerSuccess = false;
        }
      }
    },
    resetForm() {
      this.form.username = '';
      this.form.email = '';
      this.form.password = '';
      this.form.confirmPassword = '';
      this.errors = {};
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
