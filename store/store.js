import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart.js'
import moduleUser from '@/store/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{},
	mutations:{},
	actions:{},
	modules:{
		'm_cart':moduleCart,
		'm_user':moduleUser
	}
})

export default store