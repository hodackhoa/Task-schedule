import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import FormatDate from './formatDate.js';
import StarReview from './starReview.js'

class CommentRate extends React.Component {
  constructor(props){
    super(props);
    this.state={
      dataComments: []
    }
  }
  static getDerivedStateFromProps(props, state){
    return (props.dataComments!=undefined)? {dataComments: props.dataComments} : null;
  }
  render(){
    var listComment = this.state.dataComments.map((item,index)=>{
      return(
        <div key={index} className='commentRate'>
          <div id={'grStar'+"_"+ index}>
            <h4>{item.userName}<span>&emsp;{FormatDate(item.dateCreate)}</span></h4>
            <StarReview amountStar={item.rate}/>
          </div>
          <p>{item.comment}</p>
        </div>
      )
    })
    return (
      <div className='listComment'>
        {listComment}
      </div>
    );
  }
}

export default CommentRate;