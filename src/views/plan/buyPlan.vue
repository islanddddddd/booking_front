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
								<input type="text" class="form-control" v-model="tableData.operater_id" />
							</div>
							<div class="col-12">
								<p for="firstName" class="form-label  text-left">UserId</p>
								<input type="text" class="form-control" v-model="tableData.userId" />
							</div>

<!--							<div class="col-md-4">-->
<!--								<label for="state" class="form-label">PlanId</label>-->
<!--								<select class="form-select" id="state" required>-->
<!--									<option value="">Choose...</option>-->
<!--									<option>1</option>-->
<!--									<option>2</option>-->
<!--									<option>3</option>-->
<!--								</select>-->
<!--							</div>-->
							<div class="col-12">
								<p for="firstName" class="form-label  text-left">Num</p>
								<input type="text" class="form-control" v-model="tableData.num" />
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
import {buyPlan} from "../../utils/api";

export default {
	data() {
		return {
      tableData: {},
			operater_id: '',
			userId:'',
			planId:'',
			num:''
		};
	},
	methods: {
		async buy() {
      alert('buy');
      if (this.tableData.userId && this.tableData.planId && this.tableData.num) {
        const res = await buyPlan(this.tableData);
        if (res.status === 200) {
          console.log("buy success");
        }
      }
    }
	},
	components: {},
  created() {
    this.tableData.planId = this.$route.params.planId
  }
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
