<template>
  <main>
    <h2>Books</h2>
    <div id="list">
      <filter-books @genres-loaded="setGenres"></filter-books>
      <div id="l">
        <div class="card mb-3 me-3" style="width: 18rem;" v-for="book in paginatedData" :key="book.id">
          <a :href="'/book/'+book.id">
            <img class="card-img-top" :src="book.img" :alt="book.name">
            <div class="card-body">
              <h5 class="card-title">{{ book.name }}</h5>
              <p class="card-text">Author: {{ book.author }}</p>
              <p class="card-text">
                Genre: {{ getGenreNames(book.genreId).join(', ') }}
              </p>
              <p class="card-text">Published: {{ book.published_year }}</p>
            </div>
          </a>
          <button v-if="isUser" @click="addToFavorites(book.id)" class="btn btn-outline-light">
                <i class="fa fa-heart"></i> Add to Your Book List
            </button>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-outline-light">Prev</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-outline-light">Next</button>
    </div>
  </main>
</template>

<script>
import FilterBooks from "../components/books/FilterBooks.vue";
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      genres: [],
      currentPage: 1,
      itemsPerPage: 6
    };
  },
  components: {
    FilterBooks
  },
  computed: {
    ...mapGetters({
      isUser: 'auth/isUser',
      currentUser: 'auth/currentUser',
      books: 'books/getBooks',
      genresFromStore: 'books/getGenres'
    }),
    totalPages() {
      return this.books.length ? Math.ceil(this.books.length / this.itemsPerPage) : 1;
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.books.slice(start, end);
    }
  },
  watch: {
    genresFromStore: {
      immediate: true,
      handler(newGenres) {
        this.genres = newGenres;
      }
    }
  },
  methods: {
    ...mapActions({
      addToFavorites: 'books/addToFavorites'
    }),
    setGenres(genres) {
      this.genres = genres;
    },
    getGenreNames(genreIds) {
      return genreIds.map(genreId => {
        const genre = this.genres.find(genre => genre.id === genreId);
        return genre ? genre.name : '';
      });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  }
};
</script>

<style scoped>
main{
    overflow-x: hidden;
}
h2{
    font-style: italic;
    font-weight: bold;
    color:#543310;
    margin-left:10px;
}
a{
    text-decoration: none;
    color:#74512D !important;
}
#list{
    display: flex;
    align-items: flex-start;
}
#lista #f{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}
#l{
    display: flex;
    flex-wrap: wrap;
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
.pagination{
    margin-left:20px;
    display: flex;
    align-items: center;
    color:#74512D;
}
.btn-outline-light{
    border-color: #AF8F6F;
    color:#AF8F6F;
}
</style>