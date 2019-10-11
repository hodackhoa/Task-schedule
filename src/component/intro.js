import React from 'react';
import '../css/intro.css'
import {connect} from 'react-redux'
import AddToCart from './btnAddToCart.js'
import FormatNum from './formatMoney.js'

class Intro extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			inforIntro:{name:"",link:"",infor:"", price:''}
		}
	}
	static getDerivedStateFromProps(props, state) {
		if(props.inforIntro.length > 0){
			return {
				inforIntro: (props.inforIntro[props.inforIntro.length-1]!==undefined)?props.inforIntro[props.inforIntro.length-1]:state.inforIntro
			}
		}
		return null;
	}
	render() {
		return (
				<div className="intro">
					<div className='container'>
						<div className='intro_text'>
							<img src={require('../images/null.png')}/>
							<h4>GIỚI THIỆU<br/><img src={require('../images/logo_intro.png')}/></h4>
							<p> 
								Mriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui 
								faciteorum claritatem. Investigtiones demonstraverunt lectores legere me lius quod ii legunt saepius.Claritas est etiam processus dynamicus, 
								qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putam
							</p>
							<button>XEM THÊM</button>
						</div>
						<div className='bg_intro'>
							<img src={require('../images/bg_intro.jpg')}/>
							<div className='card'>
								<div className='card_img'>
									<div className='triangle_left'>
										<p>MỚI</p>
									</div>
									<img src={this.state.inforIntro.link}/>
								</div>
								<div className='card_intro'>
									<h5>{(this.state.inforIntro.name).toUpperCase()}</h5>
									<img src={require('../images/logo_Rnho.png')}/><br/>
									<span>330.000<sup>đ</sup></span>
									<AddToCart id= {this.state.inforIntro.id}/>
									<p>
										{this.state.inforIntro.infor}
									</p>
									<table className='table' border='1' bordercolor='#e6ae48'>
										<tbody>
											<tr>
												<td><span>334</span><p>NGÀY</p></td>
												<td><span>26</span><p>GIỜ</p></td>
											</tr>
											<tr>
												<td><span>60</span><p>PHÚT</p></td>
												<td><span>15</span><p>GIÂY</p></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>	
						</div>
					</div>
				</div>
		);
	}
}
 const mapStateToProps = (state)=>{
 	return {
 		inforIntro: state.products
 	}
 }


export default connect(mapStateToProps,null)(Intro);