import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkmodeIcon: 'mdi-weather-sunny',
    darkmode: false,
    currency: {
      symbol: '$',
      id: 'usd',
      icon: 'mdi-currency-usd'
    }
  },
  getters: {
    currency: state => state.currency,
    darkmodeIcon: state => state.darkmodeIcon,
    darkmode: state => state.darkmode,
  },
  mutations: {
    toggleDarkmode(state) {
      state.darkmode = !state.darkmode;
      state.darkmodeIcon = state.darkmode ? 'mdi-weather-night' : 'mdi-weather-sunny';
    },
    toggleCurrency(state) {
      if(state.currency.id == 'usd') {
        state.currency = {
          symbol: '€',
          id: 'eur',
          icon: 'mdi-currency-eur'
        }
      } else {
        state.currency = {
          symbol: '$',
          id: 'usd',
          icon: 'mdi-currency-usd'
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
