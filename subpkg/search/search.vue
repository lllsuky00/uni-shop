<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none">
			</uni-search-bar>
		</view>
		
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResult.length !== 0">
			<view class="sugg-item" @click="gotoDetail(item)" v-for="(item,index) in searchResult" :key="index">
				<view class="goods-name" >
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				keyword:'',
				//搜索历史的结果
				searchResult:[],
				//搜索历史的数组
				historyList:[]
			};
		},
		methods: {
			//input输入事件触发方法
			input(e) {
				//防抖
				clearTimeout(this.timer)

				this.timer = setTimeout(() => {
					//输入关键字
					this.keyword = e
					//调用获取搜索建议的方法
					this.getSearchList()
				}, 500)
			},
			async getSearchList(){
				if(this.keyword.length === 0){
					this.searchResult = []
					return
				}
				const{data: res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.keyword})
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				this.searchResult = res.message
				
				
				this.saveSearchHistory()
			},
			//点击搜索建议列表,跳转到对应商品详情页面
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			//保存搜索历史记录
			saveSearchHistory(){
				let set = new Set(this.historyList)
				set.delete(this.keyword)
				set.add(this.keyword)
				this.historyList = Array.from(set)
				
				// this.historyList.push(this.keyword)
				
				//对搜索历史数据进行永久化存储
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			
			//点击清除图标,清除历史
			clean(){
				this.historyList = [],
				uni.clearStorageSync('kw')
			},
			
			//点击历史记录 跳转到对应商品页面
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + item
				})
			}
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('kw') || [])
		}
		,
		computed:{
			histories(){
				//解决搜索历史 倒叙以及重复的问题
				// return [...new Set([...this.historyList].reverse())]
				
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		background-color: #F24443;
		z-index: 999;
		position: sticky;
		top: 0;
	}
	
	.sugg-list{
		padding: 0 5px;
		
		.sugg-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 13px;
			padding: 15px 0;
			border-bottom: 1px solid #efefef;
			
			.goods-name{
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
	.history-box{
		padding: 0 5px;
		.history-title{
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 14px;
			border-bottom: 1px solid #efefef;
		}
		
		.history-list{
			display: flex;
			flex-wrap: wrap;
			
			uni-tag{
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
	
</style>
