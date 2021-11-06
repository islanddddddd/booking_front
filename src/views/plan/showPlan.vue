<template>
	<div class="container py-3">
		<header>
			<div class="pricing-header p-3 pb-md-4 mx-auto text-center">
				<h1 class="display-4 fw-normal">Pricing</h1>
				<p class="fs-5 text-muted">Choose your plan</p>
			</div>
		</header>

		<main>
			<div class="container">
				<div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
					<div class="col" v-for="(item, index) in plan">
						<div class="card mb-4 rounded-3 shadow-sm">
							<div class="card-header py-3">
								<h4 class="my-0 fw-normal">{{ index }}</h4>
							</div>
							<div class="card-body">
								<h1 class="card-title pricing-card-title">
									${{ item.price }}
									<small class="text-muted fw-light">/{{ item.unit }}</small>
								</h1>
								<ul class="list-unstyled mt-3 mb-4">
									<li v-for="infoItem in item.info">{{ infoItem }}</li>
								</ul>
								<button type="button" class="w-100 btn btn-lg btn-primary" @click="buy()">Buy</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
export default {
	data() {
		return {
			plan: {
				Hour: {
					price: 10,
					unit: 'hour',
					info: {
						info1: 'Use time of a whole day',
						info2: 'Tea is free',
						info3: '特点2',
						info4: '特点3'
					}
				},
				Day: {
					price: 100,
					unit: 'day',
					info: {
						info1: 'Use time of a whole day',
						info2: 'Tea is free',
						info3: '特点2',
						info4: '特点3'
					}
				},
				month: {
					price: 300,
					unit: 'month',
					info: {
						info1: 'Use time of a whole day',
						info2: 'Tea is free',
						info3: '特点2',
						info4: '特点3'
					}
				}
			}
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
body {
	background-image: linear-gradient(180deg, #eee, #fff 100px, #fff);
}

.container {
	max-width: 960px;
}

.pricing-header {
	max-width: 700px;
}
</style>
