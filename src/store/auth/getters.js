export default {
    isAuthenticated: state => !!state.currentUser,
    currentUser: state => state.currentUser,
    currentUserRole: state => state.currentUser ? state.currentUser.role : null,
    isAdmin: state => state.currentUser && state.currentUser.role === 'Admin',
    isUser: state => state.currentUser && state.currentUser.role === 'User',
    users: state => state.users
};
  