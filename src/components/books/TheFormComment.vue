<template>
  <div class="comment-form">
    <h3>Add a Comment</h3>
    <form @submit.prevent="submitComment">
      <custom-input 
        v-model="commentText" 
        label="Comment" 
        id="comment"
      ></custom-input>
      <button type="submit" class="btn btn-outline-light">Submit</button>
    </form>
  </div>
</template>

<script>
import CustomInput from '../ui/CustomInput.vue';

export default {
  components: {
    CustomInput,
  },
  props: ['bookId'],
  data() {
    return {
      commentText: '',
    };
  },
  methods: {
    async submitComment() {
      if (this.commentText.trim() === '') {
        alert('Comment cannot be empty');
        return;
      }

      const commentData = {
        bookId: this.bookId,
        comment: this.commentText,
        user: this.$store.getters['auth/currentUser'].username,
        date: new Date().toISOString(),
      };

      try {
        await this.$store.dispatch('books/addComment', commentData);
        alert('Comment added successfully');
        this.$emit('commentAdded', commentData);  // Emit event to parent
        this.commentText = '';  // Reset the form
      } catch (error) {
        console.error('Error submitting comment:', error);
        alert('Error submitting comment');
      }
    },
  },
};
</script>
<style scoped>
h3{
  font-style: italic;
    color:#543310;
    margin-left:10px;
}
form{
  color:#543310;
}
.btn-outline-light{
    border-color: #AF8F6F;
    color:#AF8F6F;
}
</style>