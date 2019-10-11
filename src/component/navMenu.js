import React from 'react';
import axios from '../../node_modules/axios'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Switch} from 'react-router'
import {connect} from 'react-redux'
import {getCartLocal} from '../action'
import ResponsiveMenu from './responsiveMenu.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {ResponsiveChange} from '../action'

class NavMenu extends React.Component {
	constructor(props){
    super(props);
    this.state={
      hasGetlocal: true,
      showNav: {display: ''}
    }
  }
  handleShowNavMenu=(e)=>{
    this.setState({
      showNav: (this.state.showNav.display==='block')?{display: 'none'}:{display: 'block'}
    })
  }
	componentDidMount(){
		let arrLink = document.getElementsByClassName('menubar')[0].getElementsByTagName('a');
		for(var i=0;i<arrLink.length;i++){
			if(arrLink[i].style.color == '#e6ae48'){
				arrLink[i].style.color = 'white'
			}
		}
		if(this.props.index!=undefined){
  			arrLink[this.props.index].style.color = '#e6ae48';
  		}
	}
	static getDerivedStateFromProps(props,state){
    //------------------------------------
    var arrProsLocal = localStorage.getItem("productsID-Cart")
    if(props.products.length>0 && state.hasGetlocal && arrProsLocal!=null&&props.cart.length==0){
      arrProsLocal = arrProsLocal.split("|")
      props.dispatch(getCartLocal(arrProsLocal))
      return {hasGetlocal: false}
    }
    else{
      return {responseChange: false}
    }
  }
  render(){
    return (
	     <div className="menubar">
        <button id= 'menuBar480' onClick={this.handleShowNavMenu}><FontAwesomeIcon icon={faBars}/></button>
	     	<img src={require('../images/logo_1.png')}/>
	     	<nav style={this.state.showNav}>
	      	<ul>
	      		<li><Link to='/'>TRANG CHỦ</Link></li>
	      		<li><Link to='/redWine'>RƯỢU VANG</Link></li>
	      		<li><Link to='/interWine'>RƯỢU NGOẠI</Link></li>
	      		<li><Link to='/information'>THÔNG TIN</Link></li>
	      		<li><Link to='/blog'>BLOG</Link></li> 
	      		<li><Link to='/contact'>LIÊN HỆ</Link></li>
	      	</ul>
	      </nav>
	     </div>
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
    cart: state.cart,
    products: state.products,
    resposiveChange: state.resposiveChange
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);