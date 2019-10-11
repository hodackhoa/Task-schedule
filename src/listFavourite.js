import React from 'react';
import axios from '../node_modules/axios'
import NavRegister from './component/navRegister.js'
import NavMenu from './component/navMenu.js';

class ListFavourite extends React.Component {
  render(){
    let styNavRegis = {
      position: 'static',
    }
    let colorul={
      color: 'black'
    }
    return (
        <div className="listFavourite">
          <NavRegister style={{divRegis:styNavRegis, ulstyle: colorul}} index={2}/>
          <NavMenu/>
          <div className='listFavourite-main'>
            <h4>ListFavourite</h4>
          </div>
        </div>

    );
  }
}

export default ListFavourite;