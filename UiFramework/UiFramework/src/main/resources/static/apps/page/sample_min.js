/* 
	page 에서 사용되는 (정적)서브패널을 통한한 minimizing js 파일
	 - /panel/initpanel.js, subpanel1.js, subpanel2.js 를 묶음.
	 - 개발자에게 통합 Tool 제공 필요 (page별 panel관계를 Meta DB에서 참고)
	 - 파일명 : "PAGE ID" + "_min.js"  
*/
var eventBus = new Vue();

sibaeVue.addPanel('initpanel',{
	data : function(){
		return {}
	}
});
sibaejs.getScreenType();

sibaeVue.addPanel('subpanel1',{
	data : function(){
		return {
			customerName : "",
			message : "",
			condition : "",
			username : "",
			userId : "",
			age : ""
		}
	},
	methods : {
		creatUser : function(){
			var tranId = "createUser";
			var params = {	"userId": this.userId,
							"username" : this.username,
							"age" : this.age};
			sibaejs.sendrequst(tranId, params, this.successCallback);
		},
		findUser : function(){
			var tranId = "";
			var params = {};
			console.log("condition:", this.condition);
			if(this.condition != ""){
				tranId = "findUser";
				params = {"userId": this.condition};
			}else{
				tranId = "findAllUser";
				params = {};
			}
			console.log("tranId:", tranId);
			sibaejs.sendrequst(tranId, params, this.successCallback);
		},
		successCallback : function(data){
			console.log("successCallbak data:",data);
			eventBus.$emit('list', data);
		}
		
	}
});

sibaeVue.addPanel('subpanel2',{
	data : function(){
		return {
			lists : []
		}
	},
	created : function(){
		eventBus.$on('list', this.setList);
	},
	methods : {
		setList : function(lists){
			console.log("setList called!!!", lists);
			this.lists = lists;
		}
	}
});


