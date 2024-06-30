<template>
  <div id="single">
    <div v-if="typeof singleBook === 'object' && singleBook !== null">
      <h3>Book Details</h3>
      <div class="card mb-3 ms-5" style="max-width: 85%;">
        <div class="row g-0">
          <div class="col-md-3">
            <img :src="singleBook.img" class="img-fluid rounded-start" :alt="singleBook.name">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title">{{ singleBook.name }}</h5>
              <p class="card-text"><small class="text-muted">{{ singleBook.author }}</small></p>
              <p class="card-text">{{ singleBook.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isUser && isAuthenticated">
        <h2>Leave a comment</h2>
        <the-form-comment :bookId="singleBook.id" @commentAdded="addComment"></the-form-comment>
      </div>
      <div v-if="comments && comments.length">
        <h3>Comments</h3>
        <ul>
          <li v-for="comment in comments" :key="comment.date">
            <comment-item :comment="comment"></comment-item>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <h3>{{ singleBook }}</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TheFormComment from '../components/books/TheFormComment.vue';
import CommentItem from '../components/ui/CommentItem.vue';

export default {
  components: {
    TheFormComment,
    CommentItem,
  },
  props: ['id'],
  data() {
    return {
      singleBook: null,
      comments: [],
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'isUser']),
  },
  async created() {
    await this.$store.dispatch("books/getOneBook", this.id);
    this.getOneBook();
    this.getComments();
  },
  methods: {
    getOneBook() {
      try {
        this.singleBook = this.$store.getters["books/getBook"](this.id);
        console.log(this.singleBook);
      } catch (err) {
        console.error("Error getting the book from store:", err);
      }
    },
    async getComments() {
      try {
        this.comments = await this.$store.dispatch('books/getCommentsByBookId', this.id);
        console.log(this.comments.data);
      } catch (err) {
        console.error("Error getting comments:", err);
      }
    },
    addComment(comment) {
      this.comments.push(comment);
    }
  },
  watch: {
    "$store.state.books.books"() {
      this.getOneBook();
    },
  },
};
</script>
<style scoped>
h2{
    font-style: italic;
    font-weight: bold;
    color:#543310;
    margin-left:10px;
}
ul li{
  list-style-type:none;
}
h3{
  font-style: italic;
    color:#543310;
    margin-left:10px;
}
.card{
    background-color: transparent !important;
    color:#74512D !important;
    border: 0px;
}
.card-body {
  text-align: justify;
}

.img-fluid {
  object-fit: cover;
  height: 100%;
}
</style>