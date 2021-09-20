<template>
	<view>
		<!-- 自定义组件 -->
		<my-search @click="gotoSearch"></my-search>
		
		<view class="scroll-view-container">
			<!-- 左侧滑动区 -->

			<scroll-view class="left-scroll-view"  scroll-y="true"
				 :style="{height: wh + 'px'}" >
				 <block v-for="(item,i) in cateList" :key="i">
					 <view :class="['left-scroll-view-item',i===active?'active':'']" 
					 @click="activeChange(i)">{{item.cat_name}}</view>
				 </block>
			</scroll-view>


			<!-- 右侧滑动区 -->
			<scroll-view class="right-scroll-view" :scroll-top="scrollTop" scroll-y="true"  :style="{height: wh + 'px'}">
				<view v-for="(item2,i2) in cateLevel2" :key="i2"  class="cate-lv2">
					<!-- 二级分类的标题 -->
					<view class="cate-lv2-title">/{{item2.cat_name}}/</view>
					<!-- 二级分类下的三级分类列表 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" @click="gotoGoodsList(item3)" v-for="(item3,i3) in item2.children" :key="i3">
							<!-- 三级分类的图片 -->
							<image :src="item3.cat_icon" ></image>
							<!-- 三级分类的文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//可操作性窗口高度
				wh:0,
				cateList:[],
				active : 0,
				cateLevel2:[],
				scrollTop:0
			};
		},
		onLoad() {
			//获取可操作性窗口高度
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			
			//获取分类列表
			this.getCateList()
		},
		methods: {
			async getCateList(){
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status !== 200) return uni.$showMsg()
				//商品列表
				this.cateList = res.message
				
				//商品的二级分类数据(因为默认是第0项被选中,所以选择索引为0的数据)
				this.cateLevel2 = res.message[0].children
			},
			//左边分类栏 当前选项active变化时
			activeChange(i){
				this.active = i
				
				//重新为二级分类赋值
				this.cateLevel2 = this.cateList[i].children
				
				//scrollTop重新赋值
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			//跳转到商品列表页面
			gotoGoodsList(item){
				uni.navigateTo({
					url:'../../subpkg/goods_list/goods_list?cid='+ item.cat_id
				})
			},
			//点击搜索组件,导航到搜索页面
			gotoSearch(){
				uni.navigateTo({
					url:'../../subpkg/search/search'
				})
			},
			
		}
	}
</script>

<style lang="scss">
	.scroll-view-container{
		display: flex;
		
		.left-scroll-view{
			width: 120px;
			.left-scroll-view-item{
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;
				
				&.active{
					background-color: #fff;
					position: relative;
					
					&::before{
						content: "";
						width: 3px;
						display: block;
						height: 30px;
						background-color: red;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}
		}
		
		.right-scroll-view-item{
			
		}
	}
	.cate-lv2-title{
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	.cate-lv3-list{
		display: flex;
		flex-wrap: wrap;
		
		.cate-lv3-item{
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
			
			image{
				width: 60px;
				height: 60px;
			}
			
			text{
				font-size: 12px;
			}
		}
	}
</style>
