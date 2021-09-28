import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
uni.$http = $http

import store from 'store/store.js'

$http.beforeRequest = function(options){
	uni.showLoading({ title:'数据加载中...' })
	
	// console.log(options)
	//判断当前请求的是否含有有权限的接口（登陆后给url添加/my/表示已有登陆权限）
	if(options.url.indexOf('/my/') !== -1)	{
		options.header = { authorization: store.state.m_user.token }
	}
}
$http.afterRequest = function(){
	uni.hideLoading()
}

//封装弹框的方法
uni.$showMsg = function (title = '加载数据失败!',duration = 1500){
	uni.showToast({
		title,
		duration,
		icon:'none',
	})
}

// 请求的根路径
$http.baseUrl = 'https://www.uinav.com'

Vue.config.productionTip = false

App.mpType = 'app'


const app = new Vue({
    ...App,
	store
})
app.$mount()
