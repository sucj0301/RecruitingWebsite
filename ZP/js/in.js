var baseURL = "http://203.195.246.58:7777";
// 去重函数
function del_rep(arr,str){
	Array.prototype.myInfo = function(){
		var newArr = [];
		for(var i=0;i<this.length;i++){
			var a = newArr.indexOf(this[i]);
			if(a==-1){
				newArr[newArr.length] = this[i];
			}
		}
		return newArr;
	}
	var result = arr.myInfo();
	result.forEach(function(item){
		if(item!=null&&item!=""){
			var newli = $(`
				<li><a href="#">`+item+`</a>
					<div class="ffc">
			            <img id="u197_img" class="ffimg" src="images/index/u197.png" >
			            <ul class="ff">
			            </ul>
			        </div>
				</li>
			`);
			$(str).append(newli);
		}
	});
}
// 查找工作分类
function find_job_status(){
	var url = baseURL+"/Jobs/findAll"
	var arr_job_status = [];
	$.get(url,function(result){
		$(".hm >div:first-child .hm_1_r>ul").empty();
		$(".hm >div:first-child .hm_1_r>ul").append($(`<li><a href="#"   class="s">全部</a></li>`));
		if(result.status===200){
			result.data.forEach(function(item){
				arr_job_status.push(item.status);
			});
			del_rep(arr_job_status,".hm >div:first-child .hm_1_r>ul");
		}
	});
}
// 查找城市
function find_city(){
	var url = baseURL+"/City/findAll"
	var arr_city = [];
	$.get(url,function(result){
		$(".hm>div:nth-child(2) .hm_1_r>ul").empty();
		$(".hm>div:nth-child(2) .hm_1_r>ul").append($(`<li><a href="#"   class="s">全部</a></li>`));
		if(result.status===200){
			result.data.forEach(function(item){
				arr_city.push(item.name);
			});
			// del_rep(arr_city,".hm>div:nth-child(2) .hm_1_r>ul");
		}
		// 去重
		Array.prototype.myInfo = function(){
			var newArr = [];
			for(var i=0;i<this.length;i++){
				var a = newArr.indexOf(this[i]);
				if(a==-1){
					newArr[newArr.length] = this[i];
				}
			}
			return newArr;
		}
		var result = arr_city.myInfo();
		result.forEach(function(item){
			if(item!=null&&item!=""){
				var newli = $(`<li><a href="#">`+item+`</a></li>`);
				$(".hm>div:nth-child(2) .hm_1_r>ul").append(newli);
			}
		});
	});
}
$(function(){
	find_job_status();
	find_city();
	// 给职位分类添加鼠标悬浮
	// 根据分类查找职位 
	$(".hm >div:first-child .hm_1_r>ul").on("mouseenter","li",function(){
		var status = $(this).find("a").text();
		var url = baseURL+"/Jobs/findByStatus";
		var data = {
			staus:status
		}
		var li = $(this);
		var arr = [];
		$.get(url,data,function(result){
			li.find("ul").empty();
			if(result.status===200){
				result.data.forEach(function(item){
					arr.push(item.name);
					// li.find("ul").append($(`<li>`+item.name+`</li>`));
				});
			}
			// 去重
			Array.prototype.myInfo = function(){
				var newArr = [];
				for(var i=0;i<this.length;i++){
					var a = newArr.indexOf(this[i]);
					if(a==-1){
						newArr[newArr.length] = this[i];
					}
				}
				return newArr;
			}
			var result = arr.myInfo();
			result.forEach(function(item){
				if(item!=null&&item!=""){
					var newli = $(`<li><a href="#">`+item+`</a></li>`);
					li.find("ul").append(newli);
				}
			});
		});
	});

});