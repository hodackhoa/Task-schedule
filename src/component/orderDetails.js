import React from 'react';
import {connect} from 'react-redux'
import '../css/orderStatus.css'
import FormatNum from './formatMoney.js'

class OrderDetails extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    const listDetails = this.props.orderDetails.map((item,index)=>{
      for(let i=0; i<this.props.products.length;i++){
        if(this.props.products[i].id == item.productId){
          return(
              <tr key={index}>
                <td><img src={this.props.products[i].link} width='100'/></td>
                <td>{this.props.products[i].name}</td>
                <td className='priceStyle'>{FormatNum(this.props.products[i].price)}<sup>đ</sup></td>
                <td>{item.amount}</td>
                <td className='priceStyle'>{FormatNum(item.eachTotal)}<sup>đ</sup></td>
              </tr>
            )
        }
      }
    })
    return (
      <div className="orderDetails">
        <table cellSpacing='0' border='1' bordercolor='#d9d8d8'>
          <thead>
            <tr>
              <th>ẢNH</th>
              <th>TÊN SẢN PHẨM</th>
              <th>GIÁ</th>
              <th>SỐ LƯỢNG</th>
              <th>TỔNG SỐ</th>
            </tr>
          </thead>
          <tbody>
            {listDetails}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    products: state.products
  }
}
export default connect(mapStateToProps,null)(OrderDetails);