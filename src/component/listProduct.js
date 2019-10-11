import React from 'react';
import axios from '../../node_modules/axios'
import '../css/listProduct.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Switch} from 'react-router'
import {connect} from 'react-redux'
import ProductInf from './productInf.js'
import {showProDetail} from '../action'
import PageNumber from './pageNumber.js'

class ListProduct extends React.Component {
  constructor(props){
    super(props);
    this.state={
      numberList: [],
      products: [],
      totalItems: 0,
      pagePresent: 0,
      hasShowList: false
    }
  }
  componentDidMount(){
    axios.get('http://localhost:3001/products?_page=1&_limit=9&categoryId='+this.props.categoryId)
    .then(response=>{
      this.setState({
        totalItems: parseInt(response.headers['x-total-count']),
        products: response.data
      })
    })
  }
  handleLink=(objProduct)=>{
    this.props.dispatch(showProDetail(objProduct))
  }
  handleListNum=(numberPage)=>{
    axios.get('http://localhost:3001/products?_page='+numberPage+'&_limit=9&categoryId='+this.props.categoryId)
    .then(response=>{
      this.setState({
        totalItems: parseInt(response.headers['x-total-count']),
        products: response.data,
        pagePresent: numberPage
      })
    })
  }
  static getDerivedStateFromProps(props,state){
    if(state.hasShowList){
      let arrTemp = []
      for(let i=0;i<props.products.length;i++){
        if(props.categoryId===props.products[i].categoryId){
          arrTemp.push(props.products[i])
        }
      }
      return {products: arrTemp, productsOrg: arrTemp, hasShowList: false}
    }
    else {return null}
  }

  render(){
    var listNum = this.state.numberList.map((item,index)=>{
      return(
            <a key={index} style={{marginLeft:'.4em'}} onClick={(e)=>{this.handleListNum(index)}}>{item}</a>
        )
    })
    var list1 = this.props.products.map((item,index)=>{
      if(item.categoryId===0){
        return (
              <li key={index}>
                <Link to='/productDetail' onClick={(e)=>this.handleLink(item)}>{item.name}</Link>
              </li>
              )
      }
    })
    var list2 = this.props.products.map((item,index)=>{
      if(item.categoryId===1){
      return (
          <li key={index}>
            <Link to='/productDetail' onClick={(e)=>this.handleLink(item)}>{item.name}</Link>
          </li>
            )
      }
    })
    var listImg = this.state.products.map((item,index)=>{
      return(
          <ProductInf key={index} item={item} bgLabel={'white'}/>
        )
    })
    return (
	      <div className="listProduct">
          <img id='bgImg1' src={require('../images/bannerRuouVang.jpg')} />
          <div className='listText' style={{marginTop:'2em'}}>
            <h4 style={{marginTop:'0'}}>DANH MỤC SẢN PHẨM</h4>
            <img src={require('../images/logo_Rnho.png')} />
            <ul>
              <li><h4>RƯỢU NGOẠI</h4>
                <ul>
                  {list2}
                </ul>
              </li>
              <li><h4>RƯỢU VANG</h4>
                <ul>
                  {list1}
                </ul>
              </li>
            </ul>
            <div className='newSP'>
                <h4 style={{marginTop:'0'}}>SO SÁNH SẢN PHẨM</h4>
                <img src={require('../images/logo_Rnho.png')} />
                <p>Bạn chưa có sản phẩn nào để so sánh</p>
            </div>
            <div className='tag'>
                <h4 style={{marginTop:'0'}}>TAG SẢN PHẨM</h4>
                <img src={require('../images/logo_Rnho.png')} />
                <div className='item_tag'>
                    <button>Đồng hồ</button>
                    <button>Túi</button>
                    <button>Phụ kiện </button>
                    <button>Giày</button>
                    <button>Sandal</button>
                    <button>Đồ trẻ em</button>
                    <button>Áo sơ mi</button>
                    <button>Nước hoa </button>
                </div>
            </div>
            <div className='img_R'>
                <img src={require('../images/RNgoai.png')} />
            </div>
          </div>
          <div className='products' style={{marginTop:'2em'}}>
            <PageNumber 
              amountItem = {9}
              totalItems={this.state.totalItems}
              handleListNum={this.handleListNum}/>
            <div className='listMesh'>
              {listImg}
            </div>
          </div>
	      </div>

    );
  }
}
const mapStateToProps=(state)=>{
  return{
    products: state.products,
    categories: state.categories
  }
}

export default connect(mapStateToProps, null)(ListProduct);