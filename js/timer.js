var $=function(id){
	return document.getElementById(id);
};
var dHour;
var dMinute;
var dSecond;
var display_Time=function(){
	var ti=new Date();
	dHour=ti.getHours();
	dMinute=ti.getMinutes();
	dSecond=ti.getSeconds();
	if(dHour<10){var dHour_1="0"+dHour;}
	else{var dHour_1=dHour;}
	if(dMinute<10){var dMinute_1="0"+dMinute;}
	else{var dMinute_1=dMinute;}
	if(dSecond<10){var dSecond_1="0"+dSecond;}
	else{var dSecond_1=dSecond;}
	$("distime").childNodes[0].innerHTML=dHour_1 +":"+dMinute_1;
	$("distime").childNodes[1].innerHTML=dSecond_1;
};
setInterval(display_Time,1000);
var taskAl=[];
var taskH=[];
var taskM=[];
var contentTask=function(){
	var subAl=$("task").value;
	var subH=$("taskhour").value;
	var subM = $("taskminute").value;
	
	setTimeout(function(){
	if(subAl==""||subH==""||subM==""){
		$("alert_task").innerHTML="Unset!!!";
		infDay();
	}
	else {
		$("alert_task").innerHTML="added";
		taskAl.push(subAl);
		localStorage.taskAl=taskAl.join("|");
		taskH.push(subH);
		localStorage.taskH=taskH.join("|");
		taskM.push(subM);
		localStorage.taskM=taskM.join("|");
		}
	},200);
	$("task").value="";
	$("taskhour").value="";
	$("taskminute").value="";
};
var task=function(){
	if(taskAl.length==0){
		taskAl=localStorage.taskAl.split("|");
		taskH=localStorage.taskH.split("|");
		taskM=localStorage.taskM.split("|");
	}
	if(taskAl.length>0){
		for(var i=0;i<taskAl.length;i++){
			if(taskH[i]==dHour&&taskM[i]==dMinute){
				$("alert_task").innerHTML=taskAl[i];
				setTimeout(delay(),1000);
			}
			else {
				$("alert_task").innerHTML="Have a nice day";
			}
		}
	}
	
};
var interObj=function(){
	setInterval(task,1000);
};
var infDay = function(){
	setTimeout(function(){$("alert_task").innerHTML="Have a nice day";},1000);
};
var clrTask=function(){
	localStorage.clear();
	taskAl.length=0;
	taskH.length=0;
	taskM.length=0;
	infDay();
	$("alert_task").innerHTML="Clear!!";
};
window.onload=function(){
	$("setbtn").onclick=contentTask;
	$("clrbtn").onclick=clrTask;
	interObj();
};


	

