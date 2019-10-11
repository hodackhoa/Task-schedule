function ControlSlide(arrImgslide,direction,auto, id){
	var firstCheck = false;
	if(direction=='left'){
		loopSlide(arrImgslide,- 1)
	}
	if(direction=='right'){
		loopSlide(arrImgslide, 1)
	}
	if(auto==true){
		var setloop = setInterval(()=>{
				loopSlide(arrImgslide, - 1)
			} 
				,4000)
	}
	function loopSlide(arrImgslide,sign){
		var axis = 0, arr2 =[], stopLoop = true;
		var timer = setInterval(transImg, 5);
		if(document.getElementById(id)==undefined){
			stopLoop = false;
			clearInterval(setloop)
		}
		function transImg(){
			let setT = false;
			axis++;
			if(axis==101){
				clearInterval(timer);
				setT = true;
			}
			else{
				for(var i=0;i<arrImgslide.length;i++){
					if(i<5){
						if(i==4){
							if(sign<0){
								i = arrImgslide.length - 1;
								arrImgslide[i].style.display = 'block';
								arrImgslide[i].style.position = 'absolute';
								arrImgslide[i].style.top = '0';
								arrImgslide[i].style.right = '-25%';
								arrImgslide[i].style.width = '25%';
								arrImgslide[i].style.transform = 'translateX('+(sign*axis)+'%)';
							}
							else{
								arrImgslide[i].style.display = 'block';
								arrImgslide[i].style.position = 'absolute';
								arrImgslide[i].style.top = '0';
								arrImgslide[i].style.left = '-25%';
								arrImgslide[i].style.width = '25%';
								arrImgslide[i].style.transform = 'translateX('+(sign*axis)+'%)';
							}
							continue;
						}
						arrImgslide[i].style.display = 'block';
						arrImgslide[i].style.transform = 'translateX('+(sign*axis)+'%)';
					}
					
					else{
						arrImgslide[i].style.display= 'none';
					}	
				}
			}
			if(setT && stopLoop){
				arrImgslide[4].style.position = 'static';
				arrImgslide[4].style.width = '100%';
				arrImgslide[arrImgslide.length - 1].style.position = 'static';
				arrImgslide[arrImgslide.length - 1].style.width = '100%';

				arrImgslide[1].style.transform = 'none';
				arrImgslide[2].style.transform = 'none';
				arrImgslide[3].style.transform = 'none';
				arrImgslide[4].style.transform = 'none';
				arrImgslide[arrImgslide.length - 1].style.transform = 'none';

				if(sign<0){
					arrImgslide[0].style.display = 'none'
					//arrImgslide[3].style.display = 'block';
					arrImgslide[0].removeAttribute('style');
					let parentDiv = document.getElementById(id);
					parentDiv.insertBefore(arrImgslide[arrImgslide.length - 1], arrImgslide[4])
				}
				if(sign>0){
					//arrImgslide[4].removeAttribute('style');
					arrImgslide[3].style.display = 'none';
					arrImgslide[0].style.transform = 'none';
					let parentDiv = document.getElementById(id);
					parentDiv.insertBefore(arrImgslide[4], arrImgslide[0])
				}
				firstCheck = true;
				if(direction == 'left'){
					let arr2= [];
					for(var i=0;i<arrImgslide.length;i++){
						if(i==arrImgslide.length - 1){
							arr2[i] = arrImgslide[0];
							let parentDiv = document.getElementById(id);
							parentDiv.insertBefore(arrImgslide[0], arrImgslide[5])
							//document.getElementsByClassName('slideProduct')[0].appendChild(arr2[i])
						}
						else{
							arr2[i] = arrImgslide[i+1];
						}
					}
					arrImgslide = arr2;
				}
				if(direction == 'right'){
					let arr2= [];
					for(var i=0;i<arrImgslide.length;i++){
						if(i==arrImgslide.length - 1){
							arrImgslide[4].removeAttribute('style');
							arr2[i] = arrImgslide[4];
							document.getElementById(id).appendChild(arr2[i])
						}
						else{
							arr2[i] = arrImgslide[i+1];
						}
					}
					arrImgslide = arr2;
				}
			}
		}
	}
	
}
export default ControlSlide;