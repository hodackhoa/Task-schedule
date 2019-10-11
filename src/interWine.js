import React from 'react';
import axios from '../node_modules/axios'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js';
import ListProduct from './component/listProduct.js'
import Logo from './component/logo.js'
import Footer from './component/footer.js'

class InterWine extends React.Component {
  render(){
  	let styNavRegis = {
  		position: 'static'
  	}
  	let colorul={
  		color: 'black'
  	}
    return (
      <div className="interWine">
      	<NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}}/>
      	<NavMenu index={2}/>
      	<ListProduct categoryId={1}/>
        <Logo/>
        <Footer/>
      </div>
    );
  }
}

export default InterWine;