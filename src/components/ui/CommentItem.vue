<template>
    <div class="comment-item">
      <p><strong>{{ comment.user }}</strong> ({{ comment.date }}):</p>
      <p>{{ comment.comment }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CommentItem',
    props: {
      comment: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .comment-item {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .comment-item p {
    margin: 0;
  }
  .comment-item strong {
    font-weight: bold;
  }
  </style>
  