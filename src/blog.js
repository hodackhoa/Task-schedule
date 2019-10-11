import React from 'react';
import axios from '../node_modules/axios'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js'
import Item_Blog from './component/item_blog.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/blog.css'
import './css/item_blog.css'
import Logo from './component/logo.js'
import Footer from './component/footer.js'

class Blog extends React.Component {
  render(){
  	let styNavRegis = {
  		position: 'static'
  	}
  	let colorul={
  		color: 'black'
  	}
    return (
      <div className="blog">
      	<NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}}/>
      	<NavMenu index={4}/>
        <div className='Blog_page'>
            <i><Link to='/'>Trang chủ</Link>/<Link to='/information'>Giới thiệu</Link></i>
            <div className='title'>
                <h2>BLOG</h2>
                <img src={require('./images/logo_Rnho.png')}/>
            </div>
            <div className='blog_item'>
                <div className='item_1'>
                    <Item_Blog name='blog_1' new="Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên
                        men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. 
                        Vang Nổ thăng long tạo cảm giác hương phấn, êm dịu, vui tươi, 
                        sản phẩm được đóng chai dung tích 750ml..."
                    />
                </div>
                <div className='item_2'>
                    <Item_Blog name='blog_2' new="Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên
                        men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. 
                        Vang Nổ thăng long tạo cảm giác hương phấn, êm dịu, vui tươi, 
                        sản phẩm được đóng chai dung tích 750ml..."
                    />
                </div>
                <div className='item_3'>
                    <Item_Blog name='blog_1' new="Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên
                        men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. 
                        Vang Nổ thăng long tạo cảm giác hương phấn, êm dịu, vui tươi, 
                        sản phẩm được đóng chai dung tích 750ml..."
                    />
                </div>
                <div className='item_4'>
                    <Item_Blog name='blog_1' new="Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên
                        men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. 
                        Vang Nổ thăng long tạo cảm giác hương phấn, êm dịu, vui tươi, 
                        sản phẩm được đóng chai dung tích 750ml..."
                    />
                </div>
                <div className='item_5'>
                    <Item_Blog name='blog_2' new="Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên
                        men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. 
                        Vang Nổ thăng long tạo cảm giác hương phấn, êm dịu, vui tươi, 
                        sản phẩm được đóng chai dung tích 750ml..."
                    />
                </div>
                <div className='item_6'>
                    <Item_Blog name='blog_1' new="Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên
                        men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. 
                        Vang Nổ thăng long tạo cảm giác hương phấn, êm dịu, vui tươi, 
                        sản phẩm được đóng chai dung tích 750ml..."
                    />
                </div>
                <div className='item_7'>
                    <Item_Blog name='blog_1' new="Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên
                        men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. 
                        Vang Nổ thăng long tạo cảm giác hương phấn, êm dịu, vui tươi, 
                        sản phẩm được đóng chai dung tích 750ml..."
                    />
                </div>
                <div className='item_'>
                    <Item_Blog name='blog_2' new="Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên
                        men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. 
                        Vang Nổ thăng long tạo cảm giác hương phấn, êm dịu, vui tươi, 
                        sản phẩm được đóng chai dung tích 750ml..."
                    />
                </div>
                <div className='item_9'>
                    <Item_Blog name='blog_1' new="Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên
                        men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. 
                        Vang Nổ thăng long tạo cảm giác hương phấn, êm dịu, vui tươi, 
                        sản phẩm được đóng chai dung tích 750ml..."
                    />
                </div>
            </div>
        </div>
        <Logo/>
        <Footer/>
      </div>
    );
  }
}

export default Blog;