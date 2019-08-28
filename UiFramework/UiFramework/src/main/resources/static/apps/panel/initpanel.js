/*
	init 패널
	: 페이지를 대표하는 패널
	- page : panel = 1 : 1 인 경우, init 패널 = sub 패널
	- page : panel = 1 : N 인 경우, init 패널은 sub 패널들의 배치를 정의하는 layout 페이지  
*/
var eventBus = new Vue();

/*
	init panel을 Vue 컴포넌트로 정의
	(F/W의 addPanel API 사용)
*/
sibaeVue.addPanel('initpanel',{
	data : function(){
		return {}
	}
});
sibaejs.getScreenType();
