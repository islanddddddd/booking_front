<template>
	<div class="container">
		<main>
			<div class="row">
				<div class="col-12">
					<h4 class="mb-3">Checkout</h4>
					<form class="needs-validation" novalidate>
						<div class="row g-3">
							<div class="col-12">
								<p for="operater_id" class="form-label  text-left">OperaterId</p>
								<input type="text" class="form-control" v-model="operater_id" />
							</div>
							<div class="col-12">
								<p for="firstName" class="form-label  text-left">UserId</p>
								<input type="text" class="form-control" v-model="userId" />
							</div>
					
							<div class="col-md-4">
								<label for="state" class="form-label">PlanId</label>
								<select class="form-select" id="state" required>
									<option value="">Choose...</option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</select>
							</div>
							<div class="col-12">
								<p for="firstName" class="form-label  text-left">Num</p>
								<input type="text" class="form-control" v-model="num" />
							</div>
						</div>
						<hr class="my-4" />
						<button class="w-100 btn btn-primary btn-lg" type="submit" @click="buy()">Buy</button>
					</form>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
export default {
	data() {
		return {
			operater_id: '',
			userId:'',
			PlanId:'',
			num:''
		};
	},
	methods: {
		buy() {
			alert('buy');
		}
	},
	components: {}
};
</script>

<style>
.bd-placeholder-img {
	font-size: 1.125rem;
	text-anchor: middle;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
}

@media (min-width: 768px) {
	.bd-placeholder-img-lg {
		font-size: 3.5rem;
	}
}
.container {
	max-width: 960px;
}
</style>
