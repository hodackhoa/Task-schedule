import React from 'react';
import axios from '../node_modules/axios'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js';

class Champagne extends React.Component {
  render(){
  	let styNavRegis = {
  		position: 'static'
  	}
  	let colorul={
  		color: 'black'
  	}
    return (
      <div className="champagne">
      	<NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}}/>
      	<NavMenu index={3}/>
      	<h3>Champagne</h3>
      </div>
    );
  }
}

export default Champagne;