<template>
	<h1>Reserve</h1>
<!-- 	<div>
		<router-link :to="{ name: 'officeMap' }">routerlink</router-link>
		<router-view></router-view>
	</div> -->
	<div class="container-fluid text-center " style="padding: 0.9375rem;">
		<div class="row col-6">
			<div class="col-2 align-self-center">Office</div>
			<select class="form-select col" aria-label="Default select example">
				<option v-for="(item, index) in offliceList" :value="item">{{ item }}</option>
			</select>
			<!-- <button type="button" class="btn btn-primary col" style="margin-left: 0.625rem;">Select</button> -->
		</div>
	</div>
	<table class="table table-striped table-hover caption-top align-middle text-center">
		<caption>List of Facility</caption>
		<thead class="table-light text-capitalize">
			<tr>
				<th scope="col" v-for="(item, index) in dataTitle">{{ item }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in data">
				<th>{{ index }}</th>
				<td v-for="(item, index) in item">{{ item }}</td>
				<td><button type="button" class="btn btn-primary" @click="select(index)">select</button></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	data() {
		return {
			offliceList: ['office1', 'office2', 'office3'],
			dataTitle: ['FacilityId', 'FacilityType', 'FacilityPrice', 'select'],
			data: {
				'1': {
					FacilityType: 'FacilityType_1',
					FacilityPrice: '10$/mo'
				},
				'2': {
					FacilityType: 'FacilityType_2',
					FacilityPrice: '20$/mo'
				},
				'3': {
					FacilityType: 'FacilityType_3',
					FacilityPrice: '30$/mo'
				}
			}
		};
	},
	methods: {
		deleteUser(userid) {
			alert(userid);
		},
		modifyUser(userid) {
			alert(userid);
		}
	},
	components: {}
};
</script>

<style></style>
