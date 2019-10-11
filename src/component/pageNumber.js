import React from 'react';

class PageNumber extends React.Component {
	constructor(props){
    super(props);
    this.state={
      styleNum: [],
      stopPushNum: true
    }
  }
  componentDidMount(){
  	this.handleSplitPage(null,0)
  }
	handleSplitPage=(e,index)=>{
		//window.scrollTo(0,0)
    this.props.handleListNum(index + 1)
    //style Number active----------------------
    let copyState = [...this.state.styleNum]
    for(let i=0;i<copyState.length;i++){
    	copyState[i] = {color: '#595959'}
    }
    copyState[index] = {color: '#f26522'}
    this.setState({
    	styleNum: copyState
    })
	}
	render(){
		const stylePageNum = {
			border: '1px solid #9c9c9c',
			textAlign: 'right',
			paddingRight: '2em',
      display: (this.props.hideList==undefined)? 'block':this.props.hideList.display
		}
		//-------------------
		let num =0, arrNum=[];
		if(this.props.totalItems%this.props.amountItem==0){
        num = this.props.totalItems/this.props.amountItem;
      }
    else{
      num = parseInt((this.props.totalItems/this.props.amountItem)) + 1
    }
    for(let i=0; i<num; i++){
        arrNum.push(i+1)
     }
		const listNum = arrNum.map((item,index)=>{
			if(this.state.styleNum.length<arrNum.length){
				this.state.styleNum.push({color: '#595959'})
			}
			return (
					<a key={index} style={this.state.styleNum[index]} 
						onClick={(e)=>{this.handleSplitPage(e,index)}}>{item}
					</a>
				)
		})
		return (
			<div className='pageNumber' style ={stylePageNum}>
				{listNum}
			</div>
		);
	}
}

export default PageNumber;