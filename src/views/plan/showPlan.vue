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
				<h2 class="display-6 text-center mb-4">Compare plans</h2>

				<div class="table-responsive">
					<table class="table text-center">
						<thead>
							<tr>
								<th style="width: 34%;"></th>
								<th style="width: 22%;" v-for="(item, index) in plan">{{ index }}</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in ComparePlans">
								<th scope="row" class="text-start">{{ index }}</th>
								<td v-for="(checkItem, index) in item">
									<svg
										v-if="checkItem == 1"
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-check-lg"
										viewBox="0 0 16 16"
									>
										<path
											d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
										/>
									</svg>
																		<svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
										<path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
										<path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
									</svg>
								</td>
							</tr>
						</tbody>
					</table>
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
			},
			ComparePlans: {
				public: [0, 1, 1],
				Private: [0, 1, 0],
				Sharing: [0, 1, 1],
				item2: [1, 0, 1],
				item3: [0, 0, 1],
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
