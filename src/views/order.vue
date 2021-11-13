<template>
	<h1>Order Management</h1>
  <div v-if="isAdmin" class="row col-10">
    <div class="col-2 align-self-center"><button  type="button" class="btn btn-primary" @click="this.selectUserId=''">
      Clear Filter</button></div>

    <select class="form-select col" v-model="selectUserId" aria-label="Default select example">
      <option v-for="item in userList" :value="item.userId">{{ item.userName+" ("+item.userId+")" }}</option>
    </select>
    <!-- <button type="button" class="btn btn-primary col" style="margin-left: 0.625rem;">Select</button> -->
  </div>

	<table class="table table-striped table-hover caption-top align-middle text-center">
		<caption>List of Order</caption>
		<thead class="table-light text-capitalize">
			<tr>
				<th scope="col" v-for="(item, index) in dataTitle">{{ item }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in data">
<!--				<th>{{ index }}</th>-->
<!--				<td v-for="(item, index) in item">{{ item }}</td>-->
        <td>{{item.id}}</td>
        <td>{{item.facility_id}}</td>
        <td>{{item.userId}}</td>
        <td>{{getUnitName(item.unit)}}</td>
        <td>{{item.year}}</td>
        <td>{{item.month}}</td>
        <td>{{item.day}}</td>
        <td>{{item.hour}}</td>
        <td>{{item.used? "Yes": "Canceled"}}</td>
				<td v-if="item.used && (item.unit === 0 || item.unit === 1)"><button
                    type="button" class="btn btn-danger" @click="cancelOrder(item.id, item.userId)">Cancel</button>
        </td>
        <td v-if="!(item.used && (item.unit === 0 || item.unit === 1))">
          Cannot be cancelled
        </td>
			</tr>
		</tbody>
	</table>

</template>

<script>
import Cookies from "js-cookie";
import {cancel_reserve, get_all_user, get_all_user_reserve, get_user_reserve} from "../utils/api";
export default {
	data() {
		return {
			dataTitle: ['id', 'FacilityId','UserId','Unit','Year', 'Month', 'Day', "Hour", "Used","Cancel",],
      pageCount: 0,
      userList: [],
      isAdmin: Cookies.get("admin") === "true",
      selectUserId: "",
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
    getUnitName(i) {
      if (i === 0) {
        return "hour";
      } else if (i === 1) {
        return "day";
      }  else if (i === 2) {
        return "week";
      } else if (i === 3) {
        return "month";
      }else {
        return i;
      }

    },
		deleteUser(userid) {
			alert(userid);
		},
		modifyUser(userid) {
			alert(userid);
		},
    async cancelOrder(id, userId) {
      const res = await cancel_reserve({
        "userId": userId,
        "id": id,
      });
      if (res.status === 200 && res.data.status === "success") {
        console.log("cancel success");
        this.$router.go(0);
      }
    },

    async getAllOrder() {
      const res = await get_all_user_reserve();

      if (res.status === 200) {
        console.log(res.data.data)
        this.data = res.data.data
      }
    },
    async initData() {
      const res = await get_all_user();
      if (res.status === 200) {
        this.userList = res.data.data
      }
    },
    async getUserOrder() {
      const res = await get_user_reserve({
        "userId": this.selectUserId,
      })
      if (res.status === 200) {
        this.data = res.data.data;
      }
    },
    async getSelfOrder() {
      const res = await get_user_reserve({
        "userId": Cookies.get("userId")
      });
      if (res.status === 200) {
        this.data = res.data.data;
      }
    }
	},
	components: {},
  watch: {
    selectUserId: function (newId, oldId) {
      if (newId === "") {
        this.getAllOrder();
      } else {
        this.getUserOrder();
      }

    }
  },
  created() {
    this.initData();
    const admin = Cookies.get("admin");
    if (admin === "true") {
      console.log("i am admin");
      this.getAllOrder();
    } else {
      console.log("i am not admin")
      this.getSelfOrder();
    }

  }
};
</script>

<style></style>
