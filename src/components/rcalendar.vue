<template>
  <dl class="row text-capitalize">
    <div class="row col-6" v-for="(item, index) in msg.facility">
      <dt class="col-sm-3">{{ index }}</dt>
      <dd class="col-sm-3">{{ item }}</dd>
    </div>
  </dl>

  <!--  <button class="btn btn-primary m-1" @click="changeUnit(0)">hour</button>-->
  <!--  <button class="btn btn-primary m-1" @click="changeUnit(1)">day</button>-->
  <!--  <button class="btn btn-primary m-1" @click="changeUnit(2)">week</button>-->
  <vue-cal
      v-if="unit == 0"
      style="height: 25rem"
      :time-from="msg.startTime * 60"
      :time-to="msg.endTime * 60"
      active-view="day"
      :disable-views="['years','week']"

      :special-hours="specialHours"
      :dblclickToNavigate="false"
      today-button
      :events="events"
      @cell-click="getHours('cell-click ', $event)"
      @view-change="viewChange('view-change', $event)"
  />
  <div v-else-if="unit == 1"
  >
    日
    <vue-cal
        style="height: 25rem"
        :time-from="msg.startTime * 60"
        :time-to="msg.endTime * 60"
        active-view="month"
        :disable-views="['years','week']"

        :dblclickToNavigate="false"
        :disable-days="disable_days"
        @cell-click="getDay('cell-click ', $event)"
        @view-change="viewChange('view-change', $event)"

    />
  </div>

  <!--  <vue-cal-->
  <!--      v-else-if="unit == 2"-->
  <!--      style="height: 25rem"-->
  <!--      :time-from="msg.startTime * 60"-->
  <!--      :time-to="msg.endTime * 60"-->
  <!--      active-view="month"-->
  <!--      :disable-views="['years']"-->
  <!--      :special-hours="specialHours"-->
  <!--      :dblclickToNavigate="false"-->
  <!--      :disable-days="disable_days"-->
  <!--      today-button-->
  <!--      @cell-click="getWeek('cell-click ', $event)"-->
  <!--  />-->
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import {get_hour_ava, get_day_ava} from "../utils/api";

export default {
  components: {VueCal},
  name: "rcalendar",
  props: ["msg"],
  emits: ["childFn"],
  data: () => ({
    events: [
      {
        start: '2021-11-13 10:30',
        end: '2021-11-13 11:30',
        title: 'Doctor appointment',
        content: '<i class="v-icon material-icons">local_hospital</i>',
        class: 'btn-primary'
      },
    ],
    times: {},
    specialHours: {},
    day_ava: 0,
    disable_days: [],
    hours_ava: undefined,
    unit: 0,
  }),
  methods: {
    viewChange(s, e) {
      // alert('view change')
      console.log(e)
      console.log(e.view)
      console.log(e.startDate)
      if (e.view == 'day') this.changeUnit(0, e.startDate)
      else if (e.view == 'month') this.changeUnit(1, e.startDate)
    },
    async changeUnit(unit, starTime) {
      this.unit = unit;
      if (unit == 1 || unit == 2) {
        let year = new Date(starTime).getFullYear()
        let month = new Date(starTime).getMonth() + 1
        await this.getSpecialHours_days(
            this.msg.facility.facility_id, year, month
        );
      } else if (unit == 0) {
        let date = new Date(starTime).getDate()
        let day = new Date(starTime).getDay()
        let year = new Date(starTime).getFullYear()
        let month = new Date(starTime).getMonth()
        if (day == 0) day = 7
        await this.getSpecialHours_hours(
            date,
            day,
            year,
            month,
            this.msg.facility.facility_id
        );
      }
    },
    async getSpecialHours_hours(date, day, year, month, facility_id) {
      // alert(year)
      // alert(month)
      // alert(date)
      // alert(new Date().getMonth())
      //几号，周几，id
      let data = {facility_id, day: date};
      const res = await get_hour_ava(data);
      let hours_ava = res.data.hours;
      this.hours_ava = hours_ava;
      console.log(hours_ava)

      let specialHours = {};
      let hour_ava_arr = []; //每一天空闲数组
      let start, end, hour_ava, outside_j;
      let specialHours_class = "business-hours";

      for (let i = 0; i < hours_ava.length; i++) {
        start = hours_ava[i];
        end = hours_ava[i];
        for (let j = i + 1; j < hours_ava.length + 1; j++) {
          // console.log(j)
          if (end + 1 == hours_ava[j]) {
            end = hours_ava[j];
          } else {
            outside_j = j;
            break;
          }
        }
        hour_ava = {
          from: start * 60,
          to: (end + 1) * 60,
          class: specialHours_class,
        };
        hour_ava_arr.push(hour_ava);
        i = outside_j - 1;
      }
      specialHours[day] = hour_ava_arr;

      let today = new Date()
      let today_year = today.getFullYear()
      let today_month = today.getMonth()
      let today_date = today.getDate()
      if (today.getFullYear() > year || today.getMonth() > month || today.getDate() > date) {
        // alert('过了')
        console.log('过了')
        hour_ava_arr = [];
        hours_ava = []
        // this.specialHours[day] = hour_ava_arr;
        console.log(specialHours)
        console.log(specialHours[day])
      }

      this.specialHours[day] = hour_ava_arr;
      console.log('this.specialHours')
      console.log(this.specialHours)
    },
    async getSpecialHours_days(facility_id, year, month) {
      // alert("year:" + year.toString() + "month:" + month.toString())
      // let data = {facility_id};
      let data = {facility_id, 'year': year, 'month': month};
      const res = await get_day_ava(data);
      let days = res.data.days;
      let month_days = [];
      for (let i = 1; i < 31; i++) {
        month_days[i - 1] = i;
      }
      // console.log(month_days)
      days = month_days.filter(function (v) {
        return days.indexOf(v) == -1;
      });

      let disable_days = [];
      let now_year = year;
      let now_month = month - 1;

      let today = new Date()
      //过去的时间不可选
      if (today.getMonth() == now_month) {
        for (let i = 1; i < today.getDate() + 1; i++) {
          let disable_day = new Date(
              now_year,
              now_month,
              i
          ).format();
          disable_days.push(disable_day);
        }
      } else if (today.getMonth() > now_month) {
        for (let i = 1; i < 32 + 1; i++) {
          let disable_day = new Date(
              now_year,
              now_month,
              i
          ).format();
          disable_days.push(disable_day);
        }
        // alert('过去了')
      }


      for (let i = 0; i < days.length; i++) {
        let disable_day = new Date(
            now_year,
            now_month,
            days[i]
        ).format();
        disable_days.push(disable_day);
      }
      this.disable_days = disable_days;
      console.log("disable_days");
      console.log(disable_days);
    },

    onEventClick(event, e) {
      this.selectedEvent = event;
      this.showDialog = true;

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
    },
    backTimes(e) {
      this.times.unit = this.unit;
      this.times.year = new Date(e).getFullYear();
      this.times.month = new Date(e).getMonth() + 1;
      this.times.days = new Date(e).getDate();
      this.times.hours = new Date(e).getHours() - 1;
    },
    getHours(s, e) {
      console.log("e:");
      console.log(e);
      console.log(this.hours_ava)
      console.log(e.getHours())
      if (this.hours_ava.indexOf(e.getHours()) == -1) {
        console.log("选择的不是可用时间");

      } else {
        // 这是弃用的,但还有点用
        this.times.date = new Date(e).format("YYYY-MM-DD");
        this.times.startTime = new Date(e).format("HH:00");
        let addTime = e.setHours(e.getHours() + 1);
        this.times.endTime = new Date(addTime).format("HH:00");

        this.backTimes(e);
        this.times.days = JSON.stringify([(this.times.days)]);
        this.times.hours = JSON.stringify([(this.times.hours)]);

        // let days = [];
        // let hours = [];
        // this.times.days = JSON.stringify(
        //     days.push(this.times.days)
        // );
        // this.times.hours = JSON.stringify(
        //     hours.push(this.times.hours)
        // );
        // this.times.hours = JSON.stringify(this.times.hours);

        this.$emit("childFn", this.times);
        this.$emit("father-click");
      }
    },
    async getDay(s, e) {
      //旧的
      let startTime, endTime, time1, time2;
      time1 = this.$props.msg.startTime;
      time2 = this.$props.msg.endTime;
      this.times.date = new Date(e).format("YYYY-MM-DD");
      startTime = e.setHours(time1);
      startTime = new Date(startTime).format("YYYY-MM-DD-HH:00");
      this.times.startTime = startTime;
      let addTime = e.setHours(time2);
      this.times.endTime = new Date(addTime).format(
          "YYYY-MM-DD-HH:00"
      );

      //新的
      this.backTimes(e);
      this.times.days = JSON.stringify([(this.times.days - 1)]);

      this.$emit("childFn", this.times);
      this.$emit("father-click");
    },
    getWeek(s, e) {
      //旧的
      let startTime, endTime, time1, time2;
      // 分别是预约开始时间,预约结束时间,开业时间,关门时间
      time1 = this.$props.msg.startTime;
      time2 = this.$props.msg.endTime;
      this.times.date = new Date(e).format("YYYY-MM-DD");
      startTime = e.setHours(time1);
      startTime = new Date(startTime).format("YYYY-MM-DD");
      this.times.startTime = startTime;

      let addTime = new Date(e);
      // endTime = addTime.setDate(addTime.getDate() + 7);
      endTime = addTime.setDate(addTime.getDate() + 7);
      // endTime = addTime.setHours(time2);
      // endTime = new Date(endTime).setHours(time2);
      this.times.endTime = new Date(endTime).format(
          "YYYY-MM-DD"
      );

      //新的
      this.backTimes(e);
      let days = [];
      let startdate = new Date(e).getDate();
      let disable_days_date = [];
      console.log(this.disable_days);
      for (const disableDaysDateKey in this.disable_days) {
        disable_days_date.push(
            new Date(
                this.disable_days[disableDaysDateKey]
            ).getDate()
        );
      }

      for (let i = 0; i < 7; i++) {
        if (disable_days_date.indexOf(startdate + i) === -1)
          days.push(startdate + i);
      }
      this.times.days = JSON.stringify(days);
      this.times.hours = JSON.stringify(days);

      this.$emit("childFn", this.times);
      this.$emit("father-click");
    },
  },
};
</script>

<style>
.business-hours {
  background-color: rgba(255, 255, 0, 0.2);
  border: solid rgba(255, 210, 0, 0.6);
  border-width: 2px 0;
  cursor: pointer; /*鼠标变小手*/
}

.badevents {
  background-color: red;
}
</style>
