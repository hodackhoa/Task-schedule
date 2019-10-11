import React from 'react';
import axios from '../node_modules/axios'
import {connect} from 'react-redux'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js';
import ListProduct from './component/listProduct.js'
import Logo from './component/logo.js'
import Footer from './component/footer.js'

class RedWine extends React.Component {
  render(){
  	let styNavRegis = {
  		position: 'static',
  	}
  	let colorul={
  		color: 'black'
  	}
    return (
      <div className="redWine">
      	<NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}}/>
      	<NavMenu index={1}/>
        <ListProduct categoryId={0}/>
        <Logo/>
        <Footer/>
      </div>
    );
  }
}

export default RedWine;