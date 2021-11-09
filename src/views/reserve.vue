<template>
	<h1>Reserve</h1>
	<!-- <rcalendar></rcalendar> -->
	<!-- <rc></rc> -->
	<!-- 	<div>
		<router-link :to="{ name: 'officeMap' }">routerlink</router-link>
		<router-view></router-view>
	</div> -->
	<!-- 模态框 -->
	<div class="modal" id="myModal">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
			<div class="modal-content">
				<!-- 模态框头部 -->
				<div class="modal-header">
					<h4 class="modal-title">模态框标题</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>

				<!-- 模态框内容 -->
				<div class="modal-body">
					<div class="row">
						<rcalendar :msg="msg" @childFn="getTime"></rcalendar>
						<div class="col">
							<h4>{{ times.date }}</h4>
							<div class="form-floating">
								<input type="text" class="form-control" v-model="times.startTime" readonly="readonly" />
								<label for="floatingInput">开始时间</label>
							</div>
							<div class="form-floating">
								<input type="text" class="form-control" v-model="times.endTime" readonly="readonly" />
								<label for="floatingInput">结束时间</label>
							</div>
						</div>
					</div>
				</div>

				<!-- 模态框底部 -->
				<div class="modal-footer"><button type="button" class="btn btn-danger" data-bs-dismiss="modal">关闭</button></div>
			</div>
		</div>
	</div>
	<div class="container-fluid text-center " style="padding: 0.9375rem;">
		<div class="row col-6">
			<div class="col-2 align-self-center">Office</div>
			<select class="form-select col" aria-label="Default select example">
				<option v-for="(item, index) in offliceList" :value="item">{{ item }}</option>
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
		<tbody>
			<tr v-for="(item, index) in data">
				<th>{{ index }}</th>
				<td v-for="(item, index) in item">{{ item }}</td>
				<td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" @click="select(index)">select</button></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import Sidebar from '../components/sidebar.vue';
import rcalendar from '../components/rcalendar.vue';
const dailyHours = { from: 1 * 60, to: 5 * 60, class: 'business-hours' };
export default {
	components: {
		Sidebar,
		rcalendar
	},
	emits: ['childFn'],
	data() {
		return {
			offliceList: ['office1', 'office2', 'office3'],
			dataTitle: ['FacilityId', 'FacilityType', 'FacilityPrice', 'select'],
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
				unit: 2
			},
			times: { startTime: '1', endTime: '1' }
		};
	},
	methods: {
		select(index) {
			this.msg = this.msg;
		},
		deleteUser(userid) {
			alert(userid);
		},
		modifyUser(userid) {
			alert(userid);
		},
		getTime(times) {
			console.log(times.specialHours);
			this.times = times;
		}
	}
};
</script>

<style></style>
