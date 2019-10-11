import React from 'react';
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import {StopRedirect} from '../../action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

class TabNavAdmin extends React.Component {
	constructor(props){
    super(props);
    this.state={
      redirectLink: null,
      showNav: {display: ''}
    }
  }
  static getDerivedStateFromProps(props, state){
    if(props.adminLogin!==''){
      if(props.autoRedirect){
        return {redirectLink: '/admin/dashBoard'}
      }
      else{return null}
    }
    else{
      return {redirectLink: '/admin'}
    }
  }
  handleRedirect=(e)=>{
    let arrLiTab = document.getElementsByClassName('tabNavAdmin')[0].getElementsByTagName('li')
    let indexTab =0;
    for(let i=0;i<arrLiTab.length;i++){
      indexTab =(arrLiTab[i].id == e.target.id)? i : indexTab
    }
    this.setState({
      redirectLink: e.target.id
    })
    this.props.dispatch(StopRedirect(false, indexTab))
  }
  componentDidMount(){
    var arrLiTab = document.getElementsByClassName('tabNavAdmin')[0].getElementsByTagName('li')
    arrLiTab[this.props.indexTabManage].style.backgroundImage = 'linear-gradient(to bottom, rgba(231, 173, 73,.5) 0%, rgba(231, 173, 73,0) 100%)';
    arrLiTab[this.props.indexTabManage].style.borderTop = '3px solid  rgba(231, 173, 73,1)'
  }
  handleShowNavMenu=(e)=>{
    this.setState({
      showNav: (this.state.showNav.display==='block')?{display: 'none'}:{display: 'block'}
    })
  }
  render(){
    let condiLink = (this.state.redirectLink!==null)? <Redirect to={this.state.redirectLink}/> : null
    return (
	    <div className="tabNavAdmin">
        <button id= 'menu480Admin' onClick={this.handleShowNavMenu}><FontAwesomeIcon icon={faBars}/></button>
        <nav style={this.state.showNav}>
          <ul>
            <li id='/admin/dashBoard' onClick={this.handleRedirect}>DASHBOARD</li>
            <li id='/admin/productsManage' onClick={this.handleRedirect}>SẢN PHẨM</li>
            <li id='/admin/orderManage' onClick={this.handleRedirect}>ĐƠN HÀNG</li>
            <li id='/admin/usersManage' onClick={this.handleRedirect}>NGƯỜI DÙNG</li>
            <li id='/admin/categoryManage' onClick={this.handleRedirect}>CÁC LOẠI RƯỢU</li>
            <li id='/admin/reviewManage' onClick={this.handleRedirect}>ĐÁNH GIÁ SẢN PHẨM</li>
          </ul>
        </nav>
        {condiLink}
	    </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    adminLogin: state.adminLogin,
    autoRedirect: state.autoRedirect,
    indexTabManage: state.indexTabManage
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabNavAdmin);