export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`

    let token = null
    if (req.headers.token) {
      // cookie found
      try {
        // check data user login with cookie
        const { data } = await this.$axios.post('/api/auths/me')
        // server return the data is cookie valid loggedIn is true
        token = data // set the data token
      } catch (err) {
        // No valid cookie found
        token = null
      }
    }
    commit('SET_AUTH', token) // set state auth
  },
}


export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
}