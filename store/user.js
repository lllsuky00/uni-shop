export default {
	//开启命名空间
	namespaced: true,
	
	//数据
	state: ()=>({
		//收货地址
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		
		//登陆成功后的token字符串
		// token:''|| uni.getStorageSync('token'),
		token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo',
		
		//用户的基本信息
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		
		//重定向的对象{ openType， from }
		redirectInfo: null
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
		},
		
		//更新用户信息
		updateUserInfo(state,userinfo){
			state.userinfo = userinfo
			//通过this.commit()方法，调用m_user模块下的saveUserInfoToStorage方法，将userinfo存储到本地
			this.commit('m_user/saveUserInfoToStorage')	
		},
		//定义将userinfo 持久化存储到本地的方法
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		
		//更新token字符串
		updateToken(state,token){
			state.token = token
			this.commit('m_user/saveTokenStorage')
		},
		
		saveTokenStorage(state){
			uni.setStorageSync('token',state.token)
		},
		
		//更新重定向的信息对象
		updateRedirectInfo(state,info){
			state.redirectInfo = info
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