<template>
    <div id="profile">
      <h3>My Profile</h3>
      <p><strong>Username:</strong> {{ currentUser.username }}</p>
      <p><strong>Email:</strong> {{ currentUser.email }}</p>
  
      <button @click="toggleSection('favorites')" class="btn btn-outline-light">Show My Favorite Books</button>
      <button @click="toggleSection('comments')" class="btn btn-outline-light">Show My Comments</button>
        
      <div v-if="showComments">
      <div v-if="comments && comments.length > 0">
        <h3>Comments</h3>
        <ul>
          <li v-for="comment in comments" :key="comment.date">
            <comment-item :comment="comment"></comment-item>
          </li>
        </ul>
      </div>
      <div v-else-if="commentsFetched">
        <p>No comments found</p>
      </div>
      </div>
      <div v-if="showFavorites">
      <div v-if="favorites && favorites.length > 0">
        <h4>My Favorite Books</h4>
        <div id="l">
        <div class="card mb-3 me-3" style="width: 18rem;" v-for="book in favorites" :key="book.id">
          <a :href="'#/book/'+book.id">
            <img class="card-img-top" :src="book.img" :alt="book.name">
            <div class="card-body">
              <h5 class="card-title">{{ book.name }}</h5>
              <p class="card-text">Author: {{ book.author }}</p>
              <p class="card-text">Published: {{ book.published_year }}</p>
            </div>
          </a>
          <button @click="removeFromFavorites(book.id)" class="btn btn-outline-light">
              Remove from Your Book List
          </button>
        </div>
      </div>
      </div>
      <div v-else-if="favoritesFetched">
        <p>No favorite books found</p>
      </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import CommentItem from '../components/ui/CommentItem.vue';
  
  export default {
    components: {
    CommentItem,
  },
    data() {
      return {
        comments: [],
        favorites: [],
        commentsFetched: false,
        favoritesFetched: false,
        showComments: false,
        showFavorites: true,
      };
    },
    computed: {
      ...mapGetters('auth', ['currentUser']),
      ...mapGetters('books', ['getBooks']), 
    },
    methods: {
      async fetchUserComments() {
        try {
          const response = await this.$store.dispatch('books/getUserComments', this.currentUser.username);
          this.comments = response;
          console.log(this.comments);
          this.commentsFetched = true;
        } catch (error) {
          console.error('Error fetching comments:', error);
          this.commentsFetched = true;
        }
      },
      async fetchFavoriteBooks() {
        try {
          const favoriteBookIds = await this.$store.dispatch('books/getUserFavorites', this.currentUser.id);
  
          this.favorites = this.getBooks.filter(book => favoriteBookIds.includes(book.id.toString()));
          this.favoritesFetched = true;
        } catch (error) {
          console.error('Error fetching favorite books:', error);
          this.favoritesFetched = true;
        }
      },
      async removeFromFavorites(bookId) {
      try {
        await this.$store.dispatch('books/removeBookFromFavorites', {
          userId: this.currentUser.id,
          bookId
        });
        this.favorites = this.favorites.filter(book => book.id !== bookId);
      } catch (error) {
        console.error('Error removing book from favorites:', error);
      }
    },
      toggleSection(section) {
      if (section === 'comments') {
        this.showComments = !this.showComments;
        this.showFavorites = false;
        if (this.showComments && !this.commentsFetched) {
          this.fetchUserComments();
        }
      } else if (section === 'favorites') {
        this.showFavorites = !this.showFavorites;
        this.showComments = false;
        if (this.showFavorites && !this.favoritesFetched) {
          this.fetchFavoriteBooks();
        }
      }
    },
    },
  };
</script>
<style scoped>
ul li{
  list-style-type:none;
}
  a{
    text-decoration: none;
    color:#74512D !important;
}
  #l{
    display: flex;
    flex-wrap: wrap;
    justify-content: center
}
.card{
    background-color: rgba(175, 143, 111,0.5) !important;
}
.card-img-top{
   height: 401.67px;
}
.card-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}
.btn-outline-light{
    border-color: #AF8F6F;
    color:#AF8F6F;
}
</style>
