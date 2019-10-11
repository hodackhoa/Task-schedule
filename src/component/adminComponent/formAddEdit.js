import React from 'react';
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"

class FormAddEdit extends React.Component {
	constructor(props){
    super(props);
    this.state={
      product: {name:'', price:'', infor:'', hightlights:'', status:'', link:'',categoryId: 0},
      hasReceive: true
    }
  }
  static getDerivedStateFromProps(props, state){
    return (props.productObj!=''&& state.hasReceive && props.index!='addPro')? 
      {product: props.productObj}:null
  }
  handleInput=(e)=>{
    let copyState = {...this.state.product}
    copyState[e.target.id] = e.target.value
    this.setState({
      product: copyState,
      hasReceive: false
    })
  }
  handleSelectCate=(e)=>{
    let copyState = {...this.state.product}
    delete copyState.category
    copyState.categoryId = parseInt(e.target.value)
    this.setState({
      product: copyState,
      hasReceive: false
    })
  }
  render(){
    const categoriesList = this.props.categories.map((item,index)=>{
      return(
          <option key={index} value={item.id}>{item.name}</option>
        )
    })
    return (
	    <div className='formEditPro' id={this.props.index} style={this.props.showIt}>
        <form spellCheck="false">
          <div className='formGr'>
            <label htmlFor='name'>Tên sản phẩm:</label>
            <input type='text' id='name' value={this.state.product.name} onChange={this.handleInput}/>
          </div>
          <div className='formGr'>
            <label htmlFor='price'>Giá:</label>
            <input type='number' id='price' value={this.state.product.price} onChange={this.handleInput}/>
          </div>
          <div className='formGr'>
            <label htmlFor='infor'>Thông tin sản phẩm:</label>
            <textarea type='text' id='infor' value={this.state.product.infor} onChange={this.handleInput}/>
          </div>
          <div className='formGr'>
            <label htmlFor='property'>Đặc điểm:</label>
            <textarea type='text' id='hightlights' value={this.state.product.hightlights} onChange={this.handleInput}/>
          </div>
          <div className='formGr'>
            <label htmlFor='status'>Trạng thái:</label>
            <input type='text' id='status' value={this.state.product.status} onChange={this.handleInput}/>
          </div>
          <div className='formGr'>
            <label htmlFor='link'>Link hình ảnh:</label>
            <input type='text' id='link' value={this.state.product.link} onChange={this.handleInput}/>
          </div>
          <div className='formGr'>
            <label htmlFor='category'>Loại</label>
            <select onChange={this.handleSelectCate} value = {this.state.product.categoryId}>
              {categoriesList}
            </select>
          </div>
          <div className='formGr'>
            <label></label>
            <button className='btn-Default' 
              onClick={(e)=>this.props.handleUpdate(e, this.state.product,this.props.index)}>{this.props.nameBtn}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    categories: state.categories
  }
}
export default connect(mapStateToProps,null)(FormAddEdit);