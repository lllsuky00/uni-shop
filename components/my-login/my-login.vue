<template>
	<view class="login-contianer">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<!-- <button type="primary" class="btn-login" open-type="getUserProfile" @getuserinfo="getUserInfo">一键登录</button> -->
		<button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
		<!-- 登录提示 -->
		<view class="tips-text">
			登录尽享更多权益
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o"
			};
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
			
			//获取微信用户的基本信息
			getUserProfile(){
				uni.getUserProfile({
				        desc: '用以获取用户昵称、头像等',
				        success:(res)=>{
						 // 把用户的基本信息存储到vuex中
						 this.updateUserInfo(res.userInfo)
						 // console.log(res.userInfo);
						 this.getToken(res)
						},
						fail:(err)=>{
						 //判断是否获取用户信息成功
						 if(err.errMsg === 'getUserProfile:fail auth deny' ) return uni.$showMsg('您取消了登陆授权！')
				        }
					})
				
			},
			async getToken(info){
				//获取code对应的值
				const [err,res] = await uni.login().catch(err => err)
				if(err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
				console.log(info);
				//准备参数对象
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				/* //换取token
				const {data: loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				console.log(loginResult);
				if(loginResult.meta.status !== 200) return uni.$showMsg('登录失败')
				uni.$showMsg('登陆成功') */
				
				this.updateToken(this.token)
				
				//判断vuex的redirectInfo是否为null
				//如果不为null，则登陆成功后重新导航到目标页面
				this.navigateBack()
			},
			//返回登陆之前的页面
			navigateBack(){
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTap'){
					uni.switchTab({
						url: this.redirectInfo.from,
						//完成导航后，重置vuex里面的redirectInfo为null
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
			
		},
		computed:{
			...mapState('m_user',['redirectInfo'])
		}
	}
</script>

<style lang="scss">
	.login-contianer{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 750rpx;
		background-color: #F8F8F8;
		position: relative;
		overflow: hidden;
		
		&::after{
			content: ' ';
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}
		.btn-login{
			width: 80%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: red;
		}
		.tips-text{
			font-size: 12px;
			color: gray;
		}
	}
</style>
