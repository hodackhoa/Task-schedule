import React from 'react';
import {connect} from 'react-redux'
import {AdminPopup} from '../../action'


class PopUpConfirm extends React.Component {
	constructor(props){
    super(props);
    this.state={
      showPopup: 'none'
    }
  }
  handleCancel=(e)=>{
    let objCopy = {...this.props.popUpConfirm}
    objCopy.display = 'none'
    this.props.dispatch(AdminPopup(objCopy))
  }
  handleConfirm=(e)=>{
    let objCopy = {...this.props.popUpConfirm}
    objCopy.display = true
    this.props.dispatch(AdminPopup(objCopy))
  }
  static getDerivedStateFromProps(props, state){
    return (props.popUpConfirm.display!==''&& props.popUpConfirm.display!==true)?{showPopup: props.popUpConfirm.display}:{showPopup: 'none'}
  }
  render(){
    let styleAdminPopup ={
      display: this.state.showPopup
    }
    return (
	    <div className="adminPopup" style={styleAdminPopup}>
        <h3>BẠN CHẮC CHẮN MUỐN XÓA?</h3>
        <button id='btn-ConfirmAdmin' onClick={this.handleConfirm}>ĐỒNG Ý</button>
        <button id='btn-CancelAdmin' onClick={this.handleCancel}>HỦY</button> 
	    </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    popUpConfirm: state.adminPopup
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PopUpConfirm);