<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="java.util.List,java.util.Map" %>
<%

	Map panelInfo = (Map)request.getAttribute("panelInfo");
	String initpanel = (String)panelInfo.get("initpanel");
	List sPanelList = (panelInfo.get("spanel")!=null ? (List)panelInfo.get("spanel"): null);
	List dPanelList = (panelInfo.get("dpanel")!=null ? (List)panelInfo.get("dpanel"): null);

	pageContext.setAttribute("initpanel", initpanel);
%>
<c:set var="sPanelList" value="<%=sPanelList%>"/>

<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Template Page HTML</title>
	<script type="text/javascript" src="/resources/js/vue.js"></script>
	<script type="text/javascript" src="/resources/js/axios.js"></script>
	<c:if test="${browserType eq 'IE'}"> <!-- IE 인 경우에 polyfill 적용 -->
		<script type="text/javascript" src="/resources/js/polyfill.js"></script>
	</c:if>

	<script type="text/javascript" src="/resources/js/MAINFW_${deviceType}_${osType}_${browserType}.js"></script> <!-- 클라이언트 screen type에 따른 f/w 리소스 연결 -->
	<script type="text/javascript" src="/apps/page/${pageId}_min.js"></script><!-- page min js -->
</head>
<body>
	<!--페이지 Root DIV -->
	<div id="app">
		<${initpanel}></${initpanel}>
	</div>
	<!--init Panel HTML X-template -->
	<script type="text/x-template" id="${initpanel}">
		<jsp:include page="/WEB-INF/jsp/page/${initpanel}.jsp" flush="true"></jsp:include>
	</script>
	<c:forEach var="sPanel" items="${sPanelList}">
		<script type="text/x-template" id="${sPanel}">
			<jsp:include page="/WEB-INF/jsp/page/${sPanel}.jsp" flush="true"></jsp:include>
		</script>
	</c:forEach>
	<!--페이지 rendering 처리-->
	<script type="text/javascript">
		// DOMContentLoaded 시점에 rendering 수행 
		sibaejs.ready(
			sibaeVue.render("${pageId}")
		);
	</script>
</body>
</html>