import { createStore } from 'vuex'
import books from './books'
import auth from './auth'
export default createStore({
  modules: {
    books,
    auth
  }
})
