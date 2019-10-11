import React from 'react';
import axios from '../node_modules/axios'
import {connect} from 'react-redux'
import SlideHome from './component/slideHome.js'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js';
import SlideProduct from './component/slideProduct.js'
import Intro from './component/intro.js'
import ShowImg from './component/showImg.js'
import New_Blog from './component/new_Blog.js'
import Logo from './component/logo.js'
import Footer from './component/footer.js'

class Home extends React.Component {
  render(){
  	let styNavRegis = {
  		position: 'absolute'
  	}
  	let colorul={
  		color: 'white',
  		fontSize: '12px'
  	}
    return (
      <div className="home">
        <SlideHome/>
        <NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}}/>
        <NavMenu index={0}/>
        <Intro/>
        <SlideProduct id='New' title='SẢN PHẨM MỚI' bgLabel={'green'}/>
        <ShowImg/>
        <SlideProduct id='selling' title='SẢN PHẨM BÁN CHẠY' bgLabel={'white'}/>
        <New_Blog/>
        <Logo/>
        <Footer/>
      </div>
    );
  }
}
export default Home;