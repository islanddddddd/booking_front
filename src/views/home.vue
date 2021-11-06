<template>
	<h1>Home</h1>
	<div class="container ">
		<div class="row">
			<div class="col-4"><Sidebar></Sidebar></div>
			<div class="col-8"><router-view></router-view></div>
		</div>
	</div>
</template>

<script>
import Sidebar from '../components/sidebar.vue';

export default {
	components: {
		Sidebar: Sidebar
	}
};
</script>

<style>
.container {
	width: 100%;
}
</style>
