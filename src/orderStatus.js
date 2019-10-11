import React from 'react';
import axios from '../node_modules/axios'
import './css/orderStatus.css'
import {connect} from 'react-redux'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js';
import Logo from './component/logo.js'
import Footer from './component/footer.js'
import OrderDetails from './component/orderDetails.js'
import PopupCheckOut from './component/popupCheckOut.js'
import {clearOrderData} from './action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons'
import FormatNum from './component/formatMoney.js'
import FormatDate from './component/formatDate.js';

class OrderStatus extends React.Component {
  constructor(props){
    super(props);
    this.state={
      orderData: [],
      userLogin: '',
      user_detail: {address:'', phone:''},
      stylePop: {display: 'none'},
      actionOrder: '',
      historyStatus: true
    }
  }
  handelOrderDetails=(e,index)=>{
    var arrListDetails = document.getElementsByClassName('listDetails')
    for(let i=0;i<arrListDetails.length;i++){
      if(i != index){
        arrListDetails[i].style.display = 'none'
      }
    }
    let liDetailSty = arrListDetails[index].style.display
    arrListDetails[index].style.display = (liDetailSty=='none'||liDetailSty=='')? 'block':'none'
  }
  static getDerivedStateFromProps(props,state){
    var orderTemp=[]
    if(props.orderCondition[0]){
      const res = axios.delete("http://localhost:3001/orders/"+ props.orderCondition[2])
      state.orderData.splice(props.orderCondition[1],1)
      orderTemp = [...state.orderData]
      props.dispatch(clearOrderData(false, null))
      return { orderData: [...orderTemp]}
    }
    else{
      if(props.orderData.length>0 && state.historyStatus){
        return {orderData: props.orderData}
      } 
      else {
        if(props.userLogin!=''){
          return{
            userLogin: props.userLogin,
            user_detail: (props.user_detail.length>0)? props.user_detail[0]: {...state.user_detail}
          }
        }
        else{return null}
      }
    }
  }
  componentDidMount(){
    console.log(this.props.user_detail)
    this.setState({
      userLogin: this.props.userLogin,
      user_detail: (this.props.user_detail.length>0)? this.props.user_detail[0]: {...this.state.user_detail}
    })
  }
  handleCheckout=(e,index)=>{
    if(e.target.name==='checkout'){
      if(this.state.user_detail.address===''){
        this.setState({
          stylePop: {display: 'block'},
          actionOrder: 'notAddress'
        })
      }
      else{
        axios.patch("http://localhost:3001/orders/"+e.target.id, {statusCheckout: 1})
        .then(response=>{
          this.state.orderData.splice(index,1)
          this.setState({
            orderData: [...this.state.orderData],
            stylePop: {display: 'block'},
            actionOrder: 'checkout'
          })
        }).catch((err)=>{
          console.log(err)
        })
      }
    }
    else{
      this.setState({
        stylePop: {display: 'block'},
        actionOrder: e.target.name,
        indexOrder: [index, e.target.id] 
      })
    }
  }
  handleHistoryOrders=(e)=>{
    if(this.state.historyStatus){
      e.target.innerHTML = 'Đơn hàng chưa thanh toán'
      axios.get("http://localhost:3001/orders?userId="+this.props.userLogin.id+'&statusCheckout=1'+"&_embed=order_details")
      .then(response=>{
        this.setState({
          orderData: response.data,
          historyStatus: false
        })
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
      this.setState({
        orderData: [],
        historyStatus: true
      })
      e.target.innerHTML = 'Lịch sử đơn hàng'
    }
  }
  render(){
    let styNavRegis = {
      position: 'static',
    }
    let colorul={
      color: 'black'
    }
    const listOrder = this.state.orderData.map((item,index)=>{
      var btnGrCheckout = (this.state.historyStatus)?
        (
          <div className='orS-orderChild orS-orderChild-btn'>
            <button name='deleteOrder' id={item.id} onClick={(e)=>this.handleCheckout(e,index)}>HỦY ĐƠN HÀNG</button>
          </div>
        ):
        (
          <div className='orS-orderChild orS-orderChild-btn'>
            <h4>Đã Thanh Toán</h4>
          </div>
        )
      return(
          <div key={index} className='orS-order'>
            <div className='orS-orderChild id'>
              <h3>#{index+ 1}</h3>
              <h3>NO. {item.numObj}</h3>
              <h4>{FormatDate(item.dateCreate)}</h4>
            </div>
            <div className='orS-orderChild orS-orderChild-Infor'>
              <h3>TỔNG TIỀN: <span className='priceStyle'>{FormatNum(item.totalBill)}<sup>đ</sup></span></h3>
              <a onClick={(e)=>{this.handelOrderDetails(e,index)}}>Chi tiết</a>
            </div>
            {btnGrCheckout}
            <div className='listDetails'>
              <OrderDetails orderDetails= {item.order_details}/>
            </div>
          </div>
        )
    })
    return (
      <div className="orderStatus">
        <NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}} index={1}/>
        <NavMenu/>
        <div className='orderStatus-main'>
          <div className='orS-title'>
            <h2>ĐƠN HÀNG</h2>
            <img src={require('./images/logo_Rnho.png')}/>
          </div>
          <div className='orS-listOrder'>
            <h3>DANH SÁCH ĐƠN HÀNG</h3>
            <a onClick={this.handleHistoryOrders}>Lịch sử đơn hàng</a>
            {listOrder}
          </div>
          <div className='orS-userInf'>
            <div className = 'orS-userInf-content'>
              <h3>THÔNG TIN KHÁCH HÀNG</h3>
              <div className='orS_grInfAccount'>
                <FontAwesomeIcon icon={faUser}/>
                <div>
                  <h4>{this.state.userLogin.firstName} {this.state.userLogin.lastName}</h4>
                  <h4>{this.state.userLogin.email}</h4>
                </div>
              </div>
              <div className='orS_grInfAccount'>
                <FontAwesomeIcon icon={faMapMarkerAlt}/>
                <h4>{this.state.user_detail.address}</h4>
              </div>
              <div className='orS_grInfAccount'>
                <FontAwesomeIcon icon={faPhoneAlt}/>
                <h4>{this.state.user_detail.phone}</h4>
              </div>
            </div>
          </div>
        </div>
        <PopupCheckOut name={this.state.actionOrder} stylePop={this.state.stylePop} indexOrder={this.state.indexOrder}/>
        <Logo/>
        <Footer/>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    userLogin: state.userLogin,
    orderData: state.orderData,
    user_detail: (state.userLogin!=='')? state.userLogin.user_details : [],
    orderCondition: state.orderCondition
  }
}
export default connect(mapStateToProps,null)(OrderStatus);