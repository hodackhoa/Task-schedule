import React from 'react';

function FormatNum(a){
  if(a!='' && a!=undefined){
    a = a.toString();
    var arrM = a.split("");
    a = arrM.reverse().join("");
    arrM = [];
    for(var i = 0; i<a.length; i+=3){
      var arr2 = a.substr(i,3).split("");
      var b = arr2.reverse().join("");
      arrM.push(b);
    }
      a = arrM.reverse().join(".");
    return(a)
  }
}
export default FormatNum;