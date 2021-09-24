export default {
	namespaced:true,
	state:()=>({
		//购物车的数组，储存购物车中每个商品的信息对象
		//{goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations:{
		addToCart(state,goods){
			//根据提交的商品id，查询购物车中是否存在这件商品，有返回数组对象，否则返回undefinded
			const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
			if(!findResult){
				//如果没有，则直接push
				state.cart.push(goods)
			}else{
				//如果有，让件数+1
				findResult.goods_count++
			}
			//通过commit方法，调用m_cart命名空间下的saveToStorage方法
			this.commit('m_cart/saveToStorage')
		},
		
		//数据持久化
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		
		//更新购物车中的勾选状态
		updateGoodsState(state,goods){
			//根据goods_id查询购物车中对应商品的信息对象
			const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_state = goods.goods_state
				
				//持久化储存到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		
		//更新购物车里的商品数量
		updateGoodsCount(state,goods){
			//根据goods_id查询购物车中对应商品的信息对象
			const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
			
			if(findResult){
				findResult.goods_count = goods.goods_count
				
				//持久化储存到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		
		//删除购物车里的商品项
		removeGoodsById(state,goods_id){
			//过滤对应id的商品，将要删除项以外的商品存到cart数组中
			state.cart = state.cart.filter(x=>x.goods_id !== goods_id)
			
			//持久化储存到本地
			this.commit('m_cart/saveToStorage')
			
		},
		
		//修改购物车里所有商品的勾选状态
		updateAllGoodsState(state,newState){
			//遍历每一个商品的状态，并且让其等于传进来的新状态
			state.cart.forEach( x => x.goods_state = newState)
			//持久化储存到本地
			this.commit('m_cart/saveToStorage')
		}
		
		
	},
	
	getters:{
		//商品总数
		total(state){
			// let c = 0
			// state.cart.forEach(x => c += x.goods_count)
			// return c
			
			return state.cart.reduce((total,item) => total += item.goods_count ,0)
		},
		
		//被选中商品的总数
		checkedCount(state){
			//先用filter，从购物车中过滤已勾选的商品
			//在使用reduce，将已勾选的商品进行累加
			//reduce 的返回值是已勾选商品的总数量
			return state.cart.filter( x => x.goods_state).reduce((total,item)=> total += item.goods_count,0)
		},
		
		//被选中商品的总价格
		checkedGoodsAmount(state){
			//先用filter，从购物车中过滤已勾选的商品
			//在使用reduce，将已勾选的商品加个进行累加
			return state.cart.filter( x => x.goods_state).reduce((totalPrice, item) => totalPrice += item.goods_count * item.goods_price, 0  ).toFixed(2)
		}
	}
}