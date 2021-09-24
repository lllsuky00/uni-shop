<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,i) in goodsList" :key="i" @click="gotoDetail(item)">
				<my-goods :item="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//请求参数
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10,
				},
				//商品列表
				goodsList: [],
				total: 0,
				//节流阀
				isLoading:false
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''

			this.getGoodsList()
		},
		methods: {
			async getGoodsList(callback) {
				//节流阀开启
				this.isLoading = true
				
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				
				//节流阀关闭
				this.isLoading = false
				
				//数据请求完毕,立即按需调用回调函数
				callback && callback()
				
				if (res.meta.status !== 200) return uni.$showMsg()
				
				//新,老列表数据要拼接起来(否则只加载新数据,老数据列表消失)
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
				
				
			},
			//下滑列表 加载新的数据
			onReachBottom(){
				//判断数据是否加载完毕
				if(this.queryObj.pagenum*this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
				
				//判断节流阀是否打开(请求其他数据)
				if(this.isLoading) return
				
				this.queryObj.pagenum += 1
				this.getGoodsList()
			},
			
			//下拉刷新触发函数
			onPullDownRefresh(){
				//重置数据
				this.queryObj.pagenum = 1
				this.goodsList = []
				this.total = 0
				this.isLoading = false
				this.getGoodsList(() => uni.stopPullDownRefresh())
				
			},
			
			//点击商品,进入商品详情页面
			gotoDetail(item){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?goods_Id="+item.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
