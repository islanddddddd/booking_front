<template>
  <h1>Reserve</h1>
  <!-- 模态框 -->
  <!--  <div class="modal fade" id="calendar" v-if="this.msg.facility!=undefined">-->
  <div class="modal fade " id="calendar">
    <!--    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">-->
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable  modal-fullscreen">
      <div class="modal-content">
        <!-- 模态框头部 -->
        <div class="modal-header">
          <h4 class="modal-title">Select the time you want to make an appointment</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- 模态框内容 -->
        <div class="modal-body">
          <div>
            <rcalendar :msg="msg" @father-click="fatherClick" @childFn="getTime"
                       ref="rcalendar"></rcalendar>
          </div>
        </div>

        <!-- 模态框底部 -->
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="this.$refs.rcalendar.return()">Confirm
          </button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">close</button>

        </div>
        <button style="display:none" id="jumptosecond" class="btn btn-primary" data-bs-target="#times"
                data-bs-toggle="modal">Open second modal
        </button>
      </div>
    </div>
  </div>
  <!-- 二级模态框 -->
  <div class="modal fade" id="times" aria-hidden="true" aria-labelledby="times" tabindex="-1"
       v-if="facilityData.length!=0">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalToggleLabel2">Confirm</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="container-fluid" style="padding: 0">
            <h4>{{ times.date }}</h4>
            <div class="row g-2">
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control" v-model="facilityData[selectedFacilityIndex].centerId"
                         readonly="readonly"/>
                  <label>Center ID</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control" v-model="facilityData[selectedFacilityIndex].facility_id"
                         readonly="readonly"/>
                  <label>Facility Id</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control" v-model="facilityData[selectedFacilityIndex].typeId"
                         readonly="readonly"/>
                  <label>TypeID</label>
                </div>
              </div>
            </div>

            <div class="row g-2" v-if="times.unit==0">
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control" v-model="times.hours" readonly="readonly"/>
                  <label>Hours List</label>
                </div>
              </div>
            </div>
            <div class="row g-2">
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control" v-model="times.days" readonly="readonly"/>
                  <label>Days List</label>
                </div>
              </div>
            </div>

            <div class="row g-2">
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control" v-model="aUserId" v-if="isAdmin"/>
                  <input type="text" class="form-control" v-model="aUserId" readonly="readonly" v-else/>
                  <label>User Id</label>
                </div>
              </div>
              <div class="col" v-if="isAdmin">
                <div class="form-floating">
                  <input type="text" class="form-control" v-model="operater_id"/>
                  <label>Operater Id</label>
                </div>
              </div>

            </div>
            <!--            <div class="row g-2">-->
            <!--              <div class="col">-->
            <!--                <div class="form-floating">-->
            <!--                  <input type="text" class="form-control" v-model="price" readonly="readonly"/>-->
            <!--                  <label>Price</label>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->


          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="confirmBtn">Confirm</button>
          <button class="btn btn-primary" data-bs-target="#calendar" data-bs-toggle="modal">Back</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 二级模态框 -->

  <div class="container-fluid text-center " style="padding: 0.9375rem;">
    <div class="row col-6">
      <div class="col-2 align-self-center">Office</div>
      <select class="form-select col" v-model="selectedOfficeIndex" aria-label="Default select example">
        <option v-for="(item,index) in offliceList" :value="index">{{ item.district }}</option>
      </select>
    </div>
  </div>

  <div class="row text-capitalize">
    <div class="col-1 mb-1" v-for="(item, index) in facilityData">
      <!--      <div> typeId: {{ item.typeId }}</div>-->
      <!--      <div>{{ tableClassByTypeId[item.typeId - 1] }}</div>-->

      <div class="btn btn-primary" style="width: 100%" :class="tableClassByTypeId[item.typeId-1]" data-bs-toggle="modal"
           data-bs-target="#calendar" @click="select(index)">
        {{ item.id }}
      </div>

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
    <tr v-for="(item, index) in facilityData" :class="tableClassByTypeId[item.typeId-1]">
      <th> {{ item.id }}</th>
      <td> {{ item.facility_id }}</td>
      <td> {{ item.centerId }}</td>
      <td> {{ item.number }}</td>
      <td> {{ item.typeId }}</td>
      <td>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#calendar"
                @click="select(index)">select
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import Cookies from 'js-cookie'

import Sidebar from '../components/sidebar.vue';
import rcalendar from '../components/rcalendar.vue';
import {addReserve, getFacility, getOffice, get_hour_ava, get_day_ava} from "../utils/api";


const dailyHours = {from: 1 * 60, to: 5 * 60, class: 'business-hours'};
export default {
  components: {
    Sidebar,
    rcalendar
  },
  emits: ['childFn'],
  data() {
    return {
      tableClassByTypeId: ['bg-secondary', 'bg-primary', 'bg-info', 'bg-success', 'bg-warning', 'bg-danger',],
      activeClass: 'active',
      errorClass: 'text-danger',
      selectedOfficeIndex: 0,
      isAdmin: Cookies.get("admin") === "true",   /*是不是管理员*/
      aUserId: '',
      offliceList: ['office1', 'office2', 'office3'], //办公室列表
      // dataTitle: ['centerId', 'facility_id', 'id', 'number', 'typeID'], //控制表格的表头
      dataTitle: ['id', 'facility_id', 'centerId', 'number', 'typeID'], //控制表格的表头
      selectedFacilityIndex: 0,
      facilityData: [],
      msg: {
        startTime: 0,
        endTime: 24,
      },
      times: {},//日历组件传回的数据
      price: 0,//订单价格
      operater_id: ''
    };
  },
  methods: {
    select(index) {

      this.selectedFacilityIndex = index;
      this.msg['facility'] = this.facilityData[this.selectedFacilityIndex]
      this.$refs.rcalendar.changeUnit(0, new Date())
    },
    async getSpecialHours_hours(facility_id) {
      console.log(facility_id)

      let data = facility_id
      const res = await get_hour_ava(data);
      console.log(res)

    },
    async getSpecialHours_days(facility_id) {
      console.log(facility_id)
      // let data = facility_id
      let data = {facility_id: facility_id}
      const res = await get_day_ava(data);
      console.log(res)

    },

    getTime(times) {
      console.log(times);
      this.times = times;
    },

    getDataAddByAdmin(fa) {
      // const fa = this.data[this.selectedFacilityIndex];
      return {
        facility_id: fa.facility_id,
        typeId: fa.typeId,
        unit: this.times.unit,
        userId: this.aUserId,
        year: this.times.year,
        month: this.times.month,
        days: this.times.days,
        hours: this.times.hours,
        operater_id: this.operater_id,
      };
    },

    getDataAddByUser(fa) {
      // const fa = this.data[this.selectedFacilityIndex];
      return {
        facility_id: fa.facility_id,
        typeId: fa.typeId,
        unit: this.times.unit,
        userId: this.aUserId,
        year: this.times.year,
        month: this.times.month,
        days: this.times.days,
        hours: this.times.hours,
        operater_id: this.aUserId,
      };
    },
    async confirmBtn() {
      if (this.isAdmin) {
        if (this.aUserId == '' || this.operater_id == '') {
          alert('不能为空')
          return
        }
      } else {
        this.operater_id = this.aUserId
        if (this.aUserId == '' || this.operater_id == '') {
          alert('不能为空')
          return

        }
      }
      const fa = this.facilityData[this.selectedFacilityIndex];
      let data;
      if (this.isAdmin) {
        data = this.getDataAddByAdmin(fa);
      } else {
        data = this.getDataAddByUser(fa);
      }
      const res = await addReserve(data);
      if (res.data.status == 'failed, no access') alert('add faill')
      else {
        let str = ''
        str += 'add success!您预约的时间段是：'
        if (res.data.hours != undefined) {
          str = str + 'HoursList:' + res.data.hours
        }
        if (res.data.days != undefined) {
          str = str + 'daysList:' + res.data.hours

        }
        alert(str)
      }
      location.reload()
      //  这里可以跳出一个窗口用以显示已预约的订单信息


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
      } else alert('getFacility fail')

      //  设置userid，operater_id
      if (!this.isAdmin) this.aUserId = Cookies.get("userId")
      else this.operater_id = Cookies.get("userId")


    },
    async getFacility() {
      const center = this.offliceList[this.selectedOfficeIndex]
      const centerID = center.centerId
      // const res = await getFacility({"center_ID": this.offliceList[this.selectedOfficeIndex].center_ID});
      const res = await getFacility({"center_ID": centerID});
      // const res = await getFacility({"center_ID": 'sad'});
      if (res.status == 200) {
        console.log(res.data)
        this.facilityData = res.data.data;

        function sortId(a, b) {
          return a.typeId - b.typeId
        }

        this.facilityData = this.facilityData.sort(sortId)
      } else alert('getFacility fail')
    }
  },

  mounted() {
    this.initData();
  },
  watch: {
    selectedOfficeIndex: function (newV, oldV) {
      console.log("changed!!")
      this.getFacility();
    }
  }
};
</script>

<style>

</style>
