<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- 하단 패널 HTML 정의 --%>
<div>	
<h1>서브 패널 -2 </h1>
	<p>
		<table border="1">
			<tr v-for="userinfo in lists" >
				<td>{{userinfo.userId}}</td>
				<td>{{userinfo.username}}</td>
				<td>{{userinfo.age}}</td>
			</tr>
		</table>
	</p>
</div>