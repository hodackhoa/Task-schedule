import React from 'react';
import axios from '../node_modules/axios'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js';
import Logo from './component/logo.js'
import Footer from './component/footer.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/infor.css'

class Information extends React.Component {
  render(){
  	let styNavRegis = {
  		position: 'static'
  	}
  	let colorul={
  		color: 'black'
  	}
    return (
    <div className="information">
      <NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}}/>
      <NavMenu index={3}/>
      <div className='introduce'>
        <i><Link to='/'>Trang chủ</Link>/<Link to='/information'>Giới thiệu</Link></i>
        <div className='title'>
          <h2>GIỚI THIỆU</h2>
          <img src={require('./images/logo_Rnho.png')} />
        </div>
        <div className='img_para'>
            <div className='image'>
              <img src={require('./images/bg_intro.jpg')} />
            </div>
            <div className='para'>
              <h2>CHÀO MỪNG BẠN ĐẾN VỚI  WINE HOURSE</h2>
              <p>
                Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. Vang Nổ thăng long tạo cảm giác hương phấn, êm dịu, vui tươi, 
                sản phẩm được đóng chai dung tích 750ml.Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. Vang Nổ thăng long tạo cảm giác hương phấn, êm dịu, vui tươi, 
                sản phẩm được đóng chai dung tích 750ml.Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. Vang Nổ thăng long tạo cảm giác hương phấn, êm dịu, vui tươi, 
                sản phẩm được đóng chai dung tích 750ml...
              </p>
            </div>
          </div> 
      </div>
      <Logo/>
      <Footer/>
    </div>
    );
  }
}

export default Information;