import React from 'react';
import axios from '../node_modules/axios'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import {Switch} from 'react-router';
import './css/admin.css'
import Logo from './component/logo.js'
import AdminFooter from './component/adminComponent/footer.js'
import AdminHeader from './component/adminComponent/header.js'
import DashBoard from './component/adminComponent/dashboard.js'
import {AdminLogin} from './action'
import {GetUsers} from './action'
import TabNavAdmin from './component/adminComponent/tabNavAdmin.js'
import {GetOrderDetails} from './action'
import {getOrderData} from './action'
import {GetCategories } from './action'
import {ReportData} from './action'


class Admin extends React.Component {
	constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
      alertLogin: '',
      redirectLink: null
    }
  }
  handleInput=(e)=>{
  	this.setState({
  		[e.target.id]: e.target.value
  	})
  	
  }
  static getDerivedStateFromProps(props, state){
  	let infoLocal = localStorage.getItem('adminLogin');
  	if(infoLocal!=null && props.adminLogin===''){
  		infoLocal = infoLocal.split("|")
  		axios.get('http://localhost:3001/adminAccounts?email='+infoLocal[0]+'&password='+infoLocal[1])
  		.then(response=>{
  			//console.log(response.data)
  			props.dispatch(AdminLogin(response.data[0]))
  		})
  	}
  	else{
  		axios.get('http://localhost:3001/order_details?_expand=product&_expand=order')
	    .then(response=>{
	      //console.log(response.data)
	      props.dispatch(GetOrderDetails(response.data))
	    })
      axios.get('http://localhost:3001/users?_page=1&_limit=1')
      .then(response=>{
        axios.get('http://localhost:3001/products?_page=1&_limit=1')
        .then(response2=>{
          axios.get('http://localhost:3001/orders?_page=1&_limit=1&statusCheckout=0')
          .then(response3=>{
            axios.get('http://localhost:3001/orders?_page=1&_limit=1&statusCheckout=1')
            .then(response4=>{
              let reportTemp = {...props.reportData}
              reportTemp.amountUsers = response.headers['x-total-count']
              reportTemp.amountProducts = response2.headers['x-total-count']
              reportTemp.amountOrdersNo = response3.headers['x-total-count']
              reportTemp.amountOrdersHas = response4.headers['x-total-count']
              props.dispatch(ReportData(reportTemp))

            })
          })
        })
      })
	  }
  	return null;
  }
  handleLogin=(e, obj)=>{
  	e.preventDefault()
  	axios.get('http://localhost:3001/adminAccounts?email='+obj.email+'&password='+obj.password)
    .then(response=>{
      console.log(response.data)
      if(response.data.length>0){
        this.props.dispatch(AdminLogin(response.data[0]))
        localStorage.setItem('adminLogin', response.data[0].email+"|"+response.data[0].password)
        this.setState({
        	redirectLink: '/admin/dashBoard'
        })
      }
      else{
        this.setState({
          alertLogin: 'Email hoặc mật khẩu không đúng, vui lòng thử lại!'
        })
      }
    })
  }
  render(){
  	let condiLink = (this.state.redirectLink!==null)? <Redirect to={this.state.redirectLink}/> : null
  	if(this.props.adminLogin==''){
	    return (
			  <div className="adminPageLogin">
			    	<AdminHeader/>
			  		<div id='loginAdmin'>
			        <h3>ADMINISTRATOR</h3>
              <h4 style={{color: 'red',fontWeight:'normal'}}>{this.state.alertLogin}</h4>
			        <form>
			          <div className='formGr'>
			            <label htmlFor='email'>Email<sup>*</sup></label>
			            <input type='text' id='email' value={this.state.email} onChange={this.handleInput}/>
			          </div>
			          <div className='formGr'>
			            <label htmlFor='password'>Password<sup>*</sup></label>
			            <input type='password' id='password' value={this.state.password} onChange={this.handleInput}/>
			          </div>
			          <div className='formGr'>
			          	<label></label>
			         		<button onClick={(e)=>{this.handleLogin(e, this.state)}} className='btn-Default'>ĐĂNG NHẬP</button>
			         	</div>
			        </form>
			      </div>
            <Logo/>
			      <AdminFooter/>
	    	</div>
	    );
	  }
	  else{
	  	return(
		    <div className="adminPageLogin">
		    	<AdminHeader/>
		    	<TabNavAdmin/>
          {condiLink}
		      <AdminFooter/>
    		</div>
	  	);
	  }
  }
}
const mapStateToProps=(state)=>{
  return{
    adminLogin: state.adminLogin,
    reportData: state.reportData
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);