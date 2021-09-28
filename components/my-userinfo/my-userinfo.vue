<template>
	<view class="my-userinfo-container">
		<!-- 头像昵称区域 -->
		<view class="top-box">
			<image :src="userinfo.avatarUrl" class="avatar"></image>
			<view class="nickname">
				{{userinfo.nickName}}
			</view>
		</view>
		
		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 第一个面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>9</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>19</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>49</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 第二个面板 -->
			<view class="panel">
				<view class="panel-title">
					<text>我的订单</text>
				</view>
				<view class="panel-body">
					<view class="panel-item">
						<n-icon name="pay" size="64" color="red"></n-icon>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<n-icon name="deliver" size="64" color="red"></n-icon>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<n-icon name="refund" size="64" color="red"></n-icon>
						<text>退货/退款</text>
					</view>
					<view class="panel-item">
						<n-icon name="form" size="64" color="red"></n-icon>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个面板 -->
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		name:'my-userinfo',
		data() {
			return {
			}
		},
		computed:{
			...mapState('m_user',['userinfo'])
		},
		methods:{
			...mapMutations('m_user',['updateAddress','updateUserInfo','updateToken']),
			async logout(){
				//询问用户是否退出登录
				const [err,succ] = await uni.showModal({
					title:'提示',
					content:'确认退出登录吗？'
				}).catch(err => err)
				
				// console.log(succ);
				
				if(succ && succ.confirm === true){
					this.updateAddress({})
					this.updateUserInfo({})
					this.updateToken('')
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-userinfo-container{
		height: 100%;
		background-color: #f4f4f4;
		.top-box{
			height:400rpx;
			background-color: #f24443;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.avatar{
				width: 90px;
				height: 90px;
				border-radius: 45px;
				border: 2px solid #fff;
				box-shadow: 0 1px 5px black;
			}
			.nickname{
				font-size: 16px;
				color: #fff;
				margin-top: 10px;
				font-weight: bold;
			}
		}
	}
	.panel-list{
		padding: 0 10px;
		position: relative;
		top:-10px;
		.panel{
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;
			
			.panel-title{
				line-height: 45px;
				font-size: 15px;
				border-bottom: 1px solid #f4f4f4;
				padding-left: 10px;
			}
			.panel-body{
				display: flex;
				align-items: center;
				justify-content: space-around;
				.panel-item{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					padding: 10px 0;
					font-size: 13px;
				}
			}
			.panel-list-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 15px;
				// padding: 10px 10px;
				padding: 0 10px;
				line-height: 45px;
			}
		}
	}
</style>
