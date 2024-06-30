<template>
  <div id="f">
    <div id="fil">
      <div class="form-check" v-for="g of genres" :key="g.id">
        <input
          class="form-check-input"
          type="checkbox"
          :value="g.id"
          :id="g.id+g.name"
          v-model="selectedGenres"
        />
        <label class="form-check-label" :for="g.id+g.name">
          {{ g.name }}
        </label>
      </div>
    </div>
    <select class="form-select" v-model="sortOption">
      <option value="0">Sort by</option>
      <option value="name_asc">Books name Asc</option>
      <option value="name_desc">Books name Desc</option>
      <option value="year_asc">Publish year Asc</option>
      <option value="year_desc">Publish year Desc</option>
    </select>
    <input
      class="form-control search"
      type="search"
      placeholder="Search"
      v-model="searchQuery"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations} from 'vuex';

export default {
  data() {
    return {
      genres: [],
      selectedGenres: [],
      sortOption: '0',
      searchQuery: ''
    };
  },
  computed: {
    ...mapGetters({
      genresFromStore: 'books/getGenres'
    })
  },
  watch: {
    genresFromStore: {
      immediate: true,
      handler(newGenres) {
        if (newGenres && Array.isArray(newGenres)) {
          this.genres = newGenres.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
        } else {
          this.genres = [];
        }
      }
    },
    selectedGenres(newGenres) {
      this.setGenres(newGenres);
    },
    sortOption(newSortOption) {
      this.setSortOption(newSortOption);
    },
    searchQuery(newSearchQuery) {
      this.setSearch(newSearchQuery);
    }
  },
  methods: {
    ...mapMutations('books', ['setGenres', 'setSearch', 'setSortOption'])
  },
  created() {
    this.$store.dispatch('books/getCategories');
  }
};
</script>

<style scoped>
#f {
  margin-left: 20px;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 15px;
  margin-right: 20px;
  color: #74512d;
}
#fil {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.form-select {
  width: auto !important;
}
.search {
  width: auto !important;
}
</style>
