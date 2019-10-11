import React from 'react';
import axios from '../node_modules/axios'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js';
import Logo from './component/logo.js'
import Footer from './component/footer.js'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Switch} from 'react-router';
import { Redirect } from 'react-router-dom'
import {UserLogin} from './action'
import './css/loginPage.css'


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
      linkRoute: '/login',
      inforAlert: 'Nếu có một tài khoản xin vui lòng đăng nhập',
      styleAlert: 'black',
    }
  }
  handleInput=(e)=>{
    this.setState({
      [e.target.id] : e.target.value,
      inforAlert: 'Nếu có một tài khoản xin vui lòng đăng nhập',
      styleAlert: 'black'
    })
  }
  handleLogin=(e,inforInp)=>{
    e.preventDefault()
    axios.get('http://localhost:3001/users?email='+inforInp.email+'&password='+inforInp.password+'&_embed=user_details')
    .then(response=>{
      //console.log(response.data)
      if(response.data.length==0){
        this.setState({
          inforAlert: 'Email hoặc password không đúng, vui lòng thử lại',
          styleAlert: 'red'
        })
      }
      else{
        this.props.dispatch(UserLogin(response.data[0]))
        localStorage.setItem('inforLogin', response.data[0].email+"|"+response.data[0].password)
        this.setState({
          linkRoute: '/'
        })
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  render(){
    let styNavRegis = {
      position: 'static',
    }
    let colorul={
      color: 'black'
    }
    return (
      <div className="login">
        <NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}} index={3}/>
        <NavMenu/>
        <div className='form_login'>
          <div id='title_formLogin'>
            <h2>ĐĂNG NHẬP</h2>
            <img src={require('./images/logo_Rnho.png')}/>
          </div>
          <div id='btn_formLogin'>
            <Link to='/register'><button>ĐĂNG KÝ</button></Link>
          </div>
          <div id='content_formLogin'>
            <h3>KHÁCH HÀNG ĐĂNG NHẬP</h3>
            <h5 style={{color: this.state.styleAlert}}>{this.state.inforAlert}</h5>
            <form>
              <div className='formGr'>
                <label htmlFor='email'>Email<sup>*</sup></label>
                <input type='text' id='email' value={this.state.email} onChange={this.handleInput}/>
              </div>
              <div className='formGr'>
                <label htmlFor='password'>Password<sup>*</sup></label>
                <input type='password' id='password' value={this.state.password} onChange={this.handleInput}/>
              </div>
              <div style={{marginBottom: '1.5em'}}>
                <label></label>
                <label id='labelForget'><input type='checkbox' value='forgetPass' id='forgetPass'/>&nbsp;Quên mật khẩu</label><br/> 
              </div>
              <label></label>
              <button onClick={(e)=>{this.handleLogin(e, this.state)}} className='btn-Default'>ĐĂNG NHẬP</button>
              <Redirect to= {this.state.linkRoute}/>
            </form>
          </div>
        </div>
        <Logo/>
        <Footer/>
      </div>

    );
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
export default connect(null, mapDispatchToProps)(Login);