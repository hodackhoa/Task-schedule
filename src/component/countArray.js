import React from 'react';

function CountArray(arr){
  var arr1 = [];
  for(var i=0;i<arr.length;i++){
    var k=1;
    for(var j=i+1;j<arr.length;j++){
      if(arr[i]==arr[j]){
        k++;
        arr.splice(j,1);
        j--;
      }
    }
    arr1.push({id:arr[i], amount: k});
  }
  return arr1;
}
export default CountArray;
