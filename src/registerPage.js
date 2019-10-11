import React from 'react';
import axios from '../node_modules/axios'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js';
import Logo from './component/logo.js'
import Footer from './component/footer.js'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './css/registerPage.css'
import Validator from './component/validator.js'
import { Component } from 'react'
import {PostData} from './action'
import Popup from './component/popup';

class Register extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list:
            [
                {firstName:''},
                {lastName:''},
                {email:''},
                {password:''},
                {rePassword:''}
            ],
            button:'',
            text:'',
            errors:{},
            isChecked:'false',
            showPopup: {display: 'none'},
            check:false,
            linkLogin: '/register'
        };

    const rules = [
            {
            field: 'firstName',
            method: 'isEmpty',
            validWhen: false,
            message: 'The firstName field is required.',
            },
            {
            field: 'lastName',
            method: 'isEmpty',
            validWhen: false,
            message: 'The lastName field is required.',
            },
            {
            field: 'email',
            method: 'isEmpty',
            validWhen: false,
            message: 'The email field is required.',
            },
            {
            field: 'email',
            method: 'isEmail',
            validWhen: true,
            message: 'The email must be a valid email address.',
            },
            {
            field: 'password',
            method: 'isLength',
            args: [{min: 5}],
            validWhen: true,
            message: 'The name must be at least 5 characters.',
            },
            {
            field: 'password',
            method: 'isLength',
            args: [{max: 12}],
            validWhen: true,
            message: 'The name must be at max 12 characters.',
            },
            {
            field: 'password',
            method: 'isEmpty',
            validWhen: false,
            message: 'The password field is required.',
            },
            {
            field: 'rePassword',
            method: 'isEmpty',
            validWhen: false,
            message: 'The rePassword field is required.',
            }

        ];
        this.validator = new Validator(rules);
    };


    handleChange = (e) =>{
        this.setState({ 
            [e.target.name] : e.target.value,
            errors: this.validator.validate(this.state)
        });
    };

    hangdleChecked = (e) => {
        if(this.state.isChecked){
            alert("New posts will always be notified to you and Thank You.")
        }
    };

    togglePopup = (e,obj)=> {
        if( obj.firstName!= null && obj.lastName!= null && obj.email!= null &&obj.password!= null && obj.password === obj.rePassword){
            const user = this.props.listUser.find( x=> x.email === obj.email);
            if(user){
                e.preventDefault();
                this.setState({
                    button:'OK',
                    text:'TÀI KHOẢN ĐÃ TỒN TẠI, VUI LÒNG THỬ LẠI!',
                    showPopup: {display: 'block'},
                    check:false
                });
            }else{
                e.preventDefault();
                this.setState({
                button:'OK',
                text:'ĐĂNG KÝ THÀNH CÔNG!',
                showPopup:  {display: 'block'},
                check:true
            });
            }
        }else {
            e.preventDefault();
            this.setState({
                errors: this.validator.validate(this.state)
            })
        }
    };

    hangdleSubmit = (e,obj) =>{
        e.preventDefault()
        if(obj.check){
            axios.post('http://localhost:3001/users',
            {
                firstName:obj.firstName,
                lastName:obj.lastName,
                email:obj.email,
                password:obj.password,
            })
            .then(res => {
                this.setState({
                    linkLogin: '/login',
                    showPopup: {display: 'none'},
                })
            })
        }
        this.setState({
            showPopup: {display: 'none'},
        })
    }

  render(){
    const {errors} = this.state;
    let styNavRegis = {
      position: 'static',
    }
    let colorul={
      color: 'black'
    }
    let style = {
        display:'block'
    }
    return (
        <div className="register">
            <NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}} index={4}/>
            <NavMenu/>
            <div className='form-Register'>
                <div id='title_Register'>
                    <h2>ĐĂNG KÍ</h2>
                    <img src={require('./images/logo_Rnho.png')}/>
                </div>
                <div id='btn_Register'>
                    <Link to='/login'><button>ĐĂNG NHẬP</button></Link>
                </div>
                <div id='content_Register'>
                    <h3>THÔNG TIN CÁ NHÂN</h3>
                    <form>
                        <div className='formGr'>
                            <label htmlFor='firstName'>Tên Trước<sup>*</sup></label>
                            <input type='text' id='firstName' onClick={this.handleChange} name='firstName'value={this.state.list.firstName} onChange={this.handleChange}/>
                            <span></span>
                            {errors.firstName && <div className="validation" style={style}>{errors.firstName}</div>}
                        </div>
                        <div className='formGr'>
                            <label htmlFor='lastName'>Tên Sau<sup>*</sup></label>
                            <input type='text' id='lastName' onClick={this.handleChange} name='lastName'value={this.state.list.lastName} onChange={this.handleChange}/>
                            <span></span>
                            {errors.lastName && <div className="validation" style={{display: 'block'}}>{errors.lastName}</div>}
                        </div>  
                        <div className='formGr'>
                            <label htmlFor='email'>Email<sup>*</sup></label>
                            <input type='text' id='email' onClick={this.handleChange} name='email' value={this.state.list.email} onChange={this.handleChange}/><span></span>
                            {errors.email && <div className="validation" style={{display: 'block'}}>{errors.email}</div>}
                        </div>
                        <div className='formGr'>
                            <label htmlFor='password'>Password<sup>*</sup></label>
                            <input type='password' id='password' onClick={this.handleChange} name='password' value={this.state.list.password}   onChange={this.handleChange}/><span></span>
                            {errors.password && <div className="validation" style={{display: 'block'}}>{errors.password}</div>}
                        </div>
                        <div className='checkbox'>
                            <input type="checkbox" name="thethao" onChange ={this.hangdleChecked} />
                            <span>Đăng kí để nhận bảng tin</span>
                        </div>
                        <h3>THÔNG TIN ĐĂNG NHẬP</h3>
                        <div className='formGr'>
                            <label htmlFor='rePassword'>Xác nhận mật khẩu<sup>*</sup></label>
                            <input type='password' id='rePassword' onClick={this.handleChange} name='rePassword'value={this.state.list.rePassword} onChange={this.handleChange}/><span></span>
                            {errors.rePassword && <div className="validation" style={{display: 'block'}}>{errors.rePassword}</div>}
                        </div>
                        <div className='send_Return'>
                            <button onClick={(e)=>this.togglePopup(e,this.state)} >Gửi</button>
                            <Link to='/login'><button>Quay Lại</button></Link>
                        </div>
                    </form>  
                </div>
            </div>
            <Popup showPopup={this.state.showPopup} text={this.state.text} button={this.state.button} closePopup={(e)=>this.hangdleSubmit(e,this.state)}/>
            <Redirect to={this.state.linkLogin}/>
            <Logo/>
            <Footer/>
        </div>    
    );
  }
}
//closePopup={(e)=>this.hangdleSubmit(e,this.state)}
const mapStateToProps=(state)=>{
  return{
    listUser: state.users
  }
}

export default connect(mapStateToProps, null) (Register);