import React from 'react';
import '../css/intro.css'
import {connect} from 'react-redux'

class Intro extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			infor:{name:"",
					link:""
			}
		}
	}
	static getDerivedStateFromProps(props, state) {
		if(props.inforIntro.length > 0){
			return {
				infor:props.inforIntro[23]
			}
		}
		return null;
	}
	render() {
		console.log(this.state.infor.name);
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
										<p>Sale</p>
									</div>
									<img src={this.state.infor.link}/>
								</div>
								<div className='card_intro'>
									<h5>{(this.state.infor.name).toUpperCase()}</h5>
									<img src={require('../images/logo_Rnho.png')}/><br/>
									<span>330.000<sup>đ</sup></span>
									<button>ADD TO CARD</button>
									<p>
										Một hợp chất có trong rượu vang được gọi là resveratro có khả năng làm tăng tối đa tuổi thọ. Resveratro còn có khả năng ngăn chặn mật độ 
										ôxy hoá của protein béo.
									</p>
									<table className='table'>
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