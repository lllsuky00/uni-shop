<template>
	<view>
		<!-- 收获地址盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				
				<view class="row1-right">
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				
				<view class="row2-right">
					{{addstr}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations,mapGetters} from 'vuex'
	
	export default {
		name:"my-address",
		data() {
			return {
				// address: {}
			};
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),
			
			async chooseAddress(){
				//调用chooseAddress（）方法，使用选择收货地址功能
				//返回值是一个数组，第一项为错误对象，第二项为成功后的收货地址对象
				const [err,succ] = await  uni.chooseAddress().catch(err => err)
				if(err === null && succ.errMsg === "chooseAddress:ok"){
					// this.address = succ
					//更新vuex中的收货地址
					this.updateAddress(succ)
				}
				
				//用户授权判断
				if(err && (err.errMsg === 'chooseAddress:fail auth deny' ||err.errMsg ===  'chooseAddress:fail authorize no response')) {
					//如果用户没有授权，则调用reAuth（）方法，向用户重新发起授权申请	
					this.reAuth()
				}
			},
			// 让用户重新授权
			async reAuth(){
				const [err2,confirmResult] = await uni.showModal({
					content: '检测到您没打开地址权限，知否去设置打开？',
					confirmText: '确认',
					cancelText: '取消'
				})
				
				//如果弹框异常，则直接退出
				if(err2) return 
				// console.log(confirmResult);

				//如果点击取消，提示
				if(confirmResult.cancel) return uni.$showMsg('取消了地址授权')
				//如果点击确认，则调用openSetting方法进入授权页面，让用户进行授权
				if(confirmResult.confirm) return uni.openSetting({
					//授权结束需要进一步判断
					success:(settingResult)=>{
						//如果地址授权的值等于true，则提示“授权成功”
						if(confirmResult.authSetting['scope.address']) return uni.$showMsg('授权成功，请选择地址')
						// 如果地址授权的值等于false,则提示"授权失败"
						if(!confirmResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权')
					}
					
				})
			},
		},	
		computed:{
			...mapState('m_user',['address']),
			
			...mapGetters('m_user',['addstr']),
		},
	}
</script>

<style lang="scss">
	.address-choose-box{
		border-bottom: 2px solid #efefef;
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address-info-box{
		font-size: 14px;
		border-bottom: 2px solid #efefef;
		margin-top: 20px ;
		padding-bottom: 20px;
		.row1{
			
			display: flex;
			justify-content: space-between;
			
			.row1-left{}
			.row1-right{
				display: flex;
				justify-content: space-between;
			}
		}
		.row2{
			display: flex;
			// justify-content: space-between;
			align-items: center;
			margin-top: 10px;
			.row2-left{
				white-space: nowrap;
			}
			.row2-right{}
		}
	}
</style>
