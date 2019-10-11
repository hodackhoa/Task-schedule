import React from 'react';
import {connect} from 'react-redux'
import axios from '../../../node_modules/axios'
import '../../css/css-adminPage/categoryManage.css'
import TabNavAdmin from './tabNavAdmin.js'
import AdminFooter from './footer.js'
import AdminHeader from './header.js'
import FormCategory from './formCategory.js'
import {GetData} from '../../action'
import {GetCategories } from '../../action'
import PageNumber from '../pageNumber.js'
import {AdminPopup} from '../../action'

class CategoryManage extends React.Component {
	constructor(props){
    super(props);
    this.state={
      categories: [],
      category: '',
      arrForm: [],
      showAddForm: {display: 'none'},
      labelEdit: [],
      labelAdd: 'THÊM LOẠI RƯỢU',
      hideList: {display: 'block'},
      totalItems: 0,
      pagePresent: 1,
      arrCountProduct: [],
      hasShowList: true
    }
  }
  componentDidMount(){
    axios.get('http://localhost:3001/categories?_page=1&_limit=10')
    .then(response=>{
      let arrTemp =[]
      for(let i=0;i<response.data.length;i++){
        axios.get('http://localhost:3001/products?_page=1&_limit=1&categoryId='+response.data[i].id)
        .then(response2=>{
          arrTemp.push(response2.headers['x-total-count'])
          this.setState({
            totalItems: parseInt(response.headers['x-total-count']),
            arrCountProduct: arrTemp,
            categories: response.data
          })
        })
      }
    })
  }
  componentDidUpdate(){
    if(this.props.adminPopup.display==true){
      this.handleDel(this.props.adminPopup)
      this.props.dispatch(AdminPopup({display:'none'}))
    }
  }
  static getDerivedStateFromProps(props, state){
    return (props.categories.length>0 && state.hasShowList)?{categories: props.categories, hasShowList: false}:null
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
      category: this.state.categories[index],
      arrForm: copyState,
      labelEdit: copyStateLabel
    })
  }
  handleUpdate=(e, obj, index)=>{
    e.preventDefault() 
    let objTemp = {...obj}
    delete objTemp.products;
    if(index!='addCategory'){
      axios.patch('http://localhost:3001/categories/'+ obj.id, objTemp)
      .then(response=>{
        //console.log(response.data)
        axios.get('http://localhost:3001/categories?_embed=products')
        .then(response=>{
          this.props.dispatch(GetCategories(response.data))
          let copyState = [...this.state.arrForm]
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
      })
    }
    else{
      axios.post('http://localhost:3001/categories', objTemp)
      .then(response=>{
        console.log(response.data)
        axios.get('http://localhost:3001/categories?_page='+this.state.pagePresent+'&_limit=10')
        .then(response=>{
          this.setState({
            totalItems: parseInt(response.headers['x-total-count']),
            showAddForm: {display: 'none'},
            labelAdd: 'THÊM LOẠI RƯỢU',
            hideList: {display: 'block'},
            categories: response.data
          })
        }).catch((err)=>{
          console.log(err)
        })
      })
    }
  }
  handleDel=(e,id, index)=>{
    if(e.display){
      axios.delete('http://localhost:3001/categories/'+ e.idDel)
      .then(response=>{
        let categoriesTemp = this.state.categories
        categoriesTemp.splice(e.indexDel, 1)
        if(categoriesTemp.length===0){
          axios.get('http://localhost:3001/categories?_page='+ (this.state.pagePresent- 1)+'&_limit=10')
          .then(response=>{
            this.setState({
              totalItems: parseInt(response.headers['x-total-count']),
              categories: response.data
            })
          })
        }
        this.props.dispatch(GetCategories(categoriesTemp))
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
      category: '',
      labelAdd: (this.state.labelAdd==="THÊM LOẠI RƯỢU")? 'HỦY' : "THÊM LOẠI RƯỢU",
      showAddForm: (this.state.showAddForm.display==="block")? {display: 'none'} : {display: "block"},
      hideList: (this.state.labelAdd==="THÊM LOẠI RƯỢU")?{display: 'none'}:{display: "block"}
    })
  }
  handleListNum=(numberPage)=>{
    axios.get('http://localhost:3001/categories?_page='+numberPage+'&_limit=10')
    .then(response=>{
      this.setState({
        totalItems: parseInt(response.headers['x-total-count']),
        categories: response.data,
        pagePresent: numberPage
      })
    })
  }
  render(){
    const listCategories = this.state.categories.map((item,index)=>{
      if(this.state.arrForm.length<this.state.categories.length){
        this.state.arrForm.push({display:'none'})
        this.state.labelEdit.push('CHỈNH SỬA')
      }
      return (
          <div  key={index} className='category-admin'>
            <div className='categoryAdmin-child'>
              <h3>Tên: {item.name}</h3>
            </div>
            <div className='categoryAdmin-child'>
              <h3>Số lượng sản phẩm: <span className='proNameSty'>{this.state.arrCountProduct[index]}</span></h3>
            </div>
            <div className= 'categoryAdmin-child' id= 'btn-categoryAdmin'>
              <button className='btn-Default' onClick={(e)=>this.handleEdit(e, index)}>{this.state.labelEdit[index]}</button><br/>
              <button className='btn-Default' onClick={(e)=>this.handleDel(e,item.id,index)}>XÓA</button>
            </div>
            <FormCategory
              nameBtn='CẬP NHẬT' 
              categoryObj={this.state.category} 
              index={index} 
              handleUpdate = {this.handleUpdate}
              showIt = {this.state.arrForm[index]}
            />
          </div>
        )
    })
    return (
	    <div className="categoryManage">
        <AdminHeader/>
        <div className='admin-Layout'>
          <TabNavAdmin/>
          <div className='categoryManage-main'>
            <h2>CÁC LOẠI RƯỢU</h2>
            <div id= 'addCategory'>
              <button className='btn-Default' onClick = {this.handleAdd}>{this.state.labelAdd}</button>
              <FormCategory
                nameBtn='THÊM LOẠI RƯỢU' 
                index='addCategory' 
                productObj={this.state.category}
                handleUpdate = {this.handleUpdate}
                showIt = {this.state.showAddForm}
              />
            </div>
            <div id='list-categoryManage' style={this.state.hideList}>
              {listCategories}
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
    categories: state.categories,
    adminPopup: state.adminPopup
  }
}
export default connect(mapStateToProps, null)(CategoryManage);