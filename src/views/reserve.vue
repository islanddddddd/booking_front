<template>
	<h1>Reserve</h1>
	<!-- <rcalendar></rcalendar> -->
	<!-- <rc></rc> -->
	<!-- 	<div>
		<router-link :to="{ name: 'officeMap' }">routerlink</router-link>
		<router-view></router-view>
	</div> -->

	<!-- 模态框 -->
	<div class="modal fade" id="calendar">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
			<div class="modal-content">
				<!-- 模态框头部 -->
				<div class="modal-header">
					<h4 class="modal-title">模态框标题</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>

				<!-- 模态框内容 -->
				<div class="modal-body">
					<div><rcalendar :msg="msg" @father-click="fatherClick" @childFn="getTime"></rcalendar></div>
				</div>

				<!-- 模态框底部 -->
				<div class="modal-footer"><button type="button" class="btn btn-danger" data-bs-dismiss="modal">关闭</button></div>
				<button style="display:none" id="jumptosecond" class="btn btn-primary" data-bs-target="#times" data-bs-toggle="modal">Open second modal</button>
			</div>
		</div>
	</div>
	<!-- 二级模态框 -->
	<div class="modal fade" id="times" aria-hidden="true" aria-labelledby="times" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalToggleLabel2">Modal 2</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div>
						<h4>{{ times.date }}</h4>
						<div class="form-floating">
							<input type="text" class="form-control" v-model="times.startTime" readonly="readonly" />
							<label for="floatingInput">开始时间</label>
						</div>
						<div class="form-floating">
							<input type="text" class="form-control" v-model="times.endTime" readonly="readonly" />
							<label for="floatingInput">结束时间</label>
						</div>
						<!-- <button class="btn btn-primary" data-bs-target="#times" data-bs-toggle="modal">Open second modal</button> -->
					</div>
				</div>
				<div class="modal-footer"><button class="btn btn-primary" data-bs-target="#calendar" data-bs-toggle="modal">Back</button></div>
			</div>
		</div>
	</div>
	<!-- 二级模态框 -->

	<div class="container-fluid text-center " style="padding: 0.9375rem;">
		<div class="row col-6">
			<div class="col-2 align-self-center">Office</div>
			<select class="form-select col" v-model="selectedOffice" aria-label="Default select example">
				<option v-for="item in offliceList" :value="item.centerId">{{ item.district}}</option>
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
<!--		<tbody>-->
<!--			<tr v-for="(item, index) in data">-->
<!--				<th>{{ index }}</th>-->
<!--				<td v-for="(item, index) in item">{{ item }}</td>-->
<!--				<td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#calendar" @click="select(index)">select</button></td>-->
<!--			</tr>-->
<!--		</tbody>-->
    <tbody>
			<tr v-for="(item, index) in facilityData">
				<th>{{ index }}</th>
<!--				<td v-for="(item, index) in item">{{ item }}</td>-->
        <td> {{ item.facility_id }}</td>
        <td> {{ item.number }}</td>
        <td> {{ item.centerId }}</td>
        <td> {{ item.typeId }}</td>
				<td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#calendar" @click="select(index)">select</button></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import Sidebar from '../components/sidebar.vue';
import rcalendar from '../components/rcalendar.vue';
import {getFacility, getOffice} from "../utils/api";
const dailyHours = { from: 1 * 60, to: 5 * 60, class: 'business-hours' };
export default {
	components: {
		Sidebar,
		rcalendar
	},
	emits: ['childFn'],
	data() {
		return {
      selectedOffice: '',
			offliceList: ['office1', 'office2', 'office3'], //办公室列表
			dataTitle: ['FacilityId', 'Number', 'CenterId', 'TypeId'], //控制表格的表头
      facilityData: [],
			data: {
				//座位数数据
				'1': {
					FacilityType: 'FacilityType_1',
					FacilityPrice: '10$/mo',
					startTime: 3,
					endTime: 15,
					specialHours: {
						1: dailyHours,
						2: dailyHours,
						3: [{ from: 9 * 60, to: 12 * 60, class: 'business-hours' }, { from: 14 * 60, to: 18 * 60, class: 'business-hours' }],
						4: dailyHours,
						5: dailyHours
					},
					unit: 0
				},
				'2': {
					FacilityType: 'FacilityType_2',
					FacilityPrice: '20$/mo',
					startTime: 3,
					endTime: 15,
					specialHours: {
						1: dailyHours,
						2: dailyHours,
						3: [{ from: 9 * 60, to: 12 * 60, class: 'business-hours' }, { from: 14 * 60, to: 18 * 60, class: 'business-hours' }],
						4: dailyHours,
						5: dailyHours
					},
					unit: 1
				},
				'3': {
					FacilityType: 'FacilityType_3',
					FacilityPrice: '30$/mo',
					startTime: 3,
					endTime: 15,
					specialHours: {
						1: dailyHours,
						2: dailyHours,
						3: [{ from: 9 * 60, to: 12 * 60, class: 'business-hours' }, { from: 14 * 60, to: 18 * 60, class: 'business-hours' }],
						4: dailyHours,
						5: dailyHours
					},
					unit: 2
				}
			},
			msg: {
				startTime: 3,
				endTime: 15,
				specialHours: {
					1: dailyHours,
					2: dailyHours,
					3: [{ from: 9 * 60, to: 12 * 60, class: 'business-hours' }, { from: 14 * 60, to: 18 * 60, class: 'business-hours' }],
					4: dailyHours,
					5: dailyHours
				},
				unit: 2,
				jump: 0
			},
			times: { startTime: '1', endTime: '1', jump: '0' } //日历组件传回的数据
		};
	},
	methods: {
		select(index) {
			let dataIndexms = this.data[index];
			this.msg = this.msg;
			this.msg = dataIndexms;
			console.log(dataIndexms);
		},
		deleteUser(userid) {
			alert(userid);
		},
		modifyUser(userid) {
			alert(userid);
		},
		getTime(times) {
			console.log(times);
			this.times = times;
		},
		fatherClick() {
			let jumptosecond = document.getElementById('jumptosecond');
			jumptosecond.click();
		},
    async initData() {
      const res = await getOffice();
      if (res.status === 200) {
        const data = res.data.data
        this.offliceList = [];
        console.log(data);
        this.offliceList = data;
      }
    },
    async getFacility() {
      const res = await getFacility({"center_ID": this.selectedOffice});
      if (res.status === 200) {
        console.log(res.data)
        this.facilityData = res.data.data;
      }
    }
	},

  created() {
    this.initData();
  },
  watch: {
    selectedOffice: function (newV, oldV) {
      console.log("changed!!")
      this.getFacility();
      }
    }
};
</script>

<style></style>
