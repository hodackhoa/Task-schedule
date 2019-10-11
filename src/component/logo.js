import React from 'react';
import '../css/logo.css'


class Logo extends React.Component {
	render() {
		return (
			<div className='logo'>
				<div className='logo_img'>
					<img src={require('../images/logo_banner-1.png')}/>
				</div>
				<div className='logo_img'>
					<img src={require('../images/logo_banner-2.png')}/>
				</div>
				<div className='logo_img'>
					<img src={require('../images/logo_banner-3.png')}/>
				</div>
			</div>
		);
	}
}
export default Logo;