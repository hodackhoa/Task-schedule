import React from 'react';
import '../css/showImg.css'

class ShowImg extends React.Component {
	render() {
		return (
			<div className='showImg'>
				<img src={require('../images/banner-1.jpg')}/>
				<img src={require('../images/banner-2.jpg')}/>
				<img src={require('../images/banner-3.jpg')}/>
				<img src={require('../images/banner-4.jpg')}/>
				<img src={require('../images/banner-5.jpg')}/>
				<img src={require('../images/banner-6.jpg')}/>
				<img src={require('../images/banner-7.jpg')}/>
				<img src={require('../images/banner-8.jpg')}/>
			</div>
		);
	}
}

export default ShowImg;