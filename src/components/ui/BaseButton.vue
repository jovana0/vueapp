<template>
    <router-link v-if="isLink" :to="path">{{ text }}</router-link>
    <button v-else>
      <slot></slot>
    </button>
  </template>
  <script>
  export default {
    props: {
      path: {
        type: String,
        required: false,
        default: "/",
      },
      text: {
        type: String,
        required: true,
      },
      isLink: {
        type: Boolean,
        required: false,
        default: true,
      },
    },
  };
  </script>
  <style scoped>
  a {
    border: 1px solid #543310;
    text-decoration: none;
    display: inline-block;
    margin: 10px 5px;
    border-radius: 10px;
    padding: 5px 15px;
    color: #543310;
    background-color: rgba(175, 143, 111,0.5);
  }
  </style>