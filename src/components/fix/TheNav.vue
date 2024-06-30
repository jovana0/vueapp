<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><router-link class="nav-link" to="/">List of books</router-link></li>
          <li class="nav-item" v-if="!isLoggin">
            <router-link class="nav-link" to="/singup">Singup</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggin">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="isLoggin" @click="logout">
            <router-link class="nav-link" to="/">Logout</router-link>
          </li>
          <li class="nav-item"><router-link class="nav-link" to="/about">Author</router-link></li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/admin">Admin</router-link>
          </li>
          <li class="nav-item" v-if="isUser">
            <router-link class="nav-link" to="/myprofile">User</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'isAdmin', 'isUser']),
    isLoggin() {
      return this.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.replace({ name: "login" });
      });
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #F8F4E1 !important;
}
a {
  color: #74512D;
}
</style>