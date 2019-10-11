import React from 'react';
import '../css/footer.css'


class Footer extends React.Component {
	render() {
		return (
			<div className='footer'>
				<div className='footer_text'>
					<div className='infor'>
						<h5>THÔNG TIN</h5>
						<h6><a href='#' title=''>VỀ CHÚNG TÔI</a></h6><a href='#' title=''></a>
						<h6><a href='#' title=''>GIAO HÀNG</a></h6>
						<h6><a href='#' title=''>CẢM NGHĨ</a></h6>
						<h6><a href='#' title=''>LƯU TRỮ</a></h6>
						<h6><a href='#' title=''>CHÍNH SÁCH RIÊNG TƯ</a></h6>
					</div>
					<div className='buy'>
						<h5>MUA HÀNG</h5>
						<h6><a href='#' title=''>VẬN CHUYỂN VÀ TRA HÀNG</a></h6>
						<h6><a href='#' title=''>MUA HÀNG AN TOÀN</a></h6>
						<h6><a href='#' title=''>VẬN CHUYỂN QUỐC TẾ</a></h6>
						<h6><a href='#' title=''>LIÊN KIẾT</a></h6>
						<h6><a href='#' title=''>DỊCH VỤ GIẢM GIÁ</a></h6>
					</div>
					<div className='email'>
						<h5>GỬI EMAIL</h5>
						<span>Gửi email cho chúng tối để được hổ trợ</span>
						<input type="text" name="fname" placeholder="Enter your email"/>
						<button type='Submit' className='btn-Default'>Gửi</button>
						<ul>
						  	<li><a href="#" target="_blank" title="Twitter"><img src={require('../images/iconTwitter.png')} /></a></li>
							<li><a href="#" target="_blank" title="google"><img src={require('../images/icon_gg.png')} /></a></li>
							<li><a href="#" target="_blank" title="browser"><img src={require('../images/icon_web.png')} /></a></li>
							<li><a href="#" target="_blank" title="wifi"><img src={require('../images/icon_wifi.png')} /></a></li>
						</ul>
					</div>
					<div className='contact'>
						<h5>LIÊN HỆ</h5>
						<p>
							<img src={require('../images/icon_address.png')} />
							Tầng 4, Tòa nhà Hanoi Group  Số 442 Đội Cấn, 
							P. Cống Vị, Q. Ba Đình, Hà Nội
							<img src={require('../images/icon_phone.png')} />(04) 6674 2332-<img src={require('../images/icon_phone.png')} />
							(04) 3786 8904	
						</p>
						<p>
							<img src={require('../images/icon_phone.png')} />(08) 6680 9686<img src={require('../images/icon_mail.png')} />
							<a href='#' target="_blank" title="web">Support@bizweb.vn</a>
						</p>
					</div>
				</div>
				<div className='footer_icon'>
					<div className='row'>
						<p>© Copyright 2008-2014 DKT Technology JSC</p>
						<ul>
						  	<li><a href="#" target="_blank" title="mastercard"><img src={require('../images/icon_mastercard.png')} /></a></li>
							<li><a href="#" target="_blank" title="visa"><img src={require('../images/icon_visa.png')} /></a></li>
							<li><a href="#" target="_blank" title="paypal"><img src={require('../images/icon_paypal.png')} /></a></li>
							<li><a href="#" target="_blank" title="mastercard"><img src={require('../images/icon_mastercard.png')} /></a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;