<template>
	<h1>Orders</h1>
	<table class="table table-striped table-hover caption-top align-middle">
		<caption>List of orders</caption>
		<thead class="table-light">
			<tr>
				<th scope="col">orderID</th>
				<th scope="col">userName</th>

				<th scope="col">delete</th>
				<th scope="col">modify</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in users">
				<th>{{ index }}</th>
				<td>{{ item.userName }}</td>
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
			users: {
				'1': {
					userName: 'shybee',
				},
			}
		};
	},
	methods: {
		deleteUser(userid) {
			alert(userid);
		},
		modifyUser(userid) {
			alert(userid);
		},
	},
	components: {}
};
</script>

<style></style>
