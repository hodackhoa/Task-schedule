import React from 'react';
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"

class FormCategory extends React.Component {
	constructor(props){
    super(props);
    this.state={
      category: {name:''},
      hasReceive: true
    }
  }
  static getDerivedStateFromProps(props, state){
    return (props.categoryObj!=''&& state.hasReceive&&props.index!='addCategory')? {category: props.categoryObj}:null
  }
  handleInput=(e)=>{
    let copyState = {...this.state.category}
    copyState[e.target.id] = e.target.value
    this.setState({
      category: copyState,
      hasReceive: false
    })
  }
  render(){
    return (
	    <div className='form-category' id={this.props.index} style={this.props.showIt}>
        <form spellCheck="false">
          <div className='formGr'>
            <label htmlFor='name'>Tên loại rượu:</label>
            <input type='text' id='name' value={this.state.category.name} onChange={this.handleInput}/>
          </div>
          <div className='formGr'>
            <label></label>
            <button className='btn-Default' onClick={(e)=>this.props.handleUpdate(e, this.state.category,this.props.index)}>{this.props.nameBtn}</button>
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
export default connect(mapStateToProps,null)(FormCategory);