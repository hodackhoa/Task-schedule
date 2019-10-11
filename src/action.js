export function GetData(data){
	return{
		type: 'GETDATA',
		data
	}
}
export function GetUsers(data){
	return{
		type: 'GETUSERS',
		data
	}
}
export function UserLogin(obj){
	return{
		type: 'USERLOGIN',
		obj
	}
}
export function AdminLogin(obj){
	return{
		type: 'ADMINLOGIN',
		obj
	}
}
export function showProDetail(obj){
	return{
		type: 'SHOWPRODETAIL',
		obj
	}
}
export function indexNavMenu(index){
	return{
		type: 'NAVMENUINDEX',
		index
	}
}
export function PopUp(style){
	return{
		type: 'POPUP',
		style
	}
}
export function orderProduct(id){
	return{
		type: 'ORDER',
		id
	}
}
export function amountOrder(amount,id){
	return{
		type: 'AMOUNTORDER',
		amount,
		id
	}
}
export function delOrder(id){
	return{
		type: 'DELORDER',
		id
	}
}
export function getOrderData(data){
	return{
		type: 'GETORDERDATA',
		data
	}
}
export function clearOrderData(val, arrIndex){
	return{
		type: 'CLEAR_ORDERDATA',
		val,
		arrIndex
	}
}
export function getCartLocal(arr){
	return{
		type: 'GETCART_LOCAL',
		arr
	}
}
export function logOut(){
	return{
		type: 'LOGOUT',
	}
}
export function Search(value){
	return{
		type: 'SEARCH',
		value,
	}
}
export function StopRedirect(value, index){
	return{
		type: 'STOPREDIRECT',
		value,
		index
	}
}
export function GetOrderDetails(data){
	return{
		type: 'ADMIN_GETORDERDETAILS',
		data
	}
}
export function GetCategories(data){
	return{
		type: 'ADMIN_GETCATEGORIES',
		data
	}
}
export function AmountSelling(data){
	return{
		type: 'ADMIN_SELLINGPRODUCTS',
		data
	}
}
export function AdminPopup(data){
	return{
		type: 'ADMIN_POPUP',
		data
	}
}
export function ReportData(data){
	return{
		type: 'REPORTDATA',
		data
	}
}