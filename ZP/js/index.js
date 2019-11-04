//==============提前声明
var baseURL = "http://203.195.246.58:7777";

//分页功能
var cpage=1;//当前在多少页
function getData(page,data){
    var total = data.length;//总个数
    var nums=5;//一页显示多少条记录
    var sum_page;//总页数
    //计算总页码
    if (total%nums==0){
        sum_page=parseInt(total/nums);
    }else {
        sum_page=parseInt(total/nums+1);
    }
    var newdata='';//新数据
    cpage=page;//改变当前页面
    var i = (cpage-1)*5;//公式：计算当前的索引
    for(j=0;j<=4;j++){
        if(data[i+j]==undefined){
            break;
        }
        newdata += "<div class='m'><h4>"+data[i+j].title+"</h4><div class='m_1'>"+data[i+j].salary+"</div><div class='w'><div class='m_2 c1'>"+data[i+j].welfare+"</div></div><div class='m_9'><p>工作时间："+data[i+j].workingHours+"</p><p>工作类型："+data[i+j].job+"</p><p>招聘人数："+data[i+j].num+"</p><p>工作地点："+data[i+j].city+"</p></div><div class='m_3'>一键报名</div></div>"
    }
    $("#con_menu").empty();
    $('#con_menu').append(newdata);
    getPage(data,cpage,sum_page);
}
function getPage(data,cpage,sum_page){
    var list='';//数字列表
    var num=2;//列表前后有几个数字
    var num_page=cpage;//当前页码
    var new_num;//动态页面
    var jsondata = JSON.stringify(data);
    
    //当前数字之前
    for(i=num;i>=1;i--){
        new_num=num_page-i;
        if(new_num>=1){
            list+="<li><a href='javascript:void(0)' onclick='getData("+new_num+","+jsondata+")'>"+ new_num +"</a><li>";
        }
    }
    //当前数字
    list+="<li>"+cpage+"<li>";
    //当前数字之后
    for(i=1;i<=num;i++){
        new_num=num_page+i;
        if(new_num<=sum_page){
            list+="<li><a href='javascript:void(0)' onclick='getData("+new_num+","+jsondata+")'>"+new_num +"</a><li>";
        }else{
            break;
        }
    }
    $('.menu').empty();
    $('.menu').append(list);
}
// 查询所有招聘信息
function find_employment(){
	var url = baseURL+"/Employment/findAll";
	$.get(url,function(result){
		if (result.status === 200) {
			getData(cpage,result.data);
			result.data.forEach(function(item){
				// console.log(item);
			});
		}
	});
}
// 查找工作分类
function find_job_status(){
	var url = baseURL+"/Jobs/findAll"
	$(".hm >div:first-child .hm_1_r>ul").empty();
	$(".hm >div:first-child .hm_1_r>ul").append($(`<li><a href="#"   class="s">全部</a></li>`));
	$.get(url,function(result){
		if(result.status===200){
			var arr = [];
			result.data.forEach(function(item){
				// console.log(item.status);
				arr.push(item.status);
			});
			// console.log(arr);
			// 自定义数组去重函数
			Array.prototype.myInfo = function(){
				var newArr = [];
				// console.log(newArr);
				for (var i = 0; i < arr.length; i++) {
					var a = newArr.indexOf(arr[i]);
					// console.log(a);
					if (a == -1) {
						newArr[newArr.length] = arr[i];
					}
				}
				return newArr;
			}
			//arr调用自定义去组函数，并且将返回值复制给result，此时result中放的就是去重后的status
			var result = arr.myInfo();
			// console.log(result);
			result.forEach(function(item){
				//判断item不为空后再追加
				if (item != null && item != '') {
					$(".hm >div:first-child .hm_1_r>ul").append($(`
						<li><a href="#">`+item+`</a>
							<div class="ffc">
					            <img id="u197_img" class="ffimg" src="images/index/u197.png" >
					            <ul class="ff">
					            </ul>
					        </div>
						</li>
					`));
				}
			})
		}
	});
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
}
// 查找城市
function find_city(){
	var url = baseURL+"/City/findAll"
	// var arr_city = [];
	$.get(url,function(result){
		$(".hm>div:nth-child(2) .hm_1_r>ul").empty();
		$(".hm>div:nth-child(2) .hm_1_r>ul").append($(`<li><a href="#"   class="s">全部</a></li>`));
		if(result.status===200){
			result.data.forEach(function(item){
				// console.log(item);
				$(".hm>div:nth-child(2) .hm_1_r>ul").append($(`
					<li><a href="#">`+item.name+`</a></li>
					`));
			});
		}
		
	});
}

// 查询福利
function find_welfare(){
	var url = baseURL+"/Welfare/findAll"
	// var arr_welfare = [];
	$.get(url,function(result){
		$(".hm>div:nth-child(3) .hm_1_r>ul").empty();
		$(".hm>div:nth-child(3) .hm_1_r>ul").append($(`<li><a href="#"   class="s">全部</a></li>`));
		if(result.status===200){
			result.data.forEach(function(item){
				// console.log(item);
				$(".hm>div:nth-child(3) .hm_1_r>ul").append($(`
					<li><a href="#">`+item.name+`</a></li>
					`));
			});
		}
		
	});
}
$(function(){
	// 1. 给一键报名按钮绑定事件
	$("#con_menu").on("click","div",function(){
		if (this.className == "m_3") {
			alert(1);
		}
	});
});

//=========文档加载后执行
$(function(){
	// 为导航添加事件
	find_job_status();
	find_city();
	find_welfare();
	find_employment();

});