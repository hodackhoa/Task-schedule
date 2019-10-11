import React from 'react';
import axios from '../../node_modules/axios'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Switch} from 'react-router'
import {connect} from 'react-redux'
import {showProDetail} from '../action'
import {indexNavMenu} from '../action'
import AddToCart from './btnAddToCart.js'
import FormatNum from './formatMoney.js'
import {amountOrder} from '../action'

class ProductInf extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  handleLink=(e, objProduct)=>{
    window.scrollTo(0,0)
    this.props.dispatch(showProDetail(objProduct))
    let a = (objProduct.categoryId==0)? 1 : 2;
    this.props.dispatch(indexNavMenu(a))

    let keyDetail = (objProduct.categoryId).toString().concat("|"+ objProduct.id)
    localStorage.setItem('detail-ID', keyDetail)
  }
  static getDerivedStateFromProps(props){
    props.dispatch(amountOrder(1))
    return null
  }
  render(){
  	var styleClip={
  		position: 'absolute',
  		top: '0',
  		backgroundColor: this.props.bgLabel,
  		width: '70px',
  		height: '70px',
  		clipPath: 'polygon(0 0, 0 100%, 100% 0%)'
  	}
  	var styleClip2={
  		position: 'absolute',
  		top: '0',
  		backgroundColor: 'white',
  		width: '75px',
  		height: '75px',
  		clipPath: 'polygon(0 0, 0 100%, 100% 0%)'
  	}
  	var styleClip3={
  		position: 'absolute',
  		top: '0',
  		backgroundColor: this.props.bgLabel,
  		width: '78px',
  		height: '78px',
  		clipPath: 'polygon(0 0, 0 100%, 100% 0%)'
  	}
    return (
      <div className="productInf">
      	<Link to='/productDetail' onClick={(e)=>this.handleLink(e, this.props.item)}><img src={this.props.item.link}/></Link>
      	<p style={{margin: '0', fontFamily: 'Times New Roman'}}>{(this.props.item.name).toUpperCase()}</p>
      	<h3 style={{margin: '.3em 0'}} className='priceStyle'>{FormatNum(this.props.item.price)}<sup>đ</sup></h3>
        <AddToCart id={this.props.item.id}/>
      	<div className='rectang3' style={styleClip3}></div>
      	<div className='rectang2' style={styleClip2}></div>
      	<div className='rectang' style={styleClip}>
      		<h4 style={{position:'absolute',transform: 'rotate(-45deg)',margin:'0', top:'10px', left:'5px', color:'white'}}>{this.props.item.status}</h4>
      	</div>
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
    userLogin: state.userLogin,
    amountOrder: state.amountOrder
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInf);