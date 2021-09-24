<template>
	<view v-if="goodsInfo.goods_name" class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
			:circular='true'>
			<swiper-item v-for="(item,i) in goodsInfo.pics" :key='i'>
				<image :src="item.pics_big" mode="" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">
				￥{{goodsInfo.goods_price}}
			</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">
					{{goodsInfo.goods_name}}
				</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">
				快递，免运费
			</view>
		</view>
		<!-- 商品详情信息 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>

		<!-- 底部商品导航组件区域 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
		
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	
	export default {
		computed:{
			...mapState('m_cart',[]),
			...mapGetters('m_cart',['total'])
		},
		watch: {
			//函数形式的watch在页面首次加载后不会被调用，所以购物车小图标数字不会保存
			// total(newVal){
			// 	//通过find（）方法，找到购物车的按钮配置对象
			// 	const findResult =  this.options.find(x=>x.text === '购物车')
			// 	if(findResult){
			// 		findResult.info = newVal
			// 	}
			// }
			
			
			//监听total值的变化，通过形参获得变化后的新值。total需要变为对象模式
			total: {
				handler(newVal){
					//通过find（）方法，找到购物车的按钮配置对象
					const findResult =  this.options.find(x=>x.text === '购物车')
					if(findResult){
						findResult.info = newVal
					}
				},
				//immediate用来声明次侦听器，是否在页面初次加载后调用
				immediate:true
			}
		},
		data() {
			return {
				goodsInfo: {},
				//左侧按钮的配置对象
				options: [{
				            icon: 'headphones',
				            text: '客服'
				        }, {
				            icon: 'shop',
				            text: '店铺',
				            infoBackgroundColor:'#007aff',
				            infoColor:"red"
				        }, {
				            icon: 'cart',
				            text: '购物车',
				            info: 0
				        }],
				//右侧按钮的配置对象
				 buttonGroup: [{
				          text: '加入购物车',
				          backgroundColor: '#ff0000',
				          color: '#fff'
				        },
				        {
				          text: '立即购买',
				          backgroundColor: '#ffa200',
				          color: '#fff'
				        }]
			}
		},
		onLoad(options) {
			const goods_id = options.goods_Id
			this.getGoodsDetail(goods_id)
		},
		methods: {
			//把m_cart模块中的addToCart方法映射到当前页面使用
			...mapMutations('m_cart',['addToCart']),
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get(
					'/api/public/v1/goods/detail', {
						goods_id
					}
				)
				if (res.meta.status !== 200) return uni.$showMsg()

				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;"').replace(/webp/g, 'jpg')

				this.goodsInfo = res.message
			},
			preview(i) {
				uni.previewImage({
					//当前图片索引
					current: i,
					//所有图片url地址的数组
					urls: this.goodsInfo.pics.map(x => x.pics_big)
				})
			},
			onClick(e){
				 // 如果点击的是购物车
				 if(e.content.text === '购物车'){
					 uni.switchTab({
					 	url:'../../pages/cart/cart'
					 })
				 }
			},
			
			
			
			buttonClick(e){
				// 如果点击的是加入购物车
				if(e.content.text === '加入购物车'){
					//商品信息对象
					//{goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
					const goods = {
						goods_id:this.goodsInfo.goods_id,
						goods_name:this.goodsInfo.goods_name,
						goods_price:this.goodsInfo.goods_price,
						goods_count:1,
						goods_small_logo:this.goodsInfo.goods_small_logo,
						goods_state:true
					}
					//调用addToCart方法
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			height: 100%;
			width: 100%
		}
	}


	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			font-size: 18px;
			color: rgb(242, 68, 67);
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				margin-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}
	.goods-nav{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		// z-index: 999;
	}
	.goods-detail-container{
		padding-bottom: 50px;
	}
</style>






