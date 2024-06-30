import axios from "axios";
export default{
  async getCategories({ commit }) {
    try {
      const response = await fetch("https://666c7c3c49dbc5d7145e2a4f.mockapi.io/bt/genre");
      const responseData = await response.json();
      commit('SET_CATEGORIES', responseData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
    async loadBooks(context){
        const response=await fetch("https://666c7c3c49dbc5d7145e2a4f.mockapi.io/bt/books");
        const data = await response.json();
        console.log(data);
        context.commit("setBooks", data);
    },
    async getOneBook(_,payload){
        const response=await axios.get("https://666c7c3c49dbc5d7145e2a4f.mockapi.io/bt/books/"+payload);

        return response;
    },
    async addToFavorites({ commit, rootState }, bookId) {
        const userId = rootState.auth.currentUser.id;
        if (userId) {
          try {
            const response = await axios.post('http://localhost/bookstrack/server/addToFavorites.php', {
              userId,
              bookId
            });
            if (response.data.success) {
              commit('ADD_TO_FAVORITES', bookId);
            } else {
              console.error(response.data.message);
            }
          } catch (error) {
            console.error('Error adding to favorites:', error);
          }
        } else {
          console.error('User is not authenticated');
        }
    },
    async addComment({ commit }, commentData) {
      try {
        const response = await axios.post('http://localhost/bookstrack/server/comments.php', commentData);
        if (response.data.success) {
          commit('ADD_COMMENT', commentData);
        } else {
          throw new Error('Failed to add comment');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
    async getCommentsByBookId({ commit }, bookId) {
      try {
        const response = await axios.get(`http://localhost/bookstrack/server/comments.php?bookId=${bookId}`);
        if (response.status === 200) {
          commit('SET_COMMENTS', response.data);
          return response.data;
        } else {
          throw new Error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
      }
    },
    async getUserComments({ commit }, username) {
      try {
        const response = await axios.get(`http://localhost/bookstrack/server/getComments.php?username=${username}`);
        commit('SET_USER_COMMENTS', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching user comments:', error);
        throw error;
      }
    },
    async getUserFavorites({ commit }, userId) {
      try {
        const response = await axios.get(`http://localhost/bookstrack/server/getFavorites.php?userId=${userId}`);
        commit('SET_USER_FAVORITES', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching user favorite books:', error);
        throw error;
      }
    },
    async removeBookFromFavorites({ commit }, { userId, bookId }) {
      try {
        const response = await axios.post('http://localhost/bookstrack/server/removeFavorite.php', {
          userId,
          bookId,
        });
        commit('REMOVE_FAVORITE_BOOK', bookId);
        return response;
      } catch (error) {
        console.error('Error removing book from favorites:', error);
        throw error;
      }
    },
    async addBook({ commit }, book) {
  if (!book || Object.keys(book).length === 0 || 
      !book.name || !book.description || !book.img || 
      !book.published_year || !book.author || !book.genreId.length) {
    console.error('Book object is incomplete or empty');
    return;
  }
  try {
    const response = await axios.post('https://666c7c3c49dbc5d7145e2a4f.mockapi.io/bt/books', book);
    commit('ADD_BOOK', response.data);
  } catch (error) {
    console.error('Error adding book:', error);
  }
},
    async addGenre(_, genre) {
      try {
        const response = await axios.post('https://666c7c3c49dbc5d7145e2a4f.mockapi.io/bt/genre', genre);
        console.log(response.data);
      } catch (error) {
        console.error('Error adding genre:', error);
      }
    },
    async deleteBook({ commit }, bookId) {
      try {
        const response =  await axios.delete('https://666c7c3c49dbc5d7145e2a4f.mockapi.io/bt/books/'+ bookId);
        commit('REMOVE_BOOK', bookId);
        console.log(response);
      } catch (error) {
        console.error('Error:', error);
      }
    },
}