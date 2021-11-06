<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
	<div>
		<router-link  to="/">login</router-link>|
		<router-link  to="/register">register</router-link>|
		<router-link  to="/home">home</router-link>|
		<router-link  to="/showPlan">showPlan</router-link>|
		<router-link  to="/buyPlan">buyPlan</router-link>|
		<router-link  to="/userManagement">userManagement</router-link>|
	</div>
	<router-view></router-view>
</template>

<style>
html,
body,
#app {
	height: 100%;
	
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/* text-align: center; */
	color: #2c3e50;
}
</style>
