<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio" @click="changeAllState">
			<radio color="#F24443" :checked="isFullCheck" /><text>全选</text>
		</label>

		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{ checkedGoodsAmount }}</text>
		</view>

		<!-- 结算 -->
		<view class="btn-settle" @click="settlement">
			结算({{ checkedCount }})
		</view>

	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: 'my-settle',
		data() {
			return {
				seconds: 3,
				timer: null,
				message: {
					"order_id": 45,
					"user_id": 12,
					"order_number": "GD20180504000000000045",
					"order_price": 0.1,
					"order_pay": "0",
					"is_send": "否",
					"trade_no": "",
					"order_fapiao_title": "个人",
					"order_fapiao_company": "",
					"order_fapiao_content": "",
					"consignee_addr": "广州市天河区",
					"pay_status": "0",
					"create_time": 1525408071,
					"update_time": 1525408071,
					"order_detail": "[{\"goods_id\":55578,\"goods_name\":\"初语2017秋装新款潮牌女装加绒宽松BF风慵懒卫衣女套头连帽上衣\",\"goods_price\":279,\"goods_small_logo\":\"http://image2.suning.cn/uimg/b2c/newcatentries/0070067836-000000000690453616_2_400x400.jpg\",\"counts\":1,\"selectStatus\":true}]",

				},
				payinfo : {
					"timeStamp": "1525681145",
					"nonceStr": "BkPggorBXZwPGXe3",
					"package": "prepay_id=wx071619042918087bb4c1d3d72999385683",
					"signType": "MD5",
					"paySign": "D1642DEEF1663C8012EDEB9297E1D516"
				}

			}
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			...mapGetters('m_user', ['addstr']),
			...mapState('m_user', ['token']),
			...mapState('m_cart', ['cart']),

			//购物车全选按钮是否全选
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user', ['updateRedirectInfo']),

			//变更商品全选按钮状态
			changeAllState() {
				// console.log(!this.isFullCheck);
				this.updateAllGoodsState(!this.isFullCheck)
			},

			settlement() {
				//先判断是否勾选了要结算的商品
				if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')

				//再判断用户是否选择了收货地址
				if (!this.addstr) return uni.$showMsg('请选择收货地址！')

				//最后判断用户是否登录
				// if(!this.token) return uni.$showMsg('请先登录！')
				if (!this.token) return this.delayNavigate()

				this.payOrder()
			},

			//显示提示框
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '请登录后再结算！' + n + '秒后自动跳转到登录页',
					mask: true,
					duration: 1500
				})
			},

			//延迟导航到my页面
			delayNavigate() {
				//重置seconds
				this.seconds = 3

				//先展示提示框
				this.showTips(this.seconds)

				//创建定时器，每隔一秒执行一次
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: '/pages/my/my',
							//跳转成功的回调函数
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTap',
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}

					this.showTips(this.seconds)
				}, 1000)
			},
			//微信支付
			async payOrder() {
				//1.创建订单
				//1.1组织订单的信息对象
				const orderInfo = {
					order_price: 1111,
					// order_price:this.checkedGoodsAmount,
					consignee_addr: this.addstr,
					order_detail: '',
					//先过滤cart里已经勾选的商品，再遍历这些商品将他们改为接口文档要求的格式
					goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price
					})),
				}
				/* //1.2发起请求创建订单
				const {
					data: res
				} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				if (res.meta.status !== 200) return uni.$showMsg('创建订单失败')

				//1.3得到服务器响应的"订单编号"
				const orderNumber = res.message.order_number */
				const orderNumber = this.message.order_number
				const [err,succ] = await uni.requestPayment(this.payinfo)
				
				
				
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;

		.radio {}

		.amount-box {
			.amount {
				color: #F24443;
				font-weight: bold;
			}
		}

		.btn-settle {
			background-color: #f24443;
			color: white;
			height: 50px;
			line-height: 50px;
			padding: 0 10px;
			min-width: 100px;
			text-align: center;
		}
	}
</style>
