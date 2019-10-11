import React from 'react';
import axios from '../node_modules/axios'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js';
import Logo from './component/logo.js'
import Footer from './component/footer.js'
import './css/myAccount.css'
import {connect} from 'react-redux'

class MyAccount extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userLogin: {firstName: "", lastName: ""},
      user_detail: {company: '', address:'', city:'', country:'', phone:''},
    }
  }
  static getDerivedStateFromProps(props, state){
    return (props.userLogin!="")? {
      userLogin: props.userLogin,
      user_detail: (props.user_detail.length>0)? props.user_detail[0] : state.user_detail
    } : null
  }
  handleEditSubmit=(e, userLogin, user_details)=>{
    e.preventDefault()
    var arrInp = document.getElementById('content_myAccount').getElementsByTagName('input')
    var areaText = document.getElementById('content_myAccount').getElementsByTagName('textarea')[0]
    if(arrInp[0].hasAttribute('disabled')){
      e.target.innerHTML = 'Cập nhật địa chỉ'
      for(let i=0; i<arrInp.length;i++){
        arrInp[i].removeAttribute('disabled')
      }
      areaText.removeAttribute('disabled')
    }
    else{
      var tempObjLogin = {...userLogin};
      delete tempObjLogin.user_details;
      axios.patch('http://localhost:3001/users/'+ tempObjLogin.id, tempObjLogin)
      .then(response=>{
        if(this.props.user_detail.length==0){
          user_details.userId = userLogin.id
          axios.post('http://localhost:3001/user_details', user_details)
          .then(response=>{
            //// code here
          }).catch((err)=>{
            console.log(err)
          })
        }
        else{
          axios.patch('http://localhost:3001/user_details/'+ user_details.id, user_details)
          .then(response=>{
            //// code here
          }).catch((err)=>{
            console.log(err)
          })
        }
      }).catch((err)=>{
        console.log(err)
      })
      //----------------------
      const attrDis = document.createAttribute('disabled')
      for(let i=0; i<arrInp.length;i++){
        const attrDis = document.createAttribute('disabled')
        arrInp[i].setAttributeNode(attrDis)
      }
      areaText.setAttributeNode(attrDis);
      e.target.innerHTML = 'Chỉnh sửa địa chỉ'
      document.getElementsByClassName('popupUpdateInf')[0].style.display = 'block';
    }
  }
  handleChangeInf=(e)=>{
    this.state[e.target.className][e.target.id] = e.target.value
    this.setState({
      userLogin : {...this.state.userLogin}
    })
  }
  handleClosePop=(e)=>{
    e.target.parentElement.style.display = 'none';
  }
  render(){
    let styNavRegis = {
      position: 'static',
    }
    let colorul={
      color: 'black'
    }
    return (
        <div className="myAccount">
          <NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}} index={0}/>
          <NavMenu/>
          <div className='myAccount-main'>
            <div id='inf_Account'>
              <h2>THÔNG TIN TÀI KHOẢN</h2>
              <img src={require('./images/logo_Rnho.png')}/>
              <div id='content_myAccount'>
                <h3>ĐỊA CHỈ CỦA BẠN</h3>
                <form>
                  <div className='formGr'>
                    <label htmlFor='firstName'>Tên</label>
                    <input type='text' id='firstName' disabled className='userLogin' value={this.state.userLogin.firstName} onChange={this.handleChangeInf} />
                  </div>
                  <div className='formGr'>
                    <label htmlFor='lastName'>Họ & tên đệm</label>
                    <input type='text' id='lastName' disabled className='userLogin' value={this.state.userLogin.lastName} onChange={this.handleChangeInf}/>
                  </div>
                  <div className='formGr'>
                    <label htmlFor='company'>Company</label>
                    <input type='text' id='company' disabled className='user_detail' value={this.state.user_detail.company} onChange={this.handleChangeInf}/>
                  </div>
                  <div className='formGr'>
                    <label htmlFor='address'>Địa chỉ</label>
                    <textarea type='text' id='address' disabled className='user_detail' value={this.state.user_detail.address} onChange={this.handleChangeInf} />
                  </div>
                  <div className='formGr'>
                    <label htmlFor='city'>Thành phố</label>
                    <input type='text' id='city' disabled className='user_detail' value={this.state.user_detail.city} onChange={this.handleChangeInf}/>
                  </div>
                  <div className='formGr'>
                    <label htmlFor='country'>Quốc tịch</label>
                    <input type='text' id='country' disabled className='user_detail' value={this.state.user_detail.country} onChange={this.handleChangeInf}/>
                  </div>
                  <div className='formGr'>
                    <label htmlFor='phone'>Phone</label>
                    <input type='number' id='phone' disabled className='user_detail' value={this.state.user_detail.phone} onChange={this.handleChangeInf}/>
                  </div>
                  <label></label>
                  <button onClick={(e)=>{this.handleEditSubmit(e, this.state.userLogin, this.state.user_detail)}}>Chỉnh sửa địa chỉ</button>
                </form>
              </div>
            </div>
          </div>
          <div className='popupUpdateInf'>
            <h3>Thông Tin Tài Khoản đã được cập nhật!</h3>
            <button className='btn-Default' onClick={this.handleClosePop}>OK</button>
          </div>
          <Logo/>
          <Footer/>
        </div>

    );
  }
}
const mapStateToProps=(state)=>{
  return{
    userLogin: state.userLogin,
    user_detail: state.userLogin.user_details
  }
}
export default connect(mapStateToProps,null)(MyAccount);