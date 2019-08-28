/*
	sub 패널 - 2
	: 샘플 페이지의 하단 부분에 해당하는 sub 패널을 Vue컴포넌트로 생 
	(F/W의 addPanel API 사용)
*/
sibaeVue.addPanel('subpanel2',{
	data : function(){
		return {
			lists : []
		}
	},
	created : function(){
		eventBus.$on('list', this.setList); //subpanel-1 에서 데이터를 전달받기 위해  evnetBus 사용 
	},
	methods : {
		setList : function(lists){
			console.log("setList called!!!", lists);
			this.lists = lists;
		}
	}
});