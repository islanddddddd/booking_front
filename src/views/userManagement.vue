<template>
	<h1>user management</h1>
	<table class="table table-striped table-hover caption-top align-middle">
		<caption>List of users</caption>
		<thead class="table-light">
			<tr>
				<th scope="col">userId</th>
				<th scope="col">userName</th>
				<th scope="col">firstName</th>
				<th scope="col">lastName</th>
				<th scope="col">gender</th>
				<th scope="col">tel</th>
				<th scope="col">address</th>
				<th scope="col">email</th>
				<th scope="col">delete</th>
				<th scope="col">modify</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in users">
				<th>{{ index }}</th>
				<td>{{ item.userName }}</td>
				<td>{{ item.firstName }}</td>
				<td>{{ item.lastName }}</td>
				<td>{{ item.gender }}</td>
				<td>{{ item.tel }}</td>
				<td>{{ item.address }}</td>
				<td>{{ item.email }}</td>
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
					firstName: 'shy',
					lastName: 'bee',
					gender: 'male',
					tel: '13623711690',
					address: '随便填写的一个地址',
					email: '13623711690@qq.com'
				},
				'2': {
					userName: 'shybee',
					firstName: 'shy',
					lastName: 'bee',
					gender: 'male',
					tel: '13623711690',
					address: '随便填写的一个地址',
					email: '13623711690@qq.com'
				},
				'3': {
					userName: 'shybee',
					firstName: 'shy',
					lastName: 'bee',
					gender: 'male',
					tel: '13623711690',
					address: '随便填写的一个地址',
					email: '13623711690@qq.com'
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
		},
	},
	components: {}
};
</script>

<style></style>
