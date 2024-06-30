<template>
  <div id="admin">
    <h3>Admin Page</h3>
    <div class="dugmad">
    <button @click="toggleSection('books')" class="btn btn-outline-light">Show All Books</button>
    <button @click="toggleSection('users')" class="btn btn-outline-light">Show All Users</button>
    <button @click="toggleSection('addBook')" class="btn btn-outline-light">Add New Book</button>
    <button @click="toggleSection('addGenre')" class="btn btn-outline-light">Add New Genre</button>
  </div>
    <div v-if="showBooks">
      <h4>All Books</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.name }}</td>
            <td>
              <button @click="deleteBook(book.id)" class="btn btn-outline-light">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showUsers">
      <h4>All Users</h4>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button @click="deleteUser(user.id)" class="btn btn-outline-light">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showAddBook">
      <h4>Add New Book</h4>
      <book-form @submit="addBook"></book-form>
    </div>

    <div v-if="showAddGenre">
      <h4>Add New Genre</h4>
      <form @submit.prevent="addGenre">
        <div class="mb-3">
        <input v-model="newGenre.name" class="form-control" placeholder="Genre Name" required />
      </div>
        <button type="submit" class="btn btn-outline-light">Add Genre</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BookForm from '../components/books/BookForm.vue';

export default {
  components: {
    BookForm
  },
  data() {
    return {
      showBooks: true,
      showUsers: false,
      showAddBook: false,
      showAddGenre: false,
      newGenre: {
        name: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      books: 'books/getBooks',
      users: 'auth/users'
    })
  },
  methods: {
    toggleSection(section) {
      this.showBooks = section === 'books';
      this.showUsers = section === 'users';
      this.showAddBook = section === 'addBook';
      this.showAddGenre = section === 'addGenre';
    },
    async addBook(book) {
      await this.$store.dispatch('books/addBook', book);
    },
    async addGenre() {
      await this.$store.dispatch('books/addGenre', this.newGenre);
      this.newGenre = { name: '' };
    },
    async deleteBook(bookId) {
      await this.$store.dispatch('books/deleteBook', bookId);
    },
    async deleteUser(userId) {
      await this.$store.dispatch('auth/deleteUser', userId);
    }
  },
  created() {
    this.$store.dispatch('books/loadBooks');
    this.$store.dispatch('books/getCategories');
    this.$store.dispatch('auth/fetchUsers');
  }
};
</script>

<style scoped>
#admin{
  padding-top:25px;
  background-color: #F8F4E1;
}
h3{
  font-style: italic;
    color:#543310;
    margin-left:10px;
}
h4{
  font-weight: bold;
    color:#543310;
    margin-left:10px;
}
.dugmad{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
table {
  width: auto;
  border-collapse: collapse;
  margin:auto;
}
th, td {
  padding: 8px 12px;
  border: 1px solid rgba(175, 143, 111,0.5);
}
th {
  background-color: rgba(175, 143, 111,0.5);
}
.btn-outline-light{
    border-color: #AF8F6F;
    color:#AF8F6F;
}
</style>
