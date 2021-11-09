<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-1"></div>
			<div class="col-2"><Sidebar></Sidebar></div>
			<div class="col-7"><router-view></router-view></div>
			<div class="col-1"></div>
		</div>
	</div>
</template>

<script>
import Sidebar from '../components/sidebar.vue';

export default {
	components: {
		Sidebar,
	}
};
</script>

<style>
div {
	padding: 0;
}
</style>
