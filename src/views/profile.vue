<template>
	<div class="p-4 mb-4 rounded bg-light">
		<div id="profileCard" class="" >
			<p class="my-3 lead" style="text-align: left;" v-for="(item, index) in userInfo">{{ index }}:{{ item }}</p>
			<p class="lead text-primary" style="text-align: left;"><a href="#" class=" fw-bold">More</a></p>
		</div>
	</div>
	<!--  -->
	<div class="row mb-2">
		<div class="col-md-6">
			<div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative profileCard">
				<div class="col p-4 d-flex flex-column position-static" @click="goPlan()">
					<strong class="d-inline-block mb-2 text-primary">Plan</strong>
					<h3 class="mb-0">{{ plan.type }}</h3>
					<div class="mb-1 text-muted">{{ plan.time }}</div>
				</div>
			</div>
		</div>
		<div class="col-md-6 ">
			<div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative profileCard">
				<div class="col p-4 d-flex flex-column position-static" @click="goOrder()">
					<strong class="d-inline-block mb-2 text-success">Order</strong>
					<h3 class="mb-0">{{ order }}</h3>
				</div>
			</div>
		</div>
	</div>

	<!--  -->
</template>

<script>
export default {
	data() {
		return {
			userInfo: {
				userName: '大烧饼',
				gender: '男'
			},
			plan: {
				type: '月卡',
				time: '2021-12-12'
			},
			order: '无'
		};
	},
	methods: {
		goPlan() {
			alert('plan');
		},
		goOrder() {
			alert('order');
		}
	},
	components: {}
};
</script>

<style>
.profileCard {
	min-height: 9.375rem;
	cursor: pointer;
}
</style>
