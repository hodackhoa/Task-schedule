import React from 'react';
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import {AdminLogin} from '../../action'
import PopUpConfirm from './popUpConfirm.js'


class AdminHeader extends React.Component {
	constructor(props){
    super(props);
    this.state={
      redirectLink: null,
      display: 'none'
    }
  }
  static getDerivedStateFromProps(props, state){
    return (props.adminLogin!=='')? {display: 'block'}: null
  }
  handleLogout=(e)=>{
    this.props.dispatch(AdminLogin(''))
    localStorage.removeItem("adminLogin")
    this.setState({
      redirectLink: '/admin'
    })
  }
  render(){
    let condiLink = (this.state.redirectLink!==null)? <Redirect to={this.state.redirectLink}/> : null
    return (
	    <div className="adminHeader">
        <img src={require('../../images/logo_1.png')}/>
        <h2>WINE HOUSE</h2>
        <div id ='grBtnLogout' style={{display: this.state.display}}>
          <button className='btn-Default' onClick={this.handleLogout}>ĐĂNG XUẤT</button>
        </div>
        {condiLink}
        <PopUpConfirm/>
	    </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    adminLogin: state.adminLogin
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);