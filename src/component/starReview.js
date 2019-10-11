import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

class StarReview extends React.Component {
  constructor(props){
    super(props);
    this.state={
      arrStar: ['','','','',''],
      arrStarStyle: []
    }
  }
  static getDerivedStateFromProps(props, state){
    return (isNaN(props.amountStar))? {arrStarStyle: []} : null
  }
  render(){
    this.state.arrStarStyle = []
    const starsGroup = this.state.arrStar.map((item,index)=>{
      for(let i=0; i<this.props.amountStar;i++){
        this.state.arrStarStyle[i] = {color: '#e3c000'}
      }
      return(
          <FontAwesomeIcon key={index} icon={faStar} style={this.state.arrStarStyle[index]}/>
        )
    })
    return (
      <div className='starReview'>
        {starsGroup}
      </div>
    );
  }
}

export default StarReview;