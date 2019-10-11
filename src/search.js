import React from 'react';
import axios from '../node_modules/axios'
import {connect} from 'react-redux'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js';
import Logo from './component/logo.js'
import Footer from './component/footer.js'
import FormatNum from './component/formatMoney.js'
import {showProDetail} from './action'
import {Search} from './action'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './css/search.css'

class SearchPage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      arrResult: [],
      arrTemp: [],
      linkProDetail: '/search',
      notfoundALert: '',
      shortString: (str)=>this.shortString(str),
      removeSign: (str)=>this.removeSign(str)
    }
  }
  shortString=(str)=>{
    let arrStr = str.split(" ");
    let arrTemp =[]
    for(let i=0;i<25;i++){
      arrTemp.push(arrStr[i])
    }
    return arrTemp.join(" ") + "...";
  }
  removeSign=(str)=>{
    str=str.toLowerCase()
    str=str.replace(/ã|ạ|ả|â|ă|ẩ|ẫ|ậ|ẳ|ẵ|ặ|à|á|ắ|ằ|ầ|ắ/gi, 'a')
    str=str.replace(/ọ|ỏ|õ|ô|ổ|ỗ|ộ|ơ|ở|ỡ|ợ|ò|ó|ờ|ớ|ồ|ố/gi, 'o')
    str=str.replace(/ẻ|ẽ|ẹ|ê|ể|ễ|ệ|è|é|ề|ế/gi, 'e')
    str=str.replace(/ũ|ủ|ư|ụ|ử|ữ|ự|ù|ú|ừ|ứ/gi, 'u')
    str=str.replace(/ỷ|ỹ|ỵ|ỳ|ý/gi, 'y')
    str=str.replace(/ỉ|ĩ|ị|ì|í/gi, 'i')
    str=str.replace(/đ/gi, 'd')
    return(str);
  }
  static getDerivedStateFromProps(props, state){
    if(props.searchKey!='' && props.products.length>0){
      let found = false
      let key = props.searchKey
      for(var i =0; i<props.products.length; i++){
        if(state.removeSign(key) == state.removeSign(props.products[i].name) ){
          return { arrResult:[props.products[i]] }
          found = true
          break;
        }
      }
      if(!found){
        for(var i =0; i<props.products.length; i++){
          let keyArr = key.split(" ")
          for(var j=0;j<keyArr.length; j++){
            let foodArrName = props.products[i].name.split(" ")
            for(var l=0; l<foodArrName.length; l++){
              if(state.removeSign(keyArr[j])== state.removeSign(foodArrName[l]) ){
                let exist = true
                for(var m=0; m<state.arrTemp.length;m++){  
                  if(props.products[i].name == state.arrTemp[m].name){
                    exist = false
                  }
                }
                if(exist){
                  console.log('run push')
                  state.arrTemp.push(props.products[i])
                  found = true
                }               
              }
            }
          }
        }
        if(found){
          props.dispatch(Search(''))
          return{arrResult: state.arrTemp, arrTemp: [] }
        }
        else{
          return { arrResult:[], notfoundALert: 'Không tìm thấy kết quả' }
        }
      } 
    }
    else{
      return null
    }
  }
  handleReadMore=(e, obj)=>{
    window.scrollTo(0,0)
    this.props.dispatch(showProDetail(obj))
    this.setState({
      linkProDetail: '/productDetail'
    })
  }
  render(){
    let styNavRegis = {
      position: 'static'
    }
    let colorul={
      color: 'black'
    }
    const listSearch = this.state.arrResult.map((item,index)=>{
      return(
          <div key={index} className='search-content'>
            <div className='search-Img'>
              <img src={item.link} height='100'/>
            </div>
            <div className='search-Text'>
              <h4 onClick={(e)=>this.handleReadMore(e,item)}>Tên sản phẩm: {(item.name).toUpperCase()}</h4>
              <h4>Giá bán: <span className='priceStyle'>{FormatNum(item.price)}<sup>đ</sup></span></h4>
              <h4 style={{fontWeight:'normal'}}>{this.state.shortString(item.infor)}
                <a onClick={(e)=>this.handleReadMore(e,item)}>Read more</a>
              </h4>
            </div>
          </div>
        )
    })
    return (
      <div className="searchPage">
        <NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}}/>
        <NavMenu/>
        <div className='listSearch'>
          {(listSearch.length>0)? <h3>Tìm thấy {listSearch.length} kết quả!</h3> : <h3>{this.state.notfoundALert}</h3>}
          {listSearch}
        </div>
        <Redirect to={this.state.linkProDetail}/>
        <Logo/>
        <Footer/>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    products: state.products,
    searchKey: state.searchKey
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);