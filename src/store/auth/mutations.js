export default {
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  },
  LOGOUT_USER(state) {
    state.currentUser = null;
    localStorage.removeItem('currentUser');
  },
  REMOVE_USER(state, userId) {
    state.users = state.users.filter(user => user.id !== userId);
  }
};