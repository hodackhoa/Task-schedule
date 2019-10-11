import React from 'react';
import {connect} from 'react-redux'
import {clearOrderData} from '../action'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PopupCheckOut extends React.Component {
  constructor(props){
    super(props);
    this.state={
      stylePop: {display: 'none'},
      check: true,
    }
  }
  handleClosePopup=(e)=>{
    this.setState({
      stylePop: {display: 'none'},
      check: false
    })
  }
  handleConfirmDel=(e)=>{
    this.props.dispatch(clearOrderData(true, this.props.indexOrder))
  }
  static getDerivedStateFromProps(props,state){
    return (props.stylePop.display=='block' && state.check)? {stylePop: props.stylePop} : {check: true}
  }
  render(){
    if(this.props.name==='deleteOrder'){
      return (
        <div className="popupCheckOut" style={this.state.stylePop}>
          <button className='btn-close' onClick={(e)=>{this.handleClosePopup(e)}}>X</button>
          <h3>BẠN MUỐN HỦY ĐƠN HÀNG ?</h3>
          <div className='checkOut-btnGr'>
            <button onClick={(e)=>{this.handleConfirmDel(e); this.handleClosePopup(e); }} className='btn-Default'>CÓ</button>
            <button onClick={(e)=>{this.handleClosePopup(e)}} className='btn-Default'>KHÔNG</button>
          </div>
        </div>
      );
    }
    else if(this.props.name==='checkout'){
      return(
          <div className="popupCheckOut" style={this.state.stylePop}>
            <button className='btn-close' onClick={(e)=>{this.handleClosePopup(e)}}>X</button>
            <h3>CẢM ƠN QUÝ KHÁCH ĐÃ MUA SẮM TẠI WINEHOUSE!</h3>
            <h4>Chúng tôi sẽ giao hàng trong thời gian ngắn nhất</h4>
            <Link to='/redWine'><button className='btn-Default btn-childChecked'>TIẾP TỤC MUA HÀNG</button></Link>
          </div>
        )
    }
      else{
        return(
          <div className="popupCheckOut" style={this.state.stylePop}>
            <button className='btn-close' onClick={(e)=>{this.handleClosePopup(e)}}>X</button>
            <h3>BẠN CHƯA CÓ ĐỊA CHỈ GIAO HÀNG!</h3>
            <Link to='/myAccount'><button className='btn-Default btn-childChecked'>THÊM ĐỊA CHỈ</button></Link>
          </div>
        )
      }
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
export default connect(null, mapDispatchToProps)(PopupCheckOut);