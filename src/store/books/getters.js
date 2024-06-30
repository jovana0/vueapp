export default{
  getBooks(state) {
    let result = state.books;
    if (state.selectedGenres.length) {
      result = result.filter((book) => {
        return book.genreId.some((genre) => state.selectedGenres.includes(genre));
      });
    }
    if (state.search.length) {
      result = result.filter(
        (book) =>
          book.name.toLowerCase().includes(state.search.toLowerCase())
      );
    }

    // Sortiranje
    if (state.sortOption !== '0') {
      result = result.sort((a, b) => {
        switch (state.sortOption) {
          case 'name_asc':
            return a.name.localeCompare(b.name);
          case 'name_desc':
            return b.name.localeCompare(a.name);
          case 'year_asc':
            return a.published_year - b.published_year;
          case 'year_desc':
            return b.published_year - a.published_year;
        }
      });
    }

    return result;
  },
    getBook: (state, getters) => (payload) => {
        if (getters.hasBook(payload)) {
          return state.books.find((x) => x.id == payload);
        } else {
          return "Book is not found";
        }
      },
      hasBook: (state) => (payload) => {
        return state.books.some((book) => book.id == payload);
      },
      getCommentsByBookId: (state) => (bookId) => {
        return state.comments.filter(comment => comment.bookId === bookId);
      },
      getGenres:(state)=>{
        return state.categories;
      },
      SET_FILTERED_BOOKS(state, books) {
        state.filteredBooks = books;
      }
}