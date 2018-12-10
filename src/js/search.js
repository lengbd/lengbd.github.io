var allBDname = [];//所有查询出来的补丁名称
var idArray = [];//所有查询出来的补丁的ID
var noRepeatArray = [];//所有去重查询出来的补丁ID
var allIDArray = [];//所有补丁ID
var noRepeatallIDArray = [];//去重的所有补丁ID
var indexArray = [];//所有查询出来的补丁在table中的位置下标
var titleidArray = [];//查询到的补丁大分类ID
var titlenameArray = [];//查询到的补丁大分类名字
var titleindexArray = [];//查询到的补丁在body中的位置下标
var titleAllIdArray = [];//补丁大分类ID
var titlenorallIdArray = [];//去重的补丁大分类ID
var titlenoridArray = [];//去重的被查询出来的ID


$(function(){
  $('#search_input').keypress(function(event) {
       if (event.keyCode == "13") {
			$('#search_input').click(searchText(this));  
        }  
    });
});

//function searchText(obj){
function searchText(){
	if(noRepeatallIDArray.length > 0){//如果去重的所有补丁ID有值，说明这是多次查询，将所有隐藏的显现
		for(var l = 0 ; l < noRepeatallIDArray.length ; l++){
			$("#"+noRepeatallIDArray[l]+"").slideDown();
		}
	}
	
	if(noRepeatArray.length > 0){//所有去重查询出来的补丁ID有值，说明多次查询，开始前再点击一次，缩放窗口
		for(var h = 0; h < noRepeatArray.length; h++){
			$("#"+noRepeatArray[h]+"").click(); 
		} 
	}
	
	if(titlenorallIdArray.length > 0){
		for(var qs = 0 ; qs < titlenorallIdArray.length ; qs++){
			$("#"+titlenorallIdArray[qs]+"").slideDown();
		}
	}
	
	if(titlenoridArray.length > 0){
		for(var qa = 0; qa < titlenoridArray.length; qa++){
			$("#"+titlenoridArray[qa]+"").click(); 
		} 
	}
	
	noRepeatArray = [];//所有去重查询出来的补丁ID
	allIDArray = [];//所有补丁ID
	noRepeatallIDArray = [];//去重的所有补丁ID
	titleidArray = [];//查询到的补丁大分类ID
	titlenameArray = [];//查询到的补丁大分类名字
	titleindexArray = [];//查询到的补丁在body中的位置下标
	titleAllIdArray = [];//补丁大分类ID
	titlenorallIdArray = [];//去重的补丁大分类ID
	titlenoridArray = [];//去重的被查询出来的ID
	
	var searchText = $("#search_input").val();//查询值
	if(searchText == null || searchText == ""){//查询值为空刷新当前页面
		return false;
	}
	var tdLabel = $("#indexBody").find('th.BDname');//所有补丁的控件
	
	var bdtitle = $("#indexBody").find('div.mdui-panel-item-header');//所有大标题的控件
	
	for(var q = 2; q < 36 ; q++){
		titleAllIdArray.push(bdtitle.eq(q).attr("id"));//所有大标题的ID
		if(bdtitle.eq(q).text().indexOf(searchText) > -1){
			titleidArray.push(bdtitle.eq(q).attr("id"));//查询到的大标题的ID
			titlenameArray.push(bdtitle.eq(q).text());//查询到的大标题的名字
			titleindexArray.push(q);////查询到的大标题的下标
		}
	}
	
	if(allBDname.length > 0 && idArray.length > 0 && indexArray.length > 0){//如果这三个有值，说明多次查询，去掉之前的样式
		for(var a = 0 ; a < allBDname.length ; a++){
			var oldRow = '<th class="BDname" id="'+tdLabel.eq(indexArray[a]).attr("id")+'">'+tdLabel.eq(indexArray[a]).text()+'</th>';
			tdLabel.eq(indexArray[a]).after(oldRow);
			tdLabel.eq(indexArray[a]).remove();
		}		
	}
	
	allBDname = [];
	idArray = [];
	indexArray = [];//所有查询出来的补丁在table中的位置下标
	
	for(var k = 0 ; k < tdLabel.length ; k++){
		allIDArray.push(tdLabel.eq(k).attr("id"));//所有补丁的ID
		if(tdLabel.eq(k).text().indexOf(searchText) > -1){
			allBDname.push(tdLabel.eq(k).text());//所欲被查询到补丁的名字
			idArray.push(tdLabel.eq(k).attr("id"));//所有被查询到补丁的ID
			indexArray.push(k);//所有被查询到补丁的下标
			var  newRow = '<th class="BDname" id="'+tdLabel.eq(k).attr("id")+'"><font  color="#FF0000">'+tdLabel.eq(k).text()+'</font></th>';
			tdLabel.eq(k).after(newRow);//给定标红
			tdLabel.eq(k).remove();
		}
	}
	
	if(idArray.length > 0){//去掉所有补丁的ID数组中所有被查询到的ID
		for(var i=0;i<idArray.length;i++){
			for(var j=0;j<allIDArray.length;j++){
				if(allIDArray[j]==idArray[i]){
					allIDArray.splice(j,1);
					j--;
				}
			}
		}
		for(var s = 0; s < allIDArray.length; s++){//去掉查询出的ID之后，去掉所有补丁的ID中重复的ID
			if (noRepeatallIDArray.indexOf(allIDArray[s]) == -1) noRepeatallIDArray.push(allIDArray[s]); 
		}
		for(var z = 0; z < idArray.length; z++){//所有被查询到补丁的ID中的重复ID
			if (noRepeatArray.indexOf(idArray[z]) == -1) noRepeatArray.push(idArray[z]); 
		} 
		
		if(noRepeatArray.length > 0){//英雄补丁大控件点击
		
				$('#yxbd')[0].click();
			for(var h = 0; h < noRepeatArray.length; h++){//挨个点击对应查出来的补丁的大标题
				$("#"+noRepeatArray[h]+"").click(); 
			} 
		}

		for(var l = 0 ; l < noRepeatallIDArray.length ; l++){//其他的不属于查出来的大标题滑动隐藏
			$("#"+noRepeatallIDArray[l]+"").remove();
		}
	}else if(idArray.length == 0 && titlenameArray.length > 0){//如果查出来补丁没有值，但是对应补丁大分类有值
		//$('#qtbd')[0].click();
		//for(var w = 0; w < titleidArray.length; w++){
		//	$("#"+titleidArray[w]+"").click(); 
		//}
		//for(var e = 0; e < titleidArray.length; e++){
		//	if (titlenorIdArray.indexOf(titleidArray[e]) == -1) titlenorIdArray.push(titleidArray[e]); 
		//} 
		//for(var r = 0 ; r < titlenorIdArray.length ; r++){
		//	$("#"+titlenorIdArray[r]+"").slideUp();
		//}
		
		if(titleidArray.length > 0){//去掉所有补丁的ID数组中所有被查询到的ID
			for(var d=0;d<titleidArray.length;d++){
				for(var f=0;f<titleAllIdArray.length;f++){
					if(titleAllIdArray[f]==titleidArray[d]){
						titleAllIdArray.splice(f,1);
						f--;
					}
				}
			}
		}
		for(var x = 0; x < titleAllIdArray.length; x++){//去掉查询出的ID之后，去掉所有补丁的ID中重复的ID
			if (titlenorallIdArray.indexOf(titleAllIdArray[x]) == -1) titlenorallIdArray.push(titleAllIdArray[x]); 
		}
		for(var v = 0; v < titleidArray.length; v++){//所有被查询到补丁的ID中的重复ID
			if (titlenoridArray.indexOf(titleidArray[v]) == -1) titlenoridArray.push(titleidArray[v]); 
		} 
		
		if(titlenoridArray.length > 0){//英雄补丁大控件点击
			$('#yxbd')[0].click();
			for(var g = 0; g < titlenoridArray.length; g++){//挨个点击对应查出来的补丁的大标题
				$("#"+titlenoridArray[g]+"").click(); 
			} 
		}

		for(var yu = 0 ; yu < titlenorallIdArray.length ; yu++){//其他的不属于查出来的大标题滑动隐藏
			$("#"+titlenorallIdArray[yu]+"").slideUp();
		}
	}else if(idArray.length == 0 && titlenameArray.length == 0){
		mdui.alert("无搜索结果，请确认后重试");
	}
	$("#search_input").val("");
}
