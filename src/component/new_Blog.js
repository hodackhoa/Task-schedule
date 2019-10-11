import React from 'react';
import '../css/new_blog.css'
import Item_Blog from '../component/item_blog.js'
import blog_1 from '../images/blog_1.jpg'
import blog_2 from '../images/blog_2.jpg'


class New_Blog extends React.Component {
	render() {
		return (
			<div className='card_blog'>
				<div className='new_blog'>
					<h4>TIN TỨC & BLOG<br/><img src={require('../images/logo_intro.png')}/></h4>
					<div className='item'>
						<Item_Blog name='blog_1' new="Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên
							men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. 
							Vang Nổ thăng long tạo cảm giác hương phấn, êm dịu, vui tươi, 
							sản phẩm được đóng chai dung tích 750ml..."/>
						<Item_Blog name='blog_2' new="Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên
							men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy trắng mịn. 
							Vang Nổ thăng long ...."/>
					</div>
				</div>
				<div className='user'>
					<h4>KHÁCH HÀNG<br/><img src={require('../images/logo_intro.png')}/></h4>
					<img src={require('../images/circle-1.png')}/>
					<p>
						Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên
						men tự nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy 
						trắng mịn. Vang Nổ thăng long ...
					</p>
					<a href='#' title='read_more'>Read more...</a>
					<div className='img'>
						<img src={require('../images/timthumb_2.jpg')}/>
					</div>
					<h5>GIANG LT</h5>
					<i>Graphic design</i>
				</div> 
			</div>
		);
	}
}

export default New_Blog;