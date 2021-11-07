<template>
	<h1>User Management</h1>
	<table class="table table-striped table-hover caption-top align-middle text-center">
		<caption>List of Users</caption>
		<thead class="table-light text-capitalize">
			<tr>
				<th scope="col" v-for="(item,index) in dataTitle">{{item}}</th>
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
			dataTitle:['userId','userName','firstName','lastName','gender','tel','address','email','delete','modify'],
			data: {
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
		}
	},
	components: {}
};
</script>

<style></style>
