import React from 'react';
import axios from '../../node_modules/axios'
import '../css/navRegister.css'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import {Switch} from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {UserLogin} from '../action'
import {logOut} from '../action'
import {Search} from '../action'

class NavRegister extends React.Component{
  constructor(props){
    super(props);
    this.state={
      userLocal: '',
      labelLogin: 'Đăng nhập',
      labelRegis: 'Đăng ký',
      labelCart: '',
      labelOrder: '',
      redirectLink: null,
      inputSearch: '',
      notLogin: true,
      tryTo: true
    }
  }
  handleStatusLogin=(e)=>{
    if(localStorage.getItem("inforLogin")!=null){
      this.setState({
        userLocal: '',
        labelLogin: 'Đăng nhập',
        labelRegis: 'Đăng ký',
        labelCart: '',
        labelOrder: '',
        redirectLink: '/'
      })
      localStorage.removeItem('inforLogin')
      this.props.dispatch(logOut())
    }
    else{
      this.setState({
        redirectLink: '/login'
      })
    }
  }
  componentDidMount(){
    let arrLink = document.getElementsByClassName('NavRegister')[0].getElementsByTagName('a');
    for(var i=0;i<arrLink.length;i++){
      if(arrLink[i].style.color == '#e6ae48'){
        arrLink[i].style.color = 'white'
      }
    }
    if(this.props.index !== undefined){
      arrLink[this.props.index].children[0].style.color = '#e6ae48';
      arrLink[this.props.index].children[0].style.textDecoration = 'underline';
    }
  }
  handleInputSearch=(e)=>{
    this.setState({
      inputSearch: e.target.value
    })
  }
  handleSearch=(e, textSearch)=>{
    console.log(e.target)
    if(textSearch!=''){
      this.props.dispatch(Search(textSearch))
      this.setState({
        inputSearch:'',
        redirectLink: '/search'
      })
    }
  }
  static getDerivedStateFromProps(props, state){
    let a = null;
    let infLocalUser = localStorage.getItem("inforLogin")
    if(props.userLogin=='' && infLocalUser!= null){
      infLocalUser = infLocalUser.split("|")
      axios.get('http://localhost:3001/users?email='+infLocalUser[0]+'&password='+infLocalUser[1]+'&_embed=user_details')
      .then(response=>{
        //console.log(response.data)
        if(response.data.length>0){
          props.dispatch(UserLogin(response.data[0]))
        }
      })
    }
    else{
      if(props.userLogin!=''){
        a = 'chào,'+ " " + props.userLogin.lastName
        return{
          userLocal: a,
          labelLogin: 'Đăng xuất',
          labelRegis:'',
          labelCart: 'Giỏ hàng',
          labelOrder: 'Đơn hàng'
        }
      }
    }
    return null;
  }
  render(){
    const condiLink = (this.state.redirectLink==null)? null: <Redirect to={this.state.redirectLink}/>
    return (
      <div className="NavRegister" style={this.props.style.divRegis}>
        <ul style={this.props.style.ulstyle}>
        	<Link to='/myAccount' style={this.props.style.ulstyle}><li>{this.state.userLocal}</li></Link>
        	<Link to='/orderStatus' style={this.props.style.ulstyle}><li>{this.state.labelOrder}</li></Link>
        	<Link to='/cart' style={this.props.style.ulstyle}><li>{this.state.labelCart}</li></Link>
        	<a><li style={this.props.style.ulstyle} onClick={(e)=>{this.handleStatusLogin(e)}}>{this.state.labelLogin}</li></a>
        	<Link to='/register' style={this.props.style.ulstyle}><li>{this.state.labelRegis}</li></Link>
        </ul>
        <div id='search'>
        	<input placeholder='Tìm kiếm ở đây...' value={this.state.inputSearch} onChange={this.handleInputSearch} style={this.props.style.ulstyle}/>
        	<FontAwesomeIcon icon={faSearch} style={this.props.style.ulstyle} onClick={(e)=>this.handleSearch(e,this.state.inputSearch)}/>
        </div>
        {condiLink}
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    users: state.users,
    userLogin: state.userLogin,
    adminLogin: state.adminLogin
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavRegister);