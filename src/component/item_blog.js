import React from 'react';
import '../css/item_blog.css'

class Item_Blog extends React.Component {
	render() {
		return (
				<div className='new'>
						<img src={require('../images/' + this.props.name + '.jpg')}/>
						<h5>VANG THĂNG LONG CLASSIC<br/><span>Đăng bởi Giangle | 30/06/2015 | 60 bình luận</span></h5>
						<p>
							{this.props.new}
							<a href='#' title='read_more'>Read more...</a>
						</p>
						
					</div>
		);
	}
}

export default Item_Blog;