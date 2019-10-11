import React from 'react';
import './css/overlayPopup.css'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import {connect} from 'react-redux'
import {PopUp} from './action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartPlus} from '@fortawesome/free-solid-svg-icons'

class OverlayPopup extends React.Component {
  constructor(props){
    super(props);
    this.state={
      popUpStyle: 'none',
      linkCart: ''
    }
  }
	handlePopUp=(e)=>{
		this.props.dispatch(PopUp('none'))
	}
  handleCart=(e)=>{
    window.scrollTo(0,0)
    this.setState({
      linkCart: '/cart'
    })
  }
  render(){
    let amount = 0
    for(let i=0; i<this.props.cart.length;i++){
      amount += parseInt(this.props.cart[i].amount);
    }
  	let stylePopup ={
  		display : this.props.popUpStyle
  	}
    if(this.props.userLogin=='')
      return (
          <div className="overlayPopup" style={stylePopup} onClick={(e)=>this.handlePopUp(e)}>
          	<div id='popUp_login'>
          		<h3>Bạn chưa đăng nhập</h3>
          		<Link to='/login'><button id='btn-loginPopup'>ĐĂNG NHẬP</button></Link>
          		<Link to='/register'><button id='btn-reisterPopup'>ĐĂNG KÝ</button></Link>
          	</div>
          </div>

      )
    else{
      return (
          <Link to='/cart'>
            <button className="messageCart" style={stylePopup} onClick={(e)=>{this.handleCart(e)}}>
              <div id='cart_info'>
                <FontAwesomeIcon icon={faCartPlus}/>
                <div id='popUpNum'><p>{amount}</p></div>
              </div>
            </button>
          </Link>
        )
    }
  }
}
const mapDispatchToProps=(dispatch)=>{
	return{
		dispatch
	}
}
const mapStateToProps=(state)=>{
	return{
		popUpStyle: state.popUp,
    userLogin: state.userLogin,
    cart: state.cart,
    rePopup: state.rePopup
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(OverlayPopup);