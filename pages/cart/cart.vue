<template>
	<view class="cart-contianer" v-if="cart.length !== 0">
		<!-- 收货地址组件 -->
		<my-address></my-address>
		
		<!-- 购物车 -->
		<view class="cart-title">
			<!-- 购物车图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 购物车文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		
		<!-- 循环渲染购物车中的商品信息 -->
		<uni-swipe-action>
			<block v-for="(item,i) in cart" :key="i">
				 <uni-swipe-action-item :right-options="options"  @click="swiperActionClick(item)">
					 <my-goods :item="item" :showRadio='true' :showNumberBox="true" @num-change="numberChangeHandler" @radio-change="radioChangeHandler"></my-goods>
				 </uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 结算组件 -->
		<my-settle></my-settle>
		
		
	</view>
	
	<!-- 空白购物车页面 -->
	<view class="empty-cart" v-else>
		<text class="tip-text">购物车空空如也</text>
	</view>
</template>



<script>
	import badgeMix from '@/mixins/tabbar-badge.js';
	import {mapState,mapMutations} from 'vuex'
	
	export default {
		mixins:[badgeMix],
		data() {
			return {
				options:[{
					 text: '删除',
					    style: {
					        backgroundColor: '#F24443'
					    }
				}]
			};
		},
		computed:{
			...mapState('m_cart',['cart'])
		},
		methods:{
			//把updateGoodsState方法映射到页面
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
			
			//点击radio，触发函数
			radioChangeHandler(e){
				this.updateGoodsState(e)
			},
			
			//点击numberbox的加减   触发函数
			numberChangeHandler(e){
				this.updateGoodsCount(e)
			},
			
			//点击滑动动作产生的删除按钮
			swiperActionClick(item){
				this.removeGoodsById(item.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.cart-contianer{
		padding-bottom: 50px;
	}
	.cart-title{
		display: flex;
		align-items: center;
		padding-left: 5px;
		height: 40px;
		border-bottom: 1px solid #efefef;
		.cart-title-text{
			font-size: 14px;
			margin-left: 10px;
		}
	}
</style>
