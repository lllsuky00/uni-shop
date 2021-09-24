<template>
	<view class="goods-item">
		<!-- 商品列表左侧盒子 -->
		<view class="left-box">
			<radio :checked="item.goods_state" color="#F24443" @click="radioClickHandler" v-if="showRadio"></radio>
			<image :src="item.goods_small_logo || defaultPic" 
			 class="goods-pic">
			</image>
		</view>
		
		<!-- 商品列表右侧盒子 -->
		<view class="right-box">
			<view class="goods-name">
				{{item.goods_name}}
			</view>
			<view class="goods-info-box">
				<view class="goods-price">
					￥{{item.goods_price | tofixed}}
				</view>
				<!-- 商品数量 -->
				<uni-number-box :min="1" :value="item.goods_count" @change="numberChangeHandler" v-if="showNumberBox"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			item:{
				type:Object,
				default:{}
			},
			//是否展示图片左侧的radio
			showRadio:{
				type:Boolean,
				//如果没有指定，则默认不显示radio
				default:false
			},
			showNumberBox:{
				type:Boolean,
				//如果没有指定，则默认不显示numberBox
				default:false
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
		,
		data() {
			return {
				//默认的图片
				defaultPic:"http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
			};
		},
		methods:{
			//radio组件的点击事件处理函数
			radioClickHandler(){
				this.$emit( 'radio-change',{
					goods_id:this.item.goods_id,
					goods_state:!this.item.goods_state
				})
			},
			//监听到了 numberBox 组件数量变化的十几
			numberChangeHandler(val){
				this.$emit('num-change',{
					goods_count : val+0,    //为了保证为数值
					goods_id : this.item.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #F0F0F0;
		.left-box{
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-pic{
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		
		.right-box{
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			.goods-name{
				font-size: 13px;
			}
			
			.goods-info-box{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.goods-price{
					font-size: 16px;
					color: #F24443;
				}
			}
		}
	}
</style>
