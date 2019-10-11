import React from 'react';
import {connect} from 'react-redux'
import {PopUp} from '../action'
import {orderProduct} from '../action'
import {amountOrder} from '../action'

class AddToCart extends React.Component {
  handleAddToCart=(e)=>{
    this.props.dispatch(PopUp('block'))
    this.props.dispatch(orderProduct(e.target.id));
    this.props.dispatch(amountOrder(0));
  }
  render(){
    return (
      <button className='btn-Default' id={this.props.id} onClick={(e)=>{this.handleAddToCart(e)}}>ADD TO CART</button>
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
    products: state.products,
    userLogin: state.userLogin,
    cart: state.cart
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);