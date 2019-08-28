<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- 상단 패널 HTML 정의 --%>
<div>
	<h1>서브 패널 -1</h1>

	<p>
		신규 사용자 입력 <button v-on:click="creatUser">입력 </button> <br>
		사용자ID <input name="userId" v-model="userId"> <br>
		사용자명 <input name="username" v-model="username"> <br>
		연령  <input name="age" v-model="age"> <br>
		

	</p>
	<p>조회조건 <input name="condition" v-model="condition">
		<button v-on:click="findUser">조회</button>
	</p>
</div>