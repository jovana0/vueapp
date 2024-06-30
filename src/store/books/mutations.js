export default{
    setOneBook(state, book){
        state.oneBook=book;
    },
    ADD_COMMENT(state, comment) {
        state.comments.push(comment);
    },
    SET_COMMENTS(state, comments) {
        state.comments = comments;
    },
    SET_USER_COMMENTS(state, comments) {
        state.userComments = comments;
    },
    SET_USER_FAVORITES(state, favorites) {
      state.userFavorites = favorites;
    },
    ADD_TO_FAVORITES(state, bookId) {
      state.userFavorites.push(bookId);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    REMOVE_FAVORITE_BOOK(state, bookId) {
        const index = state.userFavorites.indexOf(bookId);
        if (index > -1) {
          state.userFavorites.splice(index, 1);
        }
      },
    setBooks(state, books) {
        state.books = books;
    },
    ADD_BOOK(state, book) {
        state.books.push(book);
    },
    REMOVE_BOOK(state, bookId) {
        state.books = state.books.filter(book => book.id !== bookId);
    },
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
    setGenres(state, selectedOptions) {
      state.selectedGenres = selectedOptions;
    },
    setSearch(state,searchFromComponent){
      state.search = searchFromComponent;
    },
    setSortOption(state, sortOption) {
      state.sortOption = sortOption;
    }
}