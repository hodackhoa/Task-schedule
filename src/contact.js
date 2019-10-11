import React from 'react';
import axios from '../node_modules/axios'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js'
import Logo from './component/logo.js'
import Footer from './component/footer.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './css/contact.css'

class Contact extends React.Component {
  render(){
  	let styNavRegis = {
  		position: 'static'
  	}
  	let colorul={
  		color: 'black'
  	}
    return (
      <div className="contact">
      	<NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}}/>
      	<NavMenu index={5}/>
      	<div className='Contact_page'>
            <div className='title'>
                <i><Link to='/'>Trang chủ</Link>/<Link to='/contact'>Liên hệ</Link></i>
                <h2>LIÊN HỆ</h2>
                <img src={require('./images/logo_Rnho.png')}/>
            </div>
            <div className='img_form'>
                <div className='img'>
                    <img src={require('./images/map.png')}/>
                </div>
                <div className='form'>
                    <form>
                        <div className='formGr'>
                            <label htmlFor='name'>Your Name</label>
                            <input type='text' id='name' name='name' />
                        </div>
                        <div className='formGr'>
                            <label htmlFor='email'>Your Email</label>
                            <input type='text' id='email' name='email' />
                        </div>
                        <div className='formGr'>
                            <label htmlFor='subject'>Subject</label>
                            <input type='text' id='subject' name='subject' />
                        </div>
                        <div className='formGr'>
                            <label htmlFor='message'>Your Message</label>
                            <input type='text' id='message' name='message' />
                        </div>
                        <button>Gửi</button>
                    </form>
                </div>
            </div>
            <div className='address'>
                <img src={require('./images/logo_1.png')}/>
                <div className='add'>
                    <h5>LIÊN HỆ</h5>
                    <p>
                        <img src={require('./images/icon_address.png')} />
                        Tầng 4, Tòa nhà Hanoi Group  Số 442 Đội Cấn, 
                        P. Cống Vị, Q. Ba Đình, Hà Nội
                        <img src={require('./images/icon_phone.png')} />(04) 6674 2332-<img src={require('./images/icon_phone.png')} />
                        (04) 3786 8904  
                    </p>
                    <p>
                    <img src={require('./images/icon_mail.png')} />
                        <a href='#' target="_blank" title="web">Support@bizweb.vn</a>
                    </p>
                    <h2>FOLLOW US</h2>
                    <ul>
                        <li><a href="#"><img src={require('./images/icon_fb.png')} /></a></li>
                        <li><a href="#"><img src={require('./images/iconTwitter.png')} /></a></li>
                        <li><a href="#"><img src={require('./images/icon_gg.png')} /></a></li>
                        <li><a href="#"><img src={require('./images/icon_in.png')} /></a></li>
                        <li><a href="#"><img src={require('./images/icon_pin.png')} /></a></li>
                    </ul>
                </div>
                    
            </div>
        </div>
        <Logo/>
        <Footer/>
      </div>
    );
  }
}

export default Contact;