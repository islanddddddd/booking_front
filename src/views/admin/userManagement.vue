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
<!--				<th>{{ index }}</th>-->
        <td>{{item.userId}}</td>
        <td>{{item.userName}}</td>
        <td>{{item.firstName}}</td>
        <td>{{item.lastName}}</td>
        <td>{{item.gender===0?"Female":"Male"}}</td>
        <td>{{item.tel}}</td>
        <td>{{item.address}}</td>
        <td>{{item.email}}</td>
<!--				<td v-for="(item, index) in item">{{ item }}</td>-->
<!--				<td><button type="button" class="btn btn-danger" @click="deleteUser(index)">delete</button></td>-->
<!--				<td><button type="button" class="btn btn-primary" v-on:click="modifyUser(index)">modify</button></td>-->
        <td>
          <button @click="modifyUser(index)" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
            modify</button>
        </td>
			</tr>
		</tbody>
	</table>


  <!-- 模态框 -->
  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- 模态框头部 -->
        <div class="modal-header">
          <h4 class="modal-title">Modify User</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- 模态框内容 -->
        <div class="modal-body">
          <form>

            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  v-model="modifyTable.userName"
              />
              <label for="floatingInput">UserName</label>
            </div>
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  placeholder="Password"
                  v-model="modifyTable.firstName"
              />
              <label for="floatingPassword">FirstName</label>
            </div>
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  v-model="modifyTable.lastName"
              />
              <label for="floatingPassword">LastName</label>
            </div>
            <!-- 性别 -->
            <div>
              <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="1"
                    v-model="modifyTable.gender"
                />
                <label class="form-check-label" for="inlineRadio1">Male</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="0"
                    v-model="modifyTable.gender"
                />
                <label class="form-check-label" for="inlineRadio2">Female</label>
              </div>
            </div>
            <!-- tel -->
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  placeholder="Tel"
                  v-model="modifyTable.tel"
              />
              <label for="floatingPassword">Tel</label>
            </div>
            <!-- address -->
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  placeholder="Address"
                  v-model="modifyTable.address"
              />
              <label for="floatingPassword">Address</label>
            </div>
<!--            <div class="form-floating">-->
<!--              <input-->
<!--                  type="email"-->
<!--                  class="form-control"-->
<!--                  placeholder="Password"-->
<!--                  v-model="modifyTable.email"-->
<!--              />-->
<!--              <label for="floatingPassword">Email</label>-->
<!--            </div>-->


            <button
                class="w-100 btn btn-lg btn-primary"
                type="submit"
                @click="onSubmit"
            >
              Submit
            </button>
            <!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> -->
          </form>
        </div>



      </div>
    </div>
  </div>

</template>

<script>
import {get_all_user, updateUser} from "../../utils/api";

export default {
	data() {
		return {
			dataTitle:['userId','userName','firstName','lastName','gender','tel','address','email','modify'],
      modifyTable: {},
			data: {
				'1': {
					userName: 'shybee',
					firstName: 'shy',
					lastName: 'bee',
					gender: '1',
					tel: '13623711690',
					address: '随便填写的一个地址',
					email: '13623711690@qq.com'
				},
				'2': {
					userName: 'shybee',
					firstName: 'shy',
					lastName: 'bee',
					gender: '1',
					tel: '13623711690',
					address: '随便填写的一个地址',
					email: '13623711690@qq.com'
				},
				'3': {
					userName: 'shybee',
					firstName: 'shy',
					lastName: 'bee',
					gender: '1',
					tel: '13623711690',
					address: '随便填写的一个地址',
					email: '13623711690@qq.com'
				}
			}
		};
	},
	methods: {
    async onSubmit() {
      console.log(this.modifyTable.gender);
      const res = await updateUser(this.modifyTable);
      if (res.status === 200) {
        console.log("update success")
      }
    },
		deleteUser(userid) {
			alert(userid);
		},
		modifyUser(userid) {
			// alert(userid);
      this.modifyTable = this.data[userid]
		},
    async initData() {
      const res = await get_all_user();
      if (res.status === 200) {
        this.data = res.data.data
      }
    }
	},
	components: {},
  created() {
    this.initData();

  }
};
</script>

<style></style>
