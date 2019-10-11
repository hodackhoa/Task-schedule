import React from 'react';
import {connect} from 'react-redux'
import {Search} from '../action'

function ResponsiveMenu(){
  var resMenubar = document.getElementsByTagName('nav')[0];
  if(resMenubar!=undefined){
    resMenubar = resMenubar.children[0]
    var cloneMenubar = resMenubar.cloneNode(true);
    cloneMenubar.style.display = 'none';
    var secondMenu = document.createElement('div');
    secondMenu.setAttribute('class', 'menubar480');

    let svgMenu = document.getElementsByClassName('menubar')[0].getElementsByTagName('svg')[0]
    let cloneIcon = svgMenu.cloneNode(true);
    var btnMenu = document.createElement('button') //create button
    btnMenu.appendChild(cloneIcon)
    btnMenu.children[0].style = `display: block; font-size: 2em;`
    btnMenu.style = `
                      border-radius: 4px;
                      background-color: #e6ae48;
                      color: white;
                      border : none;
                      padding: .5em .7em;
                    `
    btnMenu.addEventListener('click', showMenu)
    secondMenu.appendChild(btnMenu)
    // style menu---------------------------------
    secondMenu.appendChild(cloneMenubar);
    ///clone Search bar -------------------
    var searchBar = document.getElementById('search')
    var cloneSearch = searchBar.cloneNode(true);
    cloneSearch.setAttribute('class', 'search480') 
    cloneSearch.removeAttribute('id')
    cloneSearch.children[0].style.display = 'none';
    var searchIcon = cloneSearch.children[1]
    searchIcon.addEventListener('click', showInputSearch)

    //------------------------------------
    document.getElementsByClassName('menubar')[0].appendChild(secondMenu)
    document.getElementsByClassName('menubar')[0].appendChild(cloneSearch)
  }
  //---------function child-----------
  let bodyTag = document.getElementsByTagName('body')[0];
  bodyTag.addEventListener('click', closeMenu)
  
  function closeMenu(e){
    if(cloneMenubar!=undefined){
      if(e.target.tagName!='BUTTON'&&e.target.tagName!='svg'&&e.target.tagName!='path'){
        cloneMenubar.style.display = 'none';
      } 
    }
  }
  function showMenu(){
    cloneMenubar.style.display=(cloneMenubar.style.display=='block')? 'none':'block' ;
  }
  function showInputSearch(e){

    console.log(e.target.parentElement.children[0])
    cloneSearch.children[0].style.display = (cloneSearch.children[0].style.display=='block')? 'none':'block';
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
const mapStateToProps=(state)=>{
  return{
    products: state.products
  }
}
export default ResponsiveMenu;