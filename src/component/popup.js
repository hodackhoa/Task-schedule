import React from 'react';
import '../css/popup.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Popup extends React.Component {
  render() {
    return (
      <div className='popup-Register' style={this.props.showPopup}>
        <h3>{this.props.text}</h3>
        <button className='btn-Default' onClick={this.props.closePopup}>{this.props.button}</button>
      </div>
    );
  }
}

export default Popup;