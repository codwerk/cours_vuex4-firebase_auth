import { createStore } from "vuex";

// imports firebase
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const store = createStore({
  state: {
    user: null,
    authIsReady: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      console.log('use state changed:', state.user);
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload
    }
  },
  actions: {
    async signup({commit}, { email, password }) {
      console.log('signup action');

      // async code
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if(res) {
        commit('setUser', res.user)
      } else {
        throw new Error('could not complete signup')
      }
    },
    async login({commit}, { email, password }) {
      console.log('login action');

      // async code
      const res = await signInWithEmailAndPassword(auth, email, password)

      if(res) {
        commit('setUser', res.user)
      } else {
        throw new Error('could not complete login')
      }
    },
    async logout() {
      console.log('logout action');

      await signOut(auth)
      this.commit('setUser', null)
    }
  }
})

const unsub = onAuthStateChanged(auth, (user)=>{
  store.commit('setAuthIsReady', true)
  store.commit('setUser', user)
  unsub()
}) 

export default store

