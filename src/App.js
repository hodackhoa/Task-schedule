import React from 'react';
import './App.css';
import './css/responsive480px.css'
import './css/res640.css'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Switch} from 'react-router';
import {GetData} from './action'
import {GetUsers} from './action'
import {getOrderData} from './action'
import axios from '../node_modules/axios'
import NavMenu from './component/navMenu.js'
import Home from './home.js'
import RedWine from './redWine.js'
import InterWine from './interWine.js'
import Information from './infor.js'
import Blog from './blog.js'
import Contact from './contact.js'
import ProductDetail from './productDetail.js'
import Login from './loginPage.js'
import Register from './registerPage.js'
import MyAccount from './myAccount.js'
import OrderStatus from './orderStatus'
import ListFavourite from './listFavourite'
import Cart from './cart'
import Logo from './component/logo.js'
import Footer from './component/footer.js'
import OverlayPopup from './overlayPopup.js'
import SearchPage from './search.js'
import Admin from './admin.js'
import DashBoard from './component/adminComponent/dashboard.js'
import ProductsManage from './component/adminComponent/productsManage.js'
import OrderManage from './component/adminComponent/orderManage.js'
import UsersManage from './component/adminComponent/usersManage.js'
import CategoryManage from './component/adminComponent/categoryManage.js'
import ReviewManage from './component/adminComponent/reviewManage.js'
import {GetCategories } from './action'

class App extends React.Component {
	componentDidMount(){
    axios.get('http://localhost:3001/products?_embed=product_details&_expand=category')
    .then(response=>{
    	this.props.dispatch(GetData(response.data))
    }).catch((err)=>{
    	console.log(err)
    })
    axios.get('http://localhost:3001/categories?_embed=products')
    .then(response=>{
    	this.props.dispatch(GetCategories(response.data))
    }).catch((err)=>{
    	console.log(err)
    })
  }
  componentDidUpdate(){
  	if(this.props.userLogin!=''){
	  	axios.get("http://localhost:3001/orders?userId="+this.props.userLogin.id+'&statusCheckout=0'+"&_embed=order_details")
	    .then(response=>{
	      this.props.dispatch(getOrderData(response.data))
	    }).catch((err)=>{
	    	console.log(err)
	    })
	  }
  }

  render(){
    return (
    	<Router>
		    <div className="App">
		    	<Switch>
			      <Route path='/' exact component={Home}/>
			      <Route path='/redWine' exact component={RedWine}/>
			      <Route path='/interWine' exact component={InterWine}/>
			      <Route path='/information' exact component={Information}/>
			      <Route path='/blog' exact component={Blog}/>
			      <Route path='/contact' exact component={Contact}/>
			      <Route path='/productDetail' exact component={ProductDetail}/>
			      <Route path='/myAccount' exact component={MyAccount}/>
			      <Route path='/orderStatus' exact component={OrderStatus}/>
			      <Route path='/listFavourite' exact component={ListFavourite}/>
			      <Route path='/cart' exact component={Cart}/>
			      <Route path='/login' exact component={Login}/>
			      <Route path='/register' exact component={Register}/>
			      <Route path='/search' exact component={SearchPage}/>
			      <Route path='/admin' exact component={Admin}/>
			      <Route path='/admin/dashBoard' exact component={DashBoard}/>
			      <Route path='/admin/productsManage' exact component={ProductsManage}/>
			      <Route path='/admin/orderManage' exact component={OrderManage}/>
			      <Route path='/admin/usersManage' exact component={UsersManage}/>
			      <Route path='/admin/categoryManage' exact component={CategoryManage}/>
			      <Route path='/admin/reviewManage' exact component={ReviewManage}/>
			    </Switch>
			    <OverlayPopup/>
		    </div>
	    </Router>
    );
  }
}
const mapDispatchToProps=(dispatch)=>{
	return{
		dispatch
	}
}
const mapStateToProps=(state)=>{
	return{
		userLogin: state.userLogin,
		adminLogin: state.adminLogin
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
