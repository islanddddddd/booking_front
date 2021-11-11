<template>
	<h1>Facility Management</h1>
	<div class="container-fluid text-center " style="padding: 0.9375rem;">
		<div class="row col-8">

			<button type="button" class="btn btn-primary col" style="margin-left: 0.625rem;"
              data-bs-toggle="modal" data-bs-target="#addOfficeModal">Add Office</button>
<!--      <button  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addOfficeModal">Add Office</button>-->
<!--      <button  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addFacilityModal">Add Plan</button>-->
      <button type="button" class="btn btn-primary col" style="margin-left: 0.625rem;"
              data-bs-toggle="modal" data-bs-target="#addFacilityModal">Add Facility</button>
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
				<td><button type="button" class="btn btn-danger" @click="deleteUser(index)">delete</button></td>
				<td><button type="button" class="btn btn-primary" v-on:click="modifyUser(index)">modify</button></td>
			</tr>
		</tbody>
	</table>


  <!-- 模态框 -->
  <div class="modal" id="addOfficeModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- 模态框头部 -->
        <div class="modal-header">
          <h4 class="modal-title">Add Office</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- 模态框内容 -->
        <div class="modal-body">
          <form>
            <div class="row col-10">
              <div class="col-2 align-self-center">Type</div>

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
                    v-model="addOfficeTable.unit"
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
                    v-model="addOfficeTable.unit"
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
                    v-model="addOfficeTable.unit"
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
                    v-model="addOfficeTable.unit"
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
                    v-model="addOfficeTable.category"
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
                    v-model="addOfficeTable.category"
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
                  v-model="addOfficeTable.price"
              />
              <label for="priceInput">Price</label>
            </div>
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="descInput"
                  placeholder="Description"
                  v-model="addOfficeTable.description"
              />
              <label for="descInput">Description</label>
            </div>


            <button
                class="w-100 btn btn-lg btn-primary"
                type="submit"
                @click="onSubmitAddOffice"
            >
              Submit
            </button>
            <!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> -->
          </form>
        </div>



      </div>
    </div>
  </div>


  <!-- 模态框 -->
  <div class="modal" id="addFacilityModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- 模态框头部 -->
        <div class="modal-header">
          <h4 class="modal-title">Add Facility</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- 模态框内容 -->
        <div class="modal-body">
          <form>
            <div class="row col-10">
              <div class="col-2 align-self-center">Office</div>
              <select class="form-select col" v-model="addFacilityTable.centerId" aria-label="Default select example">
                <option v-for="item in officeList" :value="item.centerId">{{ item.district }}</option>
              </select>
            </div>


            <div class="row col-10">
              <div class="col-2 align-self-center">Type</div>
              <select class="form-select col" v-model="addFacilityTable.typeId" aria-label="Default select example">
                <option v-for="item in facilityTypeList" :value="item.typeId">{{ item.facility }}</option>
              </select>
            </div>


            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  placeholder="Number"
                  id="numberInput"
                  v-model="addFacilityTable.number"
              />
              <label for="numberInput">Number</label>
            </div>
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  placeholder="Number"
                  id="faIdInput"
                  v-model="addFacilityTable.facility_id"
              />
              <label for="numberInput">Facility Id</label>
            </div>


<!--            <div class="form-floating">-->
<!--              <input-->
<!--                  type="text"-->
<!--                  class="form-control"-->
<!--                  id="priceInput"-->
<!--                  placeholder="Price"-->
<!--                  v-model="addPlanTable.price"-->
<!--              />-->
<!--              <label for="priceInput">Price</label>-->
<!--            </div>-->
<!--            <div class="form-floating">-->
<!--              <input-->
<!--                  type="text"-->
<!--                  class="form-control"-->
<!--                  id="descInput"-->
<!--                  placeholder="Description"-->
<!--                  v-model="addPlanTable.description"-->
<!--              />-->
<!--              <label for="descInput">Description</label>-->
<!--            </div>-->

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
                @click="onSubmitAddFacility"
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
import {addFacility, addOffice, getFacilityType, getOffice} from "../../utils/api";

export default {
	data() {
		return {
      addFacilityTable: {},
      facilityTypeList: [],
      addOfficeTable: {},
			officeList: ['office1', 'office2', 'office3'],
			dataTitle: ['FacilityId', 'FacilityType', 'FacilityPrice', 'delete', 'modify'],
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
    async onSubmitAddFacility() {
      const res = await addFacility(this.addFacilityTable);
      if (res.status === 200) {
        console.log("add Facility success");
      }
    },
    async onSubmitAddOffice() {
      const res = await addOffice(this.addFacilityTable);
      if (res.status === 200) {
        console.log("add Office success");
      }
    },
		deleteUser(userid) {
			alert(userid);
		},
		modifyUser(userid) {
			alert(userid);
		},
    async initData() {
      const res = await getOffice();
      if (res.status === 200) {
        this.officeList = res.data.data
      }
      const res2 = await getFacilityType();
      if (res2.status === 200) {
        this.facilityTypeList = res2.data.data
      }
    },
	},
	components: {},
  created() {
    this.initData();
  }
};
</script>

<style></style>
