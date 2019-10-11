import React from 'react';
import axios from '../node_modules/axios'
import './css/cart.css'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {amountOrder} from './action'
import {delOrder} from './action'
import {PopUp} from './action'
import {getOrderData} from './action'
import FormatNum from './component/formatMoney.js'
import Logo from './component/logo.js'
import Footer from './component/footer.js'

class Cart extends React.Component {
  constructor(props){
    super(props);
    this.state={
      amountArr: [],
      alertCart: '',
      totalPay: '',
      popUpCart: {display:'none'},
      linkOrders: '/cart'
    }
  }
  handleChangeAmount=(e,index)=>{
    this.state.amountArr[index] = (e.target.value==0)? 1 : e.target.value
    this.props.dispatch(amountOrder(this.state.amountArr[index], e.target.id))
    this.setState({
      amountArr: [...this.state.amountArr]
    })
  }
  handleDelOrder=(e)=>{
    let targetName = e.target
    if(e.target.tagName=='path'){
      targetName = e.target.parentNode
    }
    let id = (targetName.id =="delAll")? null : targetName.id
    this.props.dispatch(delOrder(id))
    this.setState({
      amountArr: []
    })
    this.props.dispatch(PopUp('block'))
    //----------------save again local Cart-------------------------
    if(id==null){
      localStorage.removeItem("productsID-Cart")
    }
    else{
      let proIdCart =''
      for(var i=0;i<this.props.cart.length;i++){
        proIdCart += this.props.cart[i].id + "|" ;
      }
      localStorage.setItem('productsID-Cart', proIdCart);
    }
    
  }
  handleCheckOrder=(e)=>{
    if(this.props.cart.length>0){
      let bill = 0
      for(let i=0;i<this.props.cart.length;i++){
        bill += this.props.cart[i].eachTotal
      }
      this.setState({
        popUpCart: {display:'block'},
        totalPay: bill
      })
    }
    else{
      this.setState({
        alertCart: 'Không có sản phẩm trong giỏ hàng'
      })
    }
  }
  handleOrderConfirm=(e)=>{
    window.scrollTo(0,0);
    let totalBill = 0;
    for(let i = 0; i<this.props.cart.length; i++){
      totalBill = totalBill + this.props.cart[i].eachTotal;
    }
    var dateCreate = new Date().toString();
    var numObj = dateCreate.match(/\d/g).join("");
    numObj = parseInt(numObj.substr(0, numObj.length-3));
    let order = {
      userId: this.props.userLogin.id,
      totalBill: totalBill,
      numObj: numObj,
      dateCreate: dateCreate,
      statusCheckout: 0
     }
    axios.post('http://localhost:3001/orders', order)
    .then(response=>{
      for(let i = 0; i<this.props.cart.length; i++){
        let orderDetail = {
          userId: this.props.userLogin.id,
          productId: this.props.cart[i].id,
          orderId: response.data.id,
          categoryId:  this.props.cart[i].categoryId,
          amount: this.props.cart[i].amount,
          eachTotal: this.props.cart[i].eachTotal
        }
        axios.post('http://localhost:3001/order_details', orderDetail)
        .then(response=>{
          axios.get("http://localhost:3001/orders?userId="+this.props.userLogin.id+'&statusCheckout=0'+"&_embed=order_details")
          .then(response=>{
            this.props.dispatch(getOrderData(response.data))
            localStorage.removeItem("productsID-Cart") //clear local store
            this.props.dispatch(delOrder(null))
          }).catch((err)=>{
            console.log(err)
          })
        }).catch((err)=>{
          console.log(err)
        })
      }
    }).catch((err)=>{
      console.log(err)
    })
    this.setState({
      linkOrders: '/orderStatus'
    })
  }
  handleClosePopup=(e)=>{
    this.setState({
      popUpCart: {display:'none'}
    })
  }
  render(){
    let styNavRegis = {
      position: 'static',
    }
    let colorul={
      color: 'black'
    }
    var listOrder = ''
    if(this.state.alertCart==''){
        listOrder = this.props.cart.map((item,index)=>{
          this.state.amountArr.push(item.amount)
          return(
            <tr key={index}>
              <td><img src={item.link} height='200'/></td>
              <td>{(item.name).toUpperCase()}</td>
              <td style={{fontFamily: 'UTM Caviar', color: '#e6ae48'}}>{FormatNum(item.price)}<sup>đ</sup></td>
                <td><input index={index} id={item.id} type='number' value={this.state.amountArr[index]} onChange={(e)=>{this.handleChangeAmount(e,index)}}/></td>
              <td style={{fontFamily: 'UTM Caviar', color: '#e6ae48'}}>{FormatNum(item.eachTotal)}<sup>đ</sup></td>
              <td><FontAwesomeIcon id={item.id} icon={faTrashAlt} onClick={(e)=>{this.handleDelOrder(e)}}/></td>
            </tr>
          )
      })
    }
    else{
      listOrder = <tr><td colSpan = '6' style={{color:'navy'}}>{this.state.alertCart}</td></tr>
    }
    return (
        <div className="cart">
          <NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}} index={2}/>
          <NavMenu/>
          <div className='cart-main'>
            <h2>GIỎ HÀNG</h2>
            <img src={require('./images/logo_Rnho.png')}/>
            <table cellSpacing='0' border='1' bordercolor='#e2e2e2'>
              <thead>
                <tr>
                  <th>ẢNH</th>
                  <th>TÊN SẢN PHẨM</th>
                  <th>GIÁ</th>
                  <th>SỐ LƯỢNG</th>
                  <th>TỔNG SỐ</th>
                  <th>XÓA</th>
                </tr>
              </thead>
              <tbody>
                {listOrder}
              </tbody>
            </table>
            <div className='btn-OrderGr'>
              <button onClick={(e)=>{this.handleCheckOrder(e)}}>ĐẶT HÀNG</button>
              <Link to='/redWine'><button>TIẾP TỤC MUA HÀNG</button></Link>
              <button id='delAll' onClick={(e)=>{this.handleDelOrder(e)}}>XÓA</button>
              <Redirect to={this.state.linkOrders}/>
            </div>
          </div>
          <div id='alertCartPopUp' style={this.state.popUpCart}>
            <h3>TỔNG TIỀN ĐƠN HÀNG:&nbsp;<span style={{fontFamily: 'UTM Caviar', color: '#e6ae48'}}>{FormatNum(this.state.totalPay)}<sup>đ</sup></span></h3>
            <h4>Hình thức thanh toán: <span>Tiền mặt</span></h4>
            <button onClick={this.handleOrderConfirm}>ĐỒNG Ý</button>
            <button onClick={this.handleClosePopup}>ĐỂ SAU</button>
          </div>
          <Logo/>
          <Footer/>
        </div>

    );
  }
}
const mapStateToProps=(state)=>{
  return{
    cart: state.cart,
    products: state.products,
    userLogin: state.userLogin
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);