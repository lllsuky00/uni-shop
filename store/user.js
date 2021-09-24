export default {
	//开启命名空间
	namespaced: true,
	
	//数据
	state: ()=>({
		address:JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	
	//方法
	mutations: {
		//更新收货地址
		updateAddress(state,address){
			state.address = address
			
			//通过this.commit() 方法，调用m_user模块下的saveAddressToStorage 方法将address永久化存储到本地
			this.commit('m_user/saveAddressToStorage')
		},
		//定义将address 持久化存储到本地的方法
		saveAddressToStorage(state) {
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	
	//
	getters:{
		addstr (state) {
			if (!state.address.provinceName) return ''
			
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		},
	}
}