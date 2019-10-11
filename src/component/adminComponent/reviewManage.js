import React from 'react';
import '../../css/css-adminPage/reviewManage.css'
import axios from '../../../node_modules/axios'
import {connect} from 'react-redux'
import TabNavAdmin from './tabNavAdmin.js'
import PageNumber from '../pageNumber.js'
import AdminFooter from './footer.js'
import AdminHeader from './header.js'
import FormatDate from '../formatDate.js';
import StarReview from '../starReview.js'
import {GetData} from '../../action'
import {AdminPopup} from '../../action'

class ReviewManage extends React.Component {
	constructor(props){
    super(props);
    this.state={
      productReviews: [],
      arrShowRewiews: [],
      labelShowDetail: [],
      averageStar: [],
      totalItems: 0,
      pagePresent: 1,
      hasShowList: false
    }
  }
  componentDidMount(){
    axios.get('http://localhost:3001/products?_page=1&_limit=10&_embed=product_details')
    .then(response=>{
      this.setState({
        totalItems: parseInt(response.headers['x-total-count']),
        productReviews: response.data
      })
    })
  }
  componentDidUpdate(){
    if(this.props.adminPopup.display==true){
      this.handleDel(this.props.adminPopup)
      this.props.dispatch(AdminPopup({display:'none'}))
    }
  }
  handleListNum=(numberPage)=>{
    axios.get('http://localhost:3001/products?_page='+numberPage+'&_limit=10&_embed=product_details')
    .then(response=>{
      this.setState({
        totalItems: parseInt(response.headers['x-total-count']),
        productReviews: response.data,
        pagePresent: numberPage
      })
    })
  }
  handleShowList=(e,index)=>{
    let copyState = [...this.state.arrShowRewiews]
    let copyStateLabel = [...this.state.labelShowDetail]
    for(let i=0;i<copyState.length;i++){
      if(i!==index){
        copyState[i] = {display: 'none'}
        copyStateLabel[i] = 'CHI TIẾT'
      }
    }
    copyState[index] = (copyState[index].display==="block")? {display: 'none'} : {display: "block"}
    copyStateLabel[index] = (copyStateLabel[index]==='CHI TIẾT')?'ĐÓNG':'CHI TIẾT'
    this.setState({
      //product: this.state.products[index],
      arrShowRewiews: copyState,
      labelShowDetail: copyStateLabel
    })
  }
  handleDel=(e,id)=>{
    if(e.display){
      axios.delete('http://localhost:3001/product_details/'+ e.idDel)
      .then(response=>{
        axios.get('http://localhost:3001/products?_page='+this.state.pagePresent+'&_limit=10&_embed=product_details')
        .then(response=>{
          this.props.dispatch(GetData(response.data))
          this.setState({
            totalItems: parseInt(response.headers['x-total-count']),
            productReviews: response.data
          })
        }).catch((err)=>{
          console.log(err)
        })
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
      this.props.dispatch(AdminPopup({display:'block',idDel: id}))
    }
  }
  render(){
    const listProducts = this.state.productReviews.map((item,index)=>{
      if(this.state.arrShowRewiews.length!=this.state.productReviews.length){
        this.state.arrShowRewiews.push({display:'none'})
        this.state.labelShowDetail.push('CHI TIẾT')
      }
      this.state.averageStar[index]= 0
      const listReviews = item.product_details.map((itemChild,indexChild)=>{
        this.state.averageStar[index] += itemChild.rate
        return(
            <div key={indexChild} className='reviewOfPro'>
              <div className='infor-reviewOfPro'>
                <h4>{itemChild.userName}<span>&emsp;{FormatDate(itemChild.dateCreate)}</span></h4>
                <StarReview amountStar={itemChild.rate}/>
                <p>{itemChild.comment}</p>
              </div>
              <div className='grAction-reviewOfPro'>
                <button className='btn-Default'onClick={(e)=>this.handleDel(e,itemChild.id)}>XÓA</button>
              </div>
            </div>
          )
      })
      return (
        <div  key={index} className='reviews-admin'>
          <div className='reviewsAdmin-child' id='imgGr-reviewsAdmin'>
            <img src={item.link} height = '100'/>
          </div>
          <div className='reviewsAdmin-child'>
            <h3>Tên sản phẩm: {item.name}</h3>
            <h3>Số lượng bán ra:
              <span className='proNameSty'>
                &ensp;{(this.props.amountSelling.length>0)?this.props.amountSelling[(this.state.pagePresent-1)*10+ index].totalAmount: null}
              </span>
            </h3>
          </div>
          <div className= 'reviewsAdmin-child'>
            <h3>Reviews:&emsp;
              <StarReview amountStar={parseInt((this.state.averageStar[index]/item.product_details.length).toFixed(0))}/>
            </h3>
            <h3>Lượt đánh giá:&ensp;{item.product_details.length}</h3>
          </div>
          <div className= 'reviewsAdmin-child' id= 'btn-reviewsAdmin'>
            <button className='btn-Default' onClick={(e)=>this.handleShowList(e,index)}>{this.state.labelShowDetail[index]}</button>
          </div>
          <div className='list-ReviewAdmin' style={this.state.arrShowRewiews[index]}>
            {listReviews}
          </div>
        </div>
      )
    })
    return (
	    <div className="reviewManage">
        <AdminHeader/>
        <div className='admin-Layout'>
          <TabNavAdmin/>
          <div className='reviewsManage-main'>
            <div id='infor-reviewsManage'>
              <h2>REVIEWS</h2>
            </div>
            <div id='list-reviewsManage'>
              {listProducts}
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
    products: state.products,
    orderData: state.orderData,
    amountSelling: state.amountSelling,
    adminPopup: state.adminPopup
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewManage);