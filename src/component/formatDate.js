import React from 'react';

function FormatDate(a){
  if(a!='' && a!=undefined){
    a = a.split(" ")
    a.splice(a.length-3, 3);
    var b = []
    b = [convertWeek(a[0]), a[2], convertMonth(a[1]), a[3], a[4]];
    b = b[0]+ " " +b[1]+"/"+b[2]+"/"+b[3]+" "+b[4]
    return(b);
  }
  function convertWeek(str){
    switch (str) {
      case "Mon":
        return "Thứ 2"
        break;
      case "Tue":
        return "Thứ 3"
        break;
      case "Wed":
        return "Thứ 4"
        break;
      case "Thu":
        return "Thứ 5"
        break;
      case "Fri":
        return "Thứ 6"
        break;
      case "Sat":
        return "Thứ 7"
        break;
      case "Sun":
        return 'CN'
        break;
      default:
        return str
        break;
    }
  }
  function convertMonth(str){
    switch (str) {
      case "Jan":
        return "1"
        break;
      case "Feb":
        return "2"
        break;
      case "Mar":
        return "3"
        break;
      case "Apr":
        return "4"
        break;
      case "May":
        return "5"
        break;
      case "June":
        return "6"
        break;
      case "July":
        return '7'
        break;
      case "Aug":
        return '8'
        break;
      case "Sep":
        return '9'
        break;
      case "Oct":
        return '10'
        break;
      case "Nov":
        return '11'
        break;
      case "Dec":
        return '12'
        break;
      default:
        return str
        break;
    }
  }
}
export default FormatDate;