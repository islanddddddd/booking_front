<template>
	<h1>Plan Management</h1>
	<div class="container-fluid text-center " style="padding: 0.9375rem;">
		<div class="row col-6">

<!--			<button type="button" class="btn btn-primary col" style="margin-left: 0.625rem;">Add Plan</button>-->
      <button  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Add Plan</button>
		</div>
	</div>
	<table class="table table-striped table-hover caption-top align-middle text-center">
		<caption>List of lan</caption>
		<thead class="table-light text-capitalize">
			<tr>
				<th scope="col" v-for="(item,index) in dataTitle">{{item}}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in data">
<!--				<th>{{ index }}</th>-->
        <td>{{item.planId}}</td>
        <td>{{item.price}}</td>
        <td>{{ getTypeById(item.typeId)}}</td>
        <td>{{ item.category === 0? "walk-in": "reservation"}}</td>
        <td>{{ item.description }}</td>
        <td>{{ getUnitName(item.unit) }}</td>
<!--				<td v-for="(item, index) in item">{{ item }}</td>-->
				<td><button type="button" class="btn btn-danger" @click="deleteUser(index)">delete</button></td>
<!--				<td><button type="button" class="btn btn-primary" v-on:click="modifyUser(index)">modify</button></td>-->
			</tr>
		</tbody>
	</table>

  <!-- 模态框 -->
  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- 模态框头部 -->
        <div class="modal-header">
          <h4 class="modal-title">Add Plan</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- 模态框内容 -->
        <div class="modal-body">
          <form>
            <div class="row col-10">
              <div class="col-2 align-self-center">Type</div>
              <select class="form-select col" v-model="addPlanTable.typeId" aria-label="Default select example">
                <option v-for="item in facilityTypeList" :value="item.typeId">{{ item.facility }}</option>
              </select>
              <!-- <button type="button" class="btn btn-primary col" style="margin-left: 0.625rem;">Select</button> -->
            </div>



            <!-- unit -->
            <div>
              <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="0"
                    v-model="addPlanTable.unit"
                />
                <label class="form-check-label" for="inlineRadio1">Hour</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="1"
                    v-model="addPlanTable.unit"
                />
                <label class="form-check-label" for="inlineRadio2">Day</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="2"
                    v-model="addPlanTable.unit"
                />
                <label class="form-check-label" for="inlineRadio3">Week</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio4"
                    value="3"
                    v-model="addPlanTable.unit"
                />
                <label class="form-check-label" for="inlineRadio4">Month</label>
              </div>
            </div>


            <div>
              <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="inlineRadio6"
                    value="0"
                    v-model="addPlanTable.category"
                />
                <label class="form-check-label" for="inlineRadio6">Walk-in</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="inlineRadio7"
                    value="1"
                    v-model="addPlanTable.category"
                />
                <label class="form-check-label" for="inlineRadio7">Reservation</label>
              </div>

            </div>

            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="priceInput"
                  placeholder="Price"
                  v-model="addPlanTable.price"
              />
              <label for="priceInput">Price</label>
            </div>
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="descInput"
                  placeholder="Description"
                  v-model="addPlanTable.description"
              />
              <label for="descInput">Description</label>
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
import {addPlan, getFacilityType, getOffice, getPlan} from "../../utils/api";

export default {
	data() {
		return {
      officeList: [],
      facilityTypeList: [],
      addPlanTable: {},
			dataTitle:['planId','Price','typeId', 'Category','description', 'unit', 'delete'],
			data: {
				'1': {
					planPrice: '1$/day',
					planInfo: 'One day use right',
				},
				'2': {
					planPrice: '10$/week',
					planInfo: 'One week use right',
				},
				'3': {
					planPrice: '10$/mo',
					planInfo: 'One month use right',
				},
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
    getTypeById(typeId) {
      for (const fe of this.facilityTypeList) {
        if (fe.typeId === typeId) {
          return fe.facility;
        }
      }
      return "NULL";
    },
    async onSubmit() {
      console.log(this.addPlanTable.typeId);
      const res = await addPlan(this.addPlanTable);
      if (res.status === 200) {
        console.log("add plan success");
      }

    },
		deleteUser(userid) {
			alert(userid);
		},
		modifyUser(userid) {
			alert(userid);
		},
    async initData() {
      const res = await getFacilityType();
      if (res.status === 200) {
        this.facilityTypeList = res.data.data
      }
      const res2 = await getPlan()

      if (res2.status === 200) {
        this.plan = [];
        const data = res2.data.data;
        this.data = data;
        for (const d of data) {
          console.log(d);

        }

        console.log(data);
      }

    }
	},
  created() {
    this.initData();
  },
  components: {}
};
</script>

<style></style>
