import React from 'react';
import axios from '../../node_modules/axios'

class SlideHome extends React.Component {
  render(){
    return (
      <div className="slideHome">
          <img src={require('../images/slide-1.jpg')}/>
          <div className='slideText'>
            <h1>Rượu<span>Vang Đỏ</span><span> &nbsp;Since 1980</span></h1>
            
          </div>
      </div>
    );
  }
}

export default SlideHome;