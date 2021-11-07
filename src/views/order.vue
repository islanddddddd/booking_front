<template>
	<h1>Order Management</h1>
	<table class="table table-striped table-hover caption-top align-middle text-center">
		<caption>List of Order</caption>
		<thead class="table-light text-capitalize">
			<tr>
				<th scope="col" v-for="(item, index) in dataTitle">{{ item }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in data">
				<th>{{ index }}</th>
				<td v-for="(item, index) in item">{{ item }}</td>
				<td><button type="button" class="btn btn-danger" @click="deleteUser(index)">delete</button></td>
				<td><button type="button" class="btn btn-primary" v-on:click="modifyUser(index)">modify</button></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	data() {
		return {
			dataTitle: ['userId', 'userName','type','time','endtime', 'delete', 'modify'],
			data: {
				'1': {
					userName: 'shybee',
					type: 'day',
					time: '1999-09-01 12:00',
					endtime: '1999-09-02 12:00',
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
