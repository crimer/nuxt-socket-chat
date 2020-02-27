export const state = () => ({
  user: {},
  users: [],
  messages: [],
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearData(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
  SOCKET_newMessage(state, msg) {
    state.messages.push(msg);
  },
  SOCKET_updateUsers(state, users) {
    state.users = users;
  },

};

export const actions = {};
