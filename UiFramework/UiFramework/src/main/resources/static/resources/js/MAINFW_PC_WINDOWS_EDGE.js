/*
	F/W 공통 라이브러리 파일
	(클라이언트 Type이  PC + WINDOWS + EDGE 경우) 
	
*/
var vm = {};
var __components = {};
var sibaejs = {};  //FW common javascript Namespace

/* 
	FW Core 라이브러리
	- 현재는 render, addPanel 만 구현해 봄. 향후 확장 필요 
*/   
var sibaeVue = (function () {
	//default option Vue 생성 
	function initVueOptions(vueOptions) {
		if (!vueOptions) vueOptions = {};

		var __defaultOption = {
			el: '#app',
			mounted: function () {
			}
		}
		var __options = Object.assign({}, vueOptions, __defaultOption);
		return __options;
	}

	return {
		/* 
			render
			: Vue 렌더링 실행하여 해당 화면에 대한 Vue instance 생성
		      - 템플릿 파일(pageTemplate.jsp)에서 DOMContentLoaded 직후 호출  
		 */
		render: function (pageid) {
			var __pageOptions = { "PAGEID": pageid };
			vm = new Vue(initVueOptions(__pageOptions));
		},
		/* 
			getVueInstance
			: Vue 인스턴스 객체 조회  
		 */
		getVueInstance: function () {
			return vm;
		},
		/*
			addPanel
			: panel 컴포넌트 등록 
			  - 개별 panel js 파일에서 사용
		*/
		addPanel: function (panelId, pageOptions) {
			if (!pageOptions) pageOptions = {};
			console.log(panelId);
			pageOptions.template = '#' + panelId;
			pageOptions.panelId = panelId;

			__components[panelId] = pageOptions;

			Vue.component(panelId, pageOptions);
		}
	}

}());


/*
	ready 함수  
	 : 페이지 로딩시에 모든 웹 리소스 다운로드 완료후 render 실행하기 위한 용도  
	 * jQuery의 ready 함수와 유사
*/
(function () {
	var __readyCallbacks = [];
	whenReady = function (fn) {
		__readyCallbacks.push(fn);
	}

	function initializer() {}

	initializer.prototype.ready = function (fn) {
		whenReady(fn);
		return this;
	}

	initializer.prototype.executeReady = function (fn) {
		while (__readyCallbacks.length) {
			fn = __readyCallbacks.shift();

			if (typeof fn === 'function') {
				__executeReady(fn);
			}
		}
		sibaejs.loadCompleted = true;
	}

	var sibaeInitializer = new initializer();
	window.sibaejs.ready = sibaeInitializer.ready;
	window.sibaejs.__executeReady = sibaeInitializer.executeReady;
}());

function __completed() {
	document.removeEventListener("DOMContentLoaded", __completed);
	window.removeEventListener("load", __completed);

	sibaejs.__executeReady();
}

if (document.readyState === "complete") {
	window.setTimeout(sibaejs.__executeReady);
} else {
	document.addEventListener("DOMContentLoaded", __completed);
	window.addEventListener("load", __completed);
}

/*
	클라이언트 screen type 추출 기능
*/
var ScreenType = {
	Android: function () {
		return navigator.userAgent.match(/Android/i) == null ? false : true;
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
	},
	IOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
	},
	Windows: function () {
		return navigator.userAgent.match(/Windows/i) == null ? false : true;
	},
	
	Edge: function () {
		return navigator.userAgent.match(/edge/i) == null ? false : true;
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
	},
	Chrome: function () {
		return navigator.userAgent.match(/chrome/i) == null ? false : true;
	},
	Firefox: function () {
		return navigator.userAgent.match(/firefox/i) == null ? false : true;
	},		
	IE: function () {
		return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
	}
};

sibaejs.getScreenType = function(){
	var deviceType ="";
	var osType ="";
	var browseType ="";

	console.log(navigator.userAgent);
		
	if (ScreenType.Android()) {
		deviceType = "Android Phone";
	} else if (ScreenType.IOS()) {
		deviceType = "IPhone";
	} else if (ScreenType.BlackBerry()) {
		deviceType = "BlackBerry";
	} else {
		deviceType = "PC";
	}	
	console.log("deviceType:",deviceType);

	if (ScreenType.Android()) {
		osType = "Android";
	} else if (ScreenType.IOS()) {
		osType = "IOS";
	} else if (ScreenType.BlackBerry()) {
		osType = "BlackBerry";
	} else if (ScreenType.Windows()) {
		osType = "Windows";
	}
	console.log("osType:",osType);	

	if (ScreenType.Edge()) {
		browseType = "Edge";
	} else if (ScreenType.Opera()) {
		browseType = "Opera";
	} else if (ScreenType.Chrome()) {
		browseType = "Chrome";
	} else if (ScreenType.Firefox()) {
		browseType = "Firefox";
	} else if (ScreenType.IE()) {
		browseType = "IE";
	}
	console.log("browseType:",browseType);		
};

/*
	sendrequst
	 : 데이터 요청 단일  API
	  - tranId : 트랜ID  *ID체계 정의 필요
	  - params : JSON 파라메터
	  - callback : success callback 
 
*/

sibaejs.sendrequst = function(tranId, params, callback){
	const baseURI ='http://localhost:18080';
	var requstUrl = baseURI + '/data/' + tranId + '.do';

	console.log("params:", params);
	axios.post(requstUrl, {
		params: JSON.stringify(params)
	})
	.then( function(response){
		console.log(response.data) ;
		callback(response.data);	
	});
}