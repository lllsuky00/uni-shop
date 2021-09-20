<template>
	<view class="my-search-container" @click="searchBoxHandler">
		<view class="my-search-box" >
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler(){
				this.$emit('click')
			}
		}
		
	}
</script>

<style lang="scss">
	.my-search-container{
		background-color:  #F24443;
		height: 50px;
		padding: 0 20px;
		display: flex;
		align-items: center;
		
		.my-search-box{
			height: 36px;
			background-color: white;
			border-radius: 18px;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			
			.placeholder{
				text-align: center;
				color: gray;
				margin-left: 5px;
			}
		}
	}
</style>
