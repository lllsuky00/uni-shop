import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
uni.$http = $http

$http.beforeRequest = function(option){
	uni.showLoading({
		title:'数据加载中...'
	})
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
    ...App
})
app.$mount()
