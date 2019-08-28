/*
	sub 패널 - 1
	: 샘플 페이지의 상단 부분에 해당하는 sub 패널을 Vue컴포넌트로 생 
	(F/W의 addPanel API 사용)
*/
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
			eventBus.$emit('list', data);    //subpanel-1 컴포넌트에서 데이터 조회 후, subpanel-2로 전달하기 위해 evnetBus 사용 
		}
		
	}
});