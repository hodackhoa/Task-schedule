import React from 'react';
import axios from '../node_modules/axios'
import './css/productDetail.css'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js';
import Logo from './component/logo.js'
import Footer from './component/footer.js'
import SlideProduct from './component/slideProduct.js'
import {connect} from 'react-redux'
import AddToCart from './component/btnAddToCart.js'
import {amountOrder} from './action'
import FormatNum from './component/formatMoney.js'
import CommentRate from './component/commentRate.js'
import {PopUp} from './action'
import {GetData} from './action'
import {showProDetail} from './action'
import {getCartLocal} from './action'

class ProductDetail extends React.Component {
  constructor(props){
    super(props);
    this.state={
      productDetail: {id:'',name:'',price:'',infor:'',hightlights:''},
      amount: 1,
      rate: 0,
      comment: ''
    }
  }
  static getDerivedStateFromProps(props, state){
    if(props.productDetail!==''){
      return {productDetail: props.productDetail}
    }
    else if(props.newProduct.length>0){
      for(let i =0;i<props.newProduct.length;i++){
        let vallocal = localStorage.getItem('detail-ID').split("|")
        if(props.newProduct[i].categoryId===parseInt(vallocal[0]) && props.newProduct[i].id === parseInt(vallocal[1])){
          return {productDetail: props.newProduct[i]}
        }
      }
    }
      else {return null;}
  }
  handleTabs=(e,id)=>{
    var tabs = document.getElementById('detail_Inf').getElementsByClassName('tabs');
    var btnArr = document.getElementById('gr-btn-tab').getElementsByTagName('button');
    for(var i=0;i<tabs.length;i++){
      if(tabs[i].getAttribute('id')===id){
        tabs[i].style.display = "block";
        btnArr[i].style.backgroundColor = '#e6ae48';
        btnArr[i].style.color = 'white';
      }
      else{
        tabs[i].style.display = "none";
        btnArr[i].style.backgroundColor = 'white';
        btnArr[i].style.color = '#818181';
      }
    }
  }
  handleAmount=(e)=>{
    if(e.target.name==='quantity'){
      this.setState({
        amount : e.target.value
      })
    }
    else{
      if(e.target.name==='plus'){
        this.setState({
          amount : parseInt(this.state.amount) + 1
        })
      }
      if(e.target.name==='minus'){
        this.setState({
          amount : (this.state.amount===0)? 0 : parseInt(this.state.amount) - 1
        })
      }
    } 
  }
  componentDidMount(){
    this.handleTabs(null,'tab-1')
  }
  componentDidUpdate(){
    this.props.dispatch(amountOrder(this.state.amount))
    if(this.props.amountOrder===0){
      this.state.amount = 1
    }
  }
  handleRate=(e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
    if(e.target.name==='rate'){
      this.state.comment = '.'
      this.state.rate = e.target.value
      this.handlePostComment()
    }
  }
  handlePostComment=(e)=>{
    let dateCreate = new Date().toString();
    let dataComment = {
      productId: this.state.productDetail.id,
      userId: this.props.userLogin.id,
      userName: this.props.userLogin.firstName+" "+this.props.userLogin.lastName,
      rate: parseInt(this.state.rate),
      comment: this.state.comment,
      dateCreate: dateCreate
    }
    if(this.props.userLogin!==""){
      if(this.state.comment!==""||this.state.comment==='.'){
        let product_details_Inf = this.state.productDetail.product_details;
        for(let i=0;i<product_details_Inf.length;i++){
          if(product_details_Inf[i].userId === this.props.userLogin.id){
            product_details_Inf = product_details_Inf[i];
            break;
          }
        }
        if(product_details_Inf.userId===this.props.userLogin.id&&product_details_Inf.productId===this.state.productDetail.id){
          axios.patch('http://localhost:3001/product_details/'+ product_details_Inf.id , dataComment)
          .then(response=>{
            //console.log(response.data)
              axios.get('http://localhost:3001/products/'+response.data.productId+'?_embed=product_details')
              .then(response=>{
                //console.log(response.data)
                this.props.dispatch(showProDetail(response.data))
                this.setState({
                  comment: '',
                  //rate: 0
                })
              }).catch((err)=>{
                console.log(err)
              })
          }).catch((err)=>{
            console.log(err)
          })
        }
        else{
          axios.post('http://localhost:3001/product_details', dataComment)
          .then(response=>{
            //console.log(response.data)
              axios.get('http://localhost:3001/products/'+response.data.productId+'?_embed=product_details')
              .then(response=>{
                //console.log(response.data)
                this.props.dispatch(showProDetail(response.data))
                this.setState({
                  comment: '',
                  //rate: 0
                })
              }).catch((err)=>{
                console.log(err)
              })
          }).catch((err)=>{
            console.log(err)
          })
        }
      }
      else {
        var textBox = e.target.parentElement.parentElement.children[1]
        textBox.style = `animation-name: alertbox;`
        setTimeout(()=>{
          textBox.removeAttribute('style')
        }, 1000)
        
      }
    }
    else{
      this.props.dispatch(PopUp('block'))
    }
    axios.get('http://localhost:3001/products?_embed=product_details')
    .then(response=>{
      this.props.dispatch(GetData(response.data))
    }).catch((err)=>{
      console.log(err)
    })
  }
  handleclearComment=()=>{
    this.setState({
      comment: '',
      rate: 0
    })
  }
  render(){
  	let styNavRegis = {
  		position: 'static'
  	}
  	let colorul={
  		color: 'black'
  	}
    let styleTextPrice= {
      fontFamily: 'UTM Caviar',
      color: '#e6ae48',
      margin: '.3em 0',
      fontSize: '1.5em',
      fontWeight: 'lighter'
    }
    return (
     <div className="detailParent">
        <NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}}/>
        <NavMenu index={this.props.indexNavMenu}/>
        <div className='productDetail'>
          <div id='detail_Img'>
            <img src={this.state.productDetail.link}/>
          </div>
          <div id='detail_InfOrder'>
            <p style={{margin: '0', fontSize: '1.5em', color:'black'}}>{(this.state.productDetail.name).toUpperCase()}</p>
            <h3 style={styleTextPrice}>{FormatNum(this.state.productDetail.price)}<sup>đ</sup></h3>
            <div className='rate_cmt'>
                <div className="rate">
                    <input type="radio" id="star5" name="rate" value="5" onClick={this.handleRate}/>
                    <label htmlFor="star5" title="text">5 stars</label>
                    <input type="radio" id="star4" name="rate" value="4" onClick={this.handleRate}/>
                    <label htmlFor="star4" title="text">4 stars</label>
                    <input type="radio" id="star3" name="rate" value="3" onClick={this.handleRate}/>
                    <label htmlFor="star3" title="text">3 stars</label>
                    <input type="radio" id="star2" name="rate" value="2" onClick={this.handleRate}/>
                    <label htmlFor="star2" title="text">2 stars</label>
                    <input type="radio" id="star1" name="rate" value="1" onClick={this.handleRate}/>
                    <label htmlFor="star1" title="text">1 star</label>
                </div>
                <div className='cmt'>
                    <p>1 Review(S) | Add Your Review</p>
                </div>
            </div>
            <div className='size'>
                <h5>KÍCH CỠ</h5>
                <select>
                    <option value="big">Loại lớn</option>
                    <option value="small">Loại nhỏ</option>
                    <option value="normal">Loại vừa</option>
                </select>
            </div>
            <div className='amount'>
                <h5>SỐ LƯỢNG</h5>
                <div id ='amount-child-2'>
                  <div className="number-input">
                    <button name='minus' onClick={(e)=>this.handleAmount(e)}></button>
                    <input className="quantity" name="quantity" type="number" value={this.state.amount} onChange={(e)=>this.handleAmount(e)}/>
                    <button name ='plus' onClick={(e)=>this.handleAmount(e)} className="plus"></button>
                  </div>
                </div>
                <div id='amount-child-3'>
                  <AddToCart id={this.state.productDetail.id}/>
                </div>
                <div className="menu" id='amount-child-4'>
                    <ul>
                        <li><a href="#"><img src={require('./images/icon_heart.png')}/></a><span>Yêu Thích</span></li>
                        <li><a href="#"><img src={require('./images/icon_compare.png')} /></a><span>So Sánh</span></li>
                        <li><a href="#"><img src={require('./images/icon_mail.png')} /></a><span>Gửi mail</span></li>
                    </ul>
                </div>
            </div>
            <div className='description'>
                <h5>MÔ TẢ</h5>
                <p>{this.state.productDetail.infor}</p>
                <div className="menu">
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
          <div id='detail_Inf'>
            <div id='gr-btn-tab'>
              <button onClick={(e)=>{this.handleTabs(e,'tab-1')}}>ĐẶC ĐIỂM NỔI BẬT</button>
              <button onClick={(e)=>{this.handleTabs(e,'tab-2')}}>THÔNG TIN SẢN PHẨM</button>
              <button onClick={(e)=>{this.handleTabs(e,'tab-3')}}>ĐÁNH GIÁ</button>
            </div>
            <div id='tab-1' className='tabs'>
              <p>{this.state.productDetail.hightlights}</p>
            </div>
            <div id='tab-2' className='tabs'>
              <p>{this.state.productDetail.infor}</p>
            </div>
            <div id='tab-3' className='tabs'>
              <CommentRate dataComments={this.state.productDetail.product_details}/>
              <textarea name='comment' value={this.state.comment} onChange={this.handleRate}></textarea>
              <div className='comment-btn'>
                <button className='btn-Default' onClick={this.handlePostComment}>GỬI ĐÁNH GIÁ</button>
                <button className='btn-Default' onClick={this.handleclearComment}>XÓA</button>
              </div>
            </div>
          </div>
          <div id='detail_Img2'>
            <img src={require('./images/bg_intro.jpg')} />
          </div>
        </div>
        <SlideProduct id='related' kind={this.state.productDetail.categories} title='SẢN PHẨM LIÊN QUAN' bgLabel={'white'}/>
        <Logo/>
        <Footer/>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    newProduct: state.products,
    productDetail: state.productDetail,
    indexNavMenu: state.indexNavMenu,
    amountOrder: state.amountOrder,
    userLogin: state.userLogin
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);