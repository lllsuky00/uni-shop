<template>
	<view>
		<!-- 顶部的搜索框 -->
		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000"
			:duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?good_id='+ item.goods_id +''">
					<image :src="item.image_src" alt="" mode="widthFix">
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key='index'>
				<image :src="item.image_src" class="nav-image" @click="navClickHanlder(item)"></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor-list">
			<!-- 楼层item项 -->
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片 -->
				<view class="floor-img-box">
					<navigator class="left-box" :url="item.product_list[0].url">
						<image  :src="item.product_list[0].image_src" mode="widthFix" :style="{width:item.product_list[0].image_width+'rpx'}"></image>
					</navigator>
					<view class="right-box">
						<navigator :url="picture.url" class="right-box-item" v-for="(picture,i) in item.product_list" :key="i" v-if="i!==0">
							<image :src="picture.image_src" mode="widthFix"  :style="{width:picture.image_width+'rpx'}"></image>
						</navigator>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图数据
				swiperList: [],
				navList:[],
				floorList:[]
			};
		},
		onLoad() {
			//调用方法获取轮播图的数据
			this.getSwiperList(),
			this.getNavList(),
			this.getfloorList()
		},
		methods: {
			//获取导航数据
			async getNavList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.navList = res.message
				uni.$showMsg('数据请求成功!')
			},
			// 获取轮播数据
			async getSwiperList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.swiperList = res.message
				uni.$showMsg('数据请求成功!')
			},
			navClickHanlder(item){
				if(item.name === '分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			//获取首页楼层数据
			async getfloorList(){
				const{data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				//对数据进行处理
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url = '/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				
				this.floorList = res.message
				
				uni.$showMsg('数据请求成功!')
			},
			gotoSearch(){
				uni.navigateTo({
					url:'../../subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper{
		height: 330rpx;
		.swiper-item,image{
			width: 100%;
			height: 100%;
		}
	}
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin: 15px 0;
		.nav-image{
			width: 128rpx;
			height:  140rpx;
		}
	}
	.floor-title{
		height: 60rpx;
		width: 100%;
	}
	.right-box{
		display: flex;
		flex-wrap:wrap;
		justify-content: space-around;
	}
	.floor-img-box{
		display: flex;
		padding-left: 10rpx;
	}
	.search-box{
		position: sticky;
		top: 0;
		z-index:999
	}
</style>
