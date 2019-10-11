import React from 'react';
import {connect} from 'react-redux'
import axios from '../../../node_modules/axios'
import TabNavAdmin from './tabNavAdmin.js'
import AdminFooter from './footer.js'
import AdminHeader from './header.js'
import '../../css/css-adminPage/productsManage.css'
import {GetData} from '../../action'
import {GetCategories } from '../../action'
import FormatNum from '../formatMoney.js'
import FormAddEdit from './formAddEdit'
import PageNumber from '../pageNumber.js'
import {AdminPopup} from '../../action'
import {ReportData} from '../../action'


class ProductsManage extends React.Component {
	constructor(props){
    super(props);
    this.state={
      products: [],
      product: '',
      totalItems: 0,
      arrForm: [],
      showAddForm: {display: 'none'},
      labelEdit: [],
      labelAdd: 'THÊM SẢN PHẨM',
      hideList: {display: 'block'},
      pagePresent: 0,
      hasShowList: false
    }
  }
  componentDidMount(){
    axios.get('http://localhost:3001/products?_page=1&_limit=10&_expand=category')
    .then(response=>{
      this.props.dispatch(ReportData({amountProducts: response.headers['x-total-count']}))
      this.setState({
        totalItems: parseInt(response.headers['x-total-count']),
        products: response.data
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
    return (state.hasShowList)?{products: props.products, hasShowList: false}: null
  }
  handleEdit=(e,index)=>{
    let copyState = [...this.state.arrForm]
    let copyStateLabel = [...this.state.labelEdit]
    for(let i=0;i<copyState.length;i++){
      if(i!==index){
        copyState[i] = {display: 'none'}
        copyStateLabel[i] = 'CHỈNH SỬA'
      }
    }
    copyState[index] = (copyState[index].display==="block")? {display: 'none'} : {display: "block"}
    copyStateLabel[index] = (copyStateLabel[index]==='CHỈNH SỬA')?'ĐÓNG':'CHỈNH SỬA'
    this.setState({
      product: this.state.products[index],
      arrForm: copyState,
      labelEdit: copyStateLabel
    })
  }
  handleUpdate=(e, obj, index)=>{
    e.preventDefault() 
    let objTemp = {...obj}
    if(index!='addPro'){
      axios.patch('http://localhost:3001/products/'+ obj.id, objTemp)
      .then(response=>{
        let productsTemp = [...this.state.products]
        productsTemp[obj.id] = response.data
        this.props.dispatch(GetData(productsTemp))
        //-----------------------------------------
        let copyState = this.state.arrForm
        let copyStateLabel = [...this.state.labelEdit]
        copyState[index] = {display: 'none'}
        copyStateLabel[index] = (copyStateLabel[index]==='CHỈNH SỬA')?'ĐÓNG':'CHỈNH SỬA'
        this.setState({
          arrForm: copyState,
          labelEdit: copyStateLabel,
          hasShowList: true
        })
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
      axios.post('http://localhost:3001/products', objTemp)
      .then(response=>{
        //console.log(response.data)
        axios.get('http://localhost:3001/products?_page=1&_limit=1&_expand=category')
        .then(response=>{
          this.setState({
            totalItems: parseInt(response.headers['x-total-count']),
            showAddForm: {display: 'none'},
            labelAdd: 'THÊM SẢN PHẨM',
            hideList: {display: 'block'},
            hasShowList: true
          })
        }).catch((err)=>{
          console.log(err)
        })
      })
    }
  }
  handleDel=(e,id, index)=>{
    if(e.display){
      axios.delete('http://localhost:3001/products/'+ e.idDel)
      .then(response=>{
        let productsTemp = this.state.products
        productsTemp.splice(e.indexDel, 1)
        if(productsTemp.length===0){
          axios.get('http://localhost:3001/products?_page='+ (this.state.pagePresent- 1)+'&_limit=10&_expand=category')
          .then(response=>{
            this.setState({
              totalItems: parseInt(response.headers['x-total-count']),
              products: response.data
            })
          })
        }
        this.props.dispatch(GetData(productsTemp))
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
  handleAdd=(e)=>{
    this.setState({
      product: '',
      labelAdd: (this.state.labelAdd==="THÊM SẢN PHẨM")? 'HỦY' : "THÊM SẢN PHẨM",
      showAddForm: (this.state.showAddForm.display==="block")? {display: 'none'} : {display: "block"},
      hideList: (this.state.labelAdd==="THÊM SẢN PHẨM")?{display: 'none'}:{display: "block"}
    })
  }
  handleListNum=(numberPage)=>{
    axios.get('http://localhost:3001/products?_page='+numberPage+'&_limit=10&_expand=category')
    .then(response=>{
      this.setState({
        totalItems: parseInt(response.headers['x-total-count']),
        products: response.data,
        pagePresent: numberPage
      })
    })
  }
  render(){
    const listProducts = this.state.products.map((item,index)=>{
      if(this.state.arrForm.length!=this.state.products.length){
        this.state.arrForm.push({display:'none'})
        this.state.labelEdit.push('CHỈNH SỬA')
      }
      return (
          <div  key={index} className='product-admin'>
            <div className='productAdmin-child'>
              <img src = {item.link} height = '100'/>
            </div>
            <div className='productAdmin-child'>
              <h3>Tên sản phẩm: <span className='proNameSty'>{item.name}</span></h3>
              <h3>Loại: {(item.category.name)}</h3>
            </div>
            <div className= 'productAdmin-child'>
              <h3>Giá: <span className='priceStyle'>{FormatNum(item.price)}<sup>đ</sup></span></h3>
            </div>
            <div className= 'productAdmin-child' id= 'btn-grAction'>
              <button className='btn-Default' onClick={(e)=>this.handleEdit(e,index)}>{this.state.labelEdit[index]}</button><br/>
              <button className='btn-Default' onClick={(e)=>this.handleDel(e, item.id,index)}>XÓA</button>
            </div>
            <FormAddEdit 
              nameBtn='CẬP NHẬT' 
              productObj={this.state.product} 
              index={index} 
              handleUpdate = {this.handleUpdate}
              showIt = {this.state.arrForm[index]}
              />
          </div>
        )
    })
    return (
	    <div className="productsManage">
        <AdminHeader/>
        <div className='admin-Layout'>
          <TabNavAdmin/>
          <div className='productsManage-main'>
            <h2>QUẢN LÝ SẢN PHẨM</h2>
            <div id= 'addProduct'>
              <h3>SỐ LƯỢNG: {this.state.totalItems}</h3>
              <button className='btn-Default' onClick = {this.handleAdd}>{this.state.labelAdd}</button>
              <FormAddEdit 
                nameBtn='THÊM SẢN PHẨM' 
                index='addPro' 
                productObj={this.state.product}
                handleUpdate = {this.handleUpdate}
                showIt = {this.state.showAddForm}
              />
            </div>
            <div id= 'listPro-admin' style={this.state.hideList}>
              {listProducts}
            </div>
            <PageNumber
              hideList= {this.state.hideList}
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
    adminPopup: state.adminPopup
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsManage);