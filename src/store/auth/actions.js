import axios from "axios";
export default {
  async register({ commit }, userData) {
    try {
      const response = await axios.post('https://github.com/jovana0/vueapp/tree/main/server/register.php', userData);
      if (response.data.success) {
        const user = {
          id: response.data.user.id,
          username: userData.username,
          email: userData.email,
          role: 'User'
        };
        commit('SET_CURRENT_USER', user);
        return { success: true, message: 'User registered successfully' };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error during registration' };
    }
  },
  async logout(context){
    context.commit("LOGOUT_USER");
  },
  async login({ commit }, userData) {
    try {
      const response = await axios.post('https://github.com/jovana0/vueapp/tree/main/server/login.php', userData);
      if (response.data.success) {
        const user = response.data.user;
        commit('SET_CURRENT_USER', user);
        return { success: true, message: 'User logged in successfully' };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error during login' };
    }
  },
  async fetchUsers({ commit }) {
    const response = await fetch('https://github.com/jovana0/vueapp/tree/main/server/getUsers.php');
    const users = await response.json();
    commit('SET_USERS', users);
  },
  async deleteUser({ commit }, userId) {
    await fetch(`https://github.com/jovana0/vueapp/tree/main/server/managerUser.php?id=${userId}`, {
      method: 'DELETE'
    });
    commit('REMOVE_USER', userId);
  }
};
