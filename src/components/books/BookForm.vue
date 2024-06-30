<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <input v-model="book.name" placeholder="Book Name"  class="form-control" required />
    </div>
    <div class="mb-3">
      <input v-model="book.description" placeholder="Description"  class="form-control" required />
    </div>
    <div class="mb-3">
      <input v-model="book.img" placeholder="Image URL"  class="form-control" required @input="validateURL" />
      <span v-if="errors.img" class="error">{{ errors.img }}</span>
    </div>
    <div class="mb-3">
      <input v-model="book.published_year" type="number"  class="form-control" placeholder="Published Year" required />
    </div>
    <div class="mb-3">
      <input v-model="book.author" placeholder="Author"  class="form-control" required />
    </div>
    <div class="mb-3 form-check" v-if="genres.length">
      <label>Genres:</label>
      <div v-for="genre in genres" :key="genre.id">
        <input type="checkbox" class="form-check-input" :value="genre.id" @change="toggleGenre(genre.id)">
        {{ genre.name }}
      </div>
    </div>
    
    <button type="submit" :disabled="isSubmitDisabled" class="btn">Add Book</button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      book: {
        name: '',
        description: '',
        img: '',
        published_year: '',
        author: '',
        genreId: []
      },
      errors: {
        img: ''
      },
      isSubmitDisabled: true
    };
  },
  computed: {
    ...mapGetters('books', ['getGenres']),
    genres() {
      return this.getGenres;
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.book);
      this.resetForm();
    },
    validateURL() {
      const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR validate ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
      if (!urlPattern.test(this.book.img)) {
        this.errors.img = 'Invalid URL';
        this.isSubmitDisabled = true;
      } else {
        this.errors.img = '';
        this.isSubmitDisabled = false;
      }
    },
    toggleGenre(genreId) {
      const index = this.book.genreId.indexOf(genreId);
      if (index === -1) {
        this.book.genreId.push(genreId);
      } else {
        this.book.genreId.splice(index, 1);
      }
    },
    resetForm() {
      this.book = {
        name: '',
        description: '',
        img: '',
        published_year: '',
        author: '',
        genreId: []
      };
      this.isSubmitDisabled = true;
      this.errors.img = '';
    }
  },
  created() {
    this.$store.dispatch('books/getCategories');
  }
};
</script>

<style>
form{
  margin:auto;
  width:80%;
}
.error {
  color: red;
  font-size: 0.9em;
}
.btn{
    border-color: #543310;
    color:#543310;
}
</style>
