<template>
	<h1>Facility Management</h1>
	<div class="container-fluid text-center " style="padding: 0.9375rem;">
		<div class="row col-8">

			<button type="button" class="btn btn-primary col" style="margin-left: 0.625rem;"
              data-bs-toggle="modal" data-bs-target="#addOfficeModal">Add Office</button>

      <button type="button" class="btn btn-success col" style="margin-left: 0.625rem;"
              data-bs-toggle="modal" data-bs-target="#addFacilityModal">Add Facility</button>
		</div>

	</div>
<!--  <button  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addOfficeModal">Add Of222fice</button>-->
<!--  <button  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addFacilityModal">Add Pl22an</button>-->
  <div>
    Show <button v-if="!isShowOffice" type="button" class="btn btn-primary" @click="showOfficeList" style="margin-left: 0.625rem;">Office List</button>
    <button v-if="isShowOffice" type="button" class="btn btn-success" @click="showFacilityList" style="margin-left: 0.625rem;">Facility List</button>
  </div>
	<table class="table table-striped table-hover caption-top align-middle text-center">
		<caption>{{tableCaption}}</caption>
		<thead class="table-light text-capitalize">
			<tr>
				<th scope="col" v-for="(item) in tableTitle">{{ item }}</th>
			</tr>
		</thead>
		<tbody v-if="!isShowOffice">
			<tr v-for="(item, index) in tableData">
<!--				<th>{{ index }}</th>-->
        <td>{{item.facility_id}}</td>
        <td>{{item.number}}</td>
        <td>{{item.centerId}}</td>
        <td>{{getTypeById(item.typeId)}}</td>
<!--				<td v-for="(item, index) in item">{{ item }}</td>-->
<!--				<td><button type="button" class="btn btn-danger" @click="deleteFacility(item.facility_id)">delete</button></td>-->
<!--				<td><button type="button" class="btn btn-primary" v-on:click="modifyFacility(item.facility_id)">modify</button></td>-->
			</tr>
		</tbody>
    <tbody v-if="isShowOffice">
    <tr v-for="(item, index) in tableData">
      <!--				<th>{{ index }}</th>-->
      <td>{{item.centerId}}</td>
      <td>{{item.district}}</td>
      <td>{{item.flat}}</td>
      <td>{{item.floor}}</td>
      <td>{{item.building}}</td>
      <td>{{item.street}}</td>
      <td>{{item.tel}}</td>
      <td>{{item.admin}}</td>
      <!--				<td v-for="(item, index) in item">{{ item }}</td>-->
<!--      <td><button type="button" class="btn btn-danger" @click="deleteOffice(item.id)">delete</button></td>-->
<!--      <td><button type="button" class="btn btn-primary" v-on:click="modifyOffice(item.id)">modify</button></td>-->
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





            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="centerIdInput"
                  placeholder="centerId"
                  v-model="addOfficeTable.centerId"
              />
              <label for="centerIdInput">centerId</label>
            </div>
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="districtInput"
                  placeholder="district"
                  v-model="addOfficeTable.district"
              />
              <label for="districtInput">District</label>
            </div>

            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="flatInput"
                  placeholder="Flat"
                  v-model="addOfficeTable.flat"
              />
              <label for="flatInput">Flat</label>
            </div>

            <div class="form-floating">
              <input
                  type="number"
                  class="form-control"
                  id="floorInput"
                  placeholder="floor"
                  v-model="addOfficeTable.floor"
              />
              <label for="floorInput">Floor</label>
            </div>
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="buildingInput"
                  placeholder="Building"
                  v-model="addOfficeTable.building"
              />
              <label for="buildingInput">Building</label>
            </div>


            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="streetInput"
                  placeholder="Street"
                  v-model="addOfficeTable.street"
              />
              <label for="streetInput">Street</label>
            </div>

            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="telInput"
                  placeholder="Tel"
                  v-model="addOfficeTable.tel"
              />
              <label for="telInput">Tel</label>
            </div>

            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="adminInput"
                  placeholder="Admin"
                  v-model="addOfficeTable.admin"
              />
              <label for="adminInput">Admin</label>
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
import {addFacility, addOffice, getFacility, getFacilityType, getOffice} from "../../utils/api";

export default {
	data() {
		return {
      addFacilityTable: {},
      facilityTypeList: [],
      isShowOffice: false,
      officeTitle: ["CenterId", "District", "Flat", "Floor", "Building", "Street", "Tel", "Admin"],
      facilityTitle: ["FacilityId", "Number", "CenterId", "Type",],
      tableTitle:[],
      tableData: {},
      tableCaption: "List of Facility",
      addOfficeTable: {},
			officeList: ['office1', 'office2', 'office3'],
			dataTitle: ['FacilityId', 'FacilityType', 'FacilityPrice', ],
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

    getTypeById(typeId) {
      console.log(this.facilityTypeList);
      for (const fe of this.facilityTypeList) {
        console.log(typeId, fe.typeId);
        if (fe.typeId === typeId) {
          return fe.facility;
        }
      }
      return "NULL";
    },
    async showOfficeList() {
      const res = await getOffice();
      if (res.status === 200) {
        this.isShowOffice = true;
        this.tableTitle = this.officeTitle;
        this.tableData = res.data.data;
        this.tableCaption = "List of Office";
      }
    },
    async showFacilityList() {
      const res = await getFacility({});
      if (res.status === 200) {
        this.isShowOffice = false;
        this.tableTitle = this.facilityTitle;
        this.tableData = res.data.data;
        this.tableCaption = "List of Facility";
      }
    },
    async onSubmitAddFacility() {
      const res = await addFacility(this.addFacilityTable);
      if (res.status === 200) {
        console.log("add Facility success");
      }
    },
    async onSubmitAddOffice() {
      const res = await addOffice(this.addOfficeTable);
      if (res.status === 200) {
        console.log("add Office success");
      }
    },
		deleteOffice(id) {
			alert(id);
		},
		modifyOffice(id) {
			alert(id);
		},
    deleteFacility(id) {

    },
    modifyFacility(id) {

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
      await this.showFacilityList();
    },
	},
	components: {},
  created() {
    this.initData();
  }
};
</script>

<style></style>
