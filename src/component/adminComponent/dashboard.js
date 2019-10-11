import React from 'react';
import {connect} from 'react-redux'
import axios from '../../../node_modules/axios'
import TabNavAdmin from './tabNavAdmin.js'
import AdminFooter from './footer.js'
import AdminHeader from './header.js'
import Chart from "react-apexcharts";
import {AmountSelling} from '../../action'
import '../../css/css-adminPage/dashboard.css'

class DashBoard extends React.Component {
	constructor(props){
    super(props);
    this.state={
      chartTopProduct:{
        options: {
          xaxis: {
            categories: []
          }
        },
        series: [
          {
            name: "Số lượng",
            data: []
          }
        ],
        empty : 0
      },
      chartStatus: true,
      orderHasCheck: 0,
      orderNoCheck: 0
    }
  }
  static getDerivedStateFromProps(props, state){
    if(props.orderDetailsAdmin.length>0 && state.chartStatus){
      let arrPrTop = [], arrTemp = [...props.orderDetailsAdmin]
      for(let i=0;i<arrTemp.length;i++){
        let amount = (arrTemp[i].order.statusCheckout===1)? parseInt(arrTemp[i].amount) : 0
        for(let j=i+1;j<arrTemp.length;j++){
          if(arrTemp[i].productId === arrTemp[j].productId&&arrTemp[j].order.statusCheckout===1){
            amount += parseInt(arrTemp[j].amount)
            arrTemp.splice(j, 1)
            j--;
          }
        }
        arrPrTop.push({name: arrTemp[i].product.name, totalAmount: amount})
      }
      console.log(arrPrTop)
      props.dispatch(AmountSelling(arrPrTop))
      arrPrTop.sort((a,b)=>(a.totalAmount<b.totalAmount)? 1 : ((a.totalAmount>b.totalAmount)? -1 : 0))
      let arr1=[], arr2 =[]
      let copyState = Object.assign({}, state.chartTopProduct)
      for(let i=0;i<10 && i<arrPrTop.length;i++){
        copyState.options.xaxis.categories[i] = arrPrTop[i].name
        copyState.series[0].data.push(arrPrTop[i].totalAmount);
      }
      return {
        chartTopProduct: copyState,
        chartStatus: false
      }
    }
    else{
      return null;
    }
  }
  render(){
    console.log(this.props.reportData)
    return (
	    <div className="dashBoard">
        <AdminHeader/>
        <div className='admin-Layout'>
          <TabNavAdmin/>
          <div className='dashBoard-main'>
            <h2>DASHBOARD</h2>
            <div id= 'inforOverview'>
              <div className='inforOverview-child'>
                <h3>Số lượng người dùng</h3>
                <h4>{this.props.reportData.amountUsers}</h4>
              </div>
              <div  className='inforOverview-child'>
                <h3>Số lượng sản phẩm</h3>
                <h4>{this.props.reportData.amountProducts}</h4>
              </div>
              <div className='inforOverview-child'>
                <h3>Đơn hàng chưa thanh toán</h3>
                <h4>{this.props.reportData.amountOrdersNo}</h4>
              </div>
              <div className='inforOverview-child'>
                <h3>Đơn hàng đã thanh toán</h3>
                <h4>{this.props.reportData.amountOrdersHas}</h4>
              </div>
            </div>
            <div id='chartTopOrder'>
              <h2>Top 10 sản phẩm bán chạy</h2>
              <Chart options={this.state.chartTopProduct.options} series={this.state.chartTopProduct.series} type="bar"/>
            </div>
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
    users: state.users,
    orderDetailsAdmin: state.orderDetailsAdmin,
    orderData: state.orderData,
    reportData: state.reportData
  }
}
export default connect(mapStateToProps, null)(DashBoard);