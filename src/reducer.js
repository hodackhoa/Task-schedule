const stateDefault = {
											products:[],users: [], productDetail:'', orderData: [], indexNavMenu: 0,
											userLogin:'', popUp:'none', cart: [], amountOrder:1, rePopup:true,reportData:{},
											orderCondition: [false, null, null], searchKey:'', amountSelling: [], adminPopup: {display:''},
											adminLogin:'',autoRedirect: true, indexTabManage: 0, orderDetailsAdmin: [], categories:[]
										}
export default function reducer(state = stateDefault, action){
	switch (action.type) {
		case 'GETDATA':
			state.products = action.data;
			return {...state}
		case 'GETUSERS':
			state.users = action.data;
			return {...state}
		case 'USERLOGIN':
			state.userLogin = action.obj
			return {...state}
		case 'ADMINLOGIN':
			state.adminLogin = action.obj
			return {...state}
		case 'SHOWPRODETAIL':
			state.productDetail = action.obj;
			return {...state}
		case 'NAVMENUINDEX':
			state.indexNavMenu = action.index;
			return {...state}
		case 'POPUP':
			state.rePopup = (state.rePopup)? false: true;
			state.popUp = action.style
			return {...state}
		case 'ORDER':
			if(state.userLogin!=''){
	      for(let i=0;i<state.products.length;i++){
	        if(state.products[i].id == action.id){
	          var objTemp = state.products[i];
	          if(state.cart.length>0){
	            var existStatus = false;
	            for(let j=0;j<state.cart.length; j++){
	              if(objTemp.id == state.cart[j].id){
	                existStatus = true;
	              }
	            }
	          }
	          if(existStatus){
	          	objTemp.amount = objTemp.amount + parseInt(state.amountOrder);
	          	objTemp.eachTotal = objTemp.amount* objTemp.price
	          }
	          else{
	          	objTemp.amount = state.amountOrder;
	          	objTemp.eachTotal = objTemp.amount* objTemp.price
	          	state.cart.push(objTemp);
	          }
	          break; 
	        }
	      }
	      var proIdCart = localStorage.getItem('productsID-Cart') //save product to Local Store//
	      proIdCart = (proIdCart==null)? '' : proIdCart
	      console.log(state.amountOrder)
	      for(let i=0; i<state.amountOrder;i++){
	      	proIdCart += action.id + "|";
	      }
	      localStorage.setItem('productsID-Cart', proIdCart);
	      state.amountOrder = 1;
	    }
			return {...state}
		case 'AMOUNTORDER':
			if(action.id==undefined){
				state.amountOrder = action.amount
			}
			else{
				for(let i=0;i<state.cart.length;i++){
					if(state.cart[i].id==action.id){
						state.cart[i].amount = action.amount
						state.cart[i].eachTotal = state.cart[i].amount* state.cart[i].price
					}
				}
			}
			return {...state}
		case 'DELORDER':
			if(action.id==null){
				state.cart = []
			}
			else{
				for(let i=0;i<state.cart.length;i++){
					if(state.cart[i].id==action.id){
						state.cart.splice(i,1)
					}
				}
			}
			return {...state}
		case 'GETORDERDATA':
				state.orderData = action.data
			return {...state}
		case 'CLEAR_ORDERDATA':
				state.orderCondition=(action.arrIndex!=null)? [action.val, action.arrIndex[0], action.arrIndex[1]]:[action.val]
			return {...state}
		case 'GETCART_LOCAL':
				action.arr.splice(action.arr.length-1, 1)
				for(var i=0;i<action.arr.length;i++){
					var k=1;
					for(var j=i+1;j<action.arr.length;j++){
						if(action.arr[i]==action.arr[j]){
					   	k++;
					    action.arr.splice(j,1);
					    j--;
					  }
					}
					var objTemp = state.products[parseInt(action.arr[i])];
					objTemp.amount = k;
	        objTemp.eachTotal = objTemp.amount* objTemp.price
	        state.cart.push(objTemp);
				}
			return {...state}
		case 'LOGOUT':
			state.cart = []; state.orderData= []; state.productDetail=''; state.userLogin='';
			return {...state}
		case 'SEARCH':
			state.searchKey = action.value;
			return {...state}
		case 'STOPREDIRECT':
			state.autoRedirect = action.value;
			state.indexTabManage = action.index;
			return {...state}
		case 'ADMIN_GETORDERDETAILS':
			state.orderDetailsAdmin = action.data;
			return {...state}
		case 'ADMIN_GETCATEGORIES':
			state.categories = action.data;
			return {...state}
		case 'ADMIN_SELLINGPRODUCTS':
			console.log(action.data)
			state.amountSelling = action.data;
			return {...state}
		case 'ADMIN_POPUP':
			state.adminPopup = action.data
			return {...state}
		case 'REPORTDATA':
			state.reportData = action.data
			return {...state}
		default:
			return state
	}
}