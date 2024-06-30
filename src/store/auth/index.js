import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      users: [],
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    };
  },
  mutations,
  getters,
  actions,
};
