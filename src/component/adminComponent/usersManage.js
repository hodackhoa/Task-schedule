import React from 'react';
import {connect} from 'react-redux'
import axios from '../../../node_modules/axios'
import '../../css/css-adminPage/usersManage.css'
import TabNavAdmin from './tabNavAdmin.js'
import AdminFooter from './footer.js'
import AdminHeader from './header.js'
import PageNumber from '../pageNumber.js'
import {GetUsers} from '../../action'
import {AdminPopup} from '../../action'

class UsersManage extends React.Component {
	constructor(props){
    super(props);
    this.state={
      users: [],
      totalItems: 0,
      hasShowList: true
    }
  }
  componentDidMount(){
    axios.get('http://localhost:3001/users?_page=1&_limit=10')
    .then(response=>{
      this.setState({
        totalItems: parseInt(response.headers['x-total-count']),
        users: response.data
      })
    })
  }
  componentDidUpdate(){
    if(this.props.adminPopup.display==true){
      this.handleDel(this.props.adminPopup)
      this.props.dispatch(AdminPopup({display:'none'}))
    }
  }
  static getDerivedStateFromProps(props, state){
    return (props.users.length>0 && state.hasShowList)? {users: props.users, hasShowList: false} : null
  }
  handleListNum=(numberPage)=>{
    axios.get('http://localhost:3001/users?_page='+numberPage+'&_limit=10')
    .then(response=>{
      this.setState({
        totalItems: parseInt(response.headers['x-total-count']),
        users: response.data,
        pagePresent: numberPage
      })
    })
  }
  handleDel=(e,id,index)=>{
    if(e.display){
      axios.delete('http://localhost:3001/users/'+ e.idDel)
      .then(response=>{
        let usersTemp = this.state.users
        usersTemp.splice(e.indexDel, 1)
        if(usersTemp.length===0){
          axios.get('http://localhost:3001/users?_page='+ (this.state.pagePresent- 1)+'&_limit=10')
          .then(response=>{
            this.setState({
              totalItems: parseInt(response.headers['x-total-count']),
              users: response.data
            })
          })
        }
        this.props.dispatch(GetUsers(usersTemp))
        ///------------set state--------------//
        this.setState({
          totalItems: (this.state.totalItems!==0)?this.state.totalItems - 1 : 0,
          hasShowList: true
        })
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
      this.props.dispatch(AdminPopup({display:'block',idDel: id, indexDel: index}))
    }
  }
  render(){
    const listUsers = this.state.users.map((item,index)=>{
      if(index<10){
        return (
          <div  key={index} className='users-admin'>
            <div className='usersAdmin-child'>
              <h3>Họ & tên: {item.lastName} {item.firstName}</h3>
            </div>
            <div className='usersAdmin-child'>
              <h3>Email:
                <span className='proNameSty'>
                  &ensp;{item.email}
                </span>
              </h3>
            </div>
            <div className= 'usersAdmin-child'>
              <h3>Mật khẩu: <span>{item.password}</span></h3>
            </div>
            <div className= 'usersAdmin-child' id= 'btn-usersAdmin'>
              <button className='btn-Default' onClick={(e)=>this.handleDel(e, item.id, (index+this.state.itemStart))}>XÓA</button>
            </div>
          </div>
        )
      }
    })
    return (
	    <div className="usersManage">
        <AdminHeader/>
        <div className='admin-Layout'>
          <TabNavAdmin/>
          <div className='usersManage-main'>
            <div id='infor-usersManage'>
              <h2>QUẢN LÝ NGƯỜI DÙNG</h2>
            </div>
            <div id='list-usersManage'>
              {listUsers}
            </div>
            <PageNumber
              amountItem = {10}
              totalItems={this.state.totalItems}
              handleListNum={this.handleListNum}
            />
          </div>
          <AdminFooter/>
        </div>
	    </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    adminLogin: state.adminLogin,
    users: state.users,
    adminPopup: state.adminPopup
  }
}
export default connect(mapStateToProps, null)(UsersManage);