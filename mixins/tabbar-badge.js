import {mapGetters} from 'vuex'

export default {
	computed: {
		//将m_cart里的total映射到当前页面中
		...mapGetters('m_cart', ['total'])
	},
	
	watch:{
		//监听total的变化
		total(){
			this.setBadge()
		}
	},
	
	onShow() {
		//页面展示时，显示数字徽章
		this.setBadge()
	},
	
	methods:{
		//设置数字徽章
		setBadge(){
			uni.setTabBarBadge({
				index:2,   //tabbar的索引 索引为2也就是购物车的tabbar选项
				text:this.total + ''   ,//text的值必须是字符串，不能是数字
			})
		}
	}
}