import React from 'react';
import '../css/slideProduct.css'
import axios from '../../node_modules/axios'
import ProductInf from './productInf.js'
import ControlSlide from './controlSlide.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'

class SlideProduct extends React.Component {
  constructor(props){
    super(props);
    this.state={
      newProduct: []
    }
  }
  handleLeft=(e, direction, auto, id)=>{
    let slideSet= document.getElementById(this.props.id).children;
    ControlSlide(slideSet, direction,auto,id)
  }
  static getDerivedStateFromProps(props, state){
    return (props.newProduct.length>0)? {newProduct:props.newProduct} : null
  }
  componentDidMount(){
    if(document.getElementById(this.props.id).children.length > 0){
      var slideSet= document.getElementById(this.props.id).children;
      for(var i=0;i<4;i++){
        slideSet[i].style.display = 'block'
      }
      //ControlSlide(slideSet, 'left',true)
    }
  }
  componentDidUpdate(){
    if(document.getElementById(this.props.id).children.length > 3){
      var slideSet= document.getElementById(this.props.id).children;
      for(var i=0;i<4;i++){
        slideSet[i].style.display = 'block'
      }
      //ControlSlide(slideSet, 'left',true)
    }
  }
  render(){
    var listPnew = this.state.newProduct.map((item, index)=>{
      if(item.status == this.props.id||(this.props.id=='related'&&this.props.kind==item.categories)) {
        return(
            <ProductInf key={index} item={item} bgLabel={this.props.bgLabel}/>
          )
      }
    }) 
    var styleCoverLeft={
      backgroundColor: 'white',
      gridColumn:'1/2',
      height: '100%',
      width: '100%',
      position:'absolute',
      top: '0',
      left: '0'
    }
    var styleCoverRight={
      backgroundColor: 'white',
      gridColumn:'3/4',
      height: '100%',
      width: '100%',
      position:'absolute',
      top: '0',
      right: '0'

    }
    return (
      <div style={{margin: '2em 0'}}>
        <div style={{textAlign:'center'}}>
          <h3 style={{margin: '0'}}>{this.props.title}</h3>
          <img src= {require('../images/logo_intro.png')}/>
        </div>
        <div className='parentSlide' style={{margin: '2em 0'}}>
          <div className="slideProduct" id={this.props.id}>
           {listPnew}
          </div>
          <div style={styleCoverLeft}>
            <div style={{display: 'inline-block',position:'absolute', top:'50%', right:'0'}}>
              <FontAwesomeIcon icon={faArrowLeft} className='arrowSlide' onClick={(e)=>{this.handleLeft(e, 'left',false, this.props.id)} }/>
            </div>
          </div> 
          <div style={styleCoverRight}>
            <div style={{display: 'inline-block',position:'absolute', top:'50%', left:'0'}}>
              <FontAwesomeIcon icon={faArrowRight} className='arrowSlide' onClick={(e)=>{this.handleLeft(e, 'right',false, this.props.id)}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    newProduct: state.products
  }
}

export default connect(mapStateToProps,null)(SlideProduct);