<template>
  <dl class="row text-capitalize">
    <div class="row col-6" v-for="(item, index) in msg.facility">
      <dt class="col-sm-3">{{ index }}</dt>
      <dd class="col-sm-3">{{ item }}</dd>
    </div>
  </dl>

  <!--  <button class="btn btn-primary m-1" @click="changeUnit(0)">hour</button>-->
  <button class="btn btn-primary m-1" @click="changeUnit(1,new Date())" v-if="unit==2">select day</button>
  <button class="btn btn-primary m-1" @click="changeUnit(2,new Date())" v-if="unit==1">select week</button>
  <!--  <button @click="createEvent('2021-11-13 14:00','2021-11-13 18:00',)">create events</button>-->
  <!--  <button @click="returnHours">return</button>-->
  <vue-cal
      v-if="unit == 0"
      style="height: 100%"
      :time-from="msg.startTime * 60"
      :time-to="msg.endTime * 60"
      active-view="day"
      :disable-views="['years','week']"

      :special-hours="specialHours"
      :dblclickToNavigate="false"
      today-button
      :events="events"
      @cell-click="create_hours_events('cell-click ', $event)"
      @view-change="viewChange('view-change', $event)"
      :on-event-click="onEventClick"
  />
  <div v-else-if="unit == 1"
  >
    <vue-cal
        style="height: 40rem"

        :time-from="msg.startTime * 60"
        :time-to="msg.endTime * 60"
        active-view="month"
        :disable-views="['years','week']"

        :dblclickToNavigate="false"
        :disable-days="disable_days"
        @cell-click="getDay('cell-click ', $event)"
        @view-change="viewChange('view-change', $event)">
      <!-- Custom cells -->
    </vue-cal>
  </div>
  <div v-else-if="unit == 2"
  >
    <vue-cal
        style="height: 40rem"
        :time-from="msg.startTime * 60"
        :time-to="msg.endTime * 60"
        active-view="month"
        :disable-views="['years','week']"
        :dblclickToNavigate="false"
        :disable-days="disable_days"
        @cell-click="getWeek('cell-click ', $event)"
        @view-change="viewChange('view-change', $event)">
      <!-- Custom cells -->
    </vue-cal>
  </div>
  <div v-else-if="unit == 3">

    <vue-cal
        style="height: 40rem"

        :time-from="msg.startTime * 60"
        :time-to="msg.endTime * 60"
        active-view="year"
        :disable-views="['years','week']"

        :dblclickToNavigate="false"
        :disable-days="disable_days"
        @cell-click="getMonth($event)"
        @view-change="viewChange('view-change', $event)"

    />
  </div>


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
    events: [],
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

      let starTime = e.startDate
      if (e.view == 'day') this.changeUnit(0, starTime)
      else if (e.view == 'month') this.changeUnit(1, starTime)
      else if (e.view == 'year') this.changeUnit(3, starTime)

    },
    async changeUnit(unit, starTime) {
      this.unit = unit;
      if (unit == 1 || unit == 2 || unit == 3) {
        let year = new Date(starTime).getFullYear()
        let month = new Date(starTime).getMonth() + 1
        let e = new Date(starTime)
        await this.getSpecialHours_days(
            this.msg.facility.facility_id, year, month, e
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
        console.log('时间过了')
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
    async getSpecialHours_days(facility_id, year, month, e) {
      // alert("year:" + year.toString() + "month:" + month.toString())
      // let data = {facility_id};
      this.disable_days = []
      let data = {facility_id, 'year': year, 'month': month};
      const res = await get_day_ava(data);
      // alert(res.data)
      let res_data = res.data.days;

      let month_days = [];
      let e_date = new Date(e)
      let max_day = new Date(e_date.getFullYear(), e_date.getMonth() + 1, 0).getDate()


      for (let i = 1; i < max_day + 1; i++) {
        month_days[i - 1] = i;
      }
      let days = month_days

      if (res_data.length != 0 && res_data.length != max_day) {
        for (let i = 0; i < res_data.length; i++) {
          let a = res_data[i]
          for (let j = 0; j < month_days.length; j++) {
            let b = month_days[j]
            // if (res[i] == month_days[j]) delItem(res[i], days);
            if (a == b) {
              console.log(b)
              delItem(a, days)
              break
            }
          }
        }
      } else if (res_data.length == max_day) {
        // alert('空')
      }

      function delItem(item, list) {
        // 表示先获取这个元素的下标，然后从这个下标开始计算，删除长度为1的元素
        list.splice(list.indexOf(item), 1)
      }

      console.log(days)
      let disable_days = [];
      let now_year = year;
      let now_month = month - 1;

      //过去的时间不可选
      let today = new Date()
      let today_month = today.getMonth()
      let today_year = today.getFullYear()

      // let e_date = new Date(e)
      max_day = new Date(now_year, now_month, 0).getDate()

      // if (today.getMonth() == now_month) {

      if (today_month == now_month) {
        // for (let i = 1; i < today.getDate() + 1; i++) {
        //   let disable_day = new Date(
        //       now_year,
        //       now_month,
        //       i
        //   ).format();
        //   // disable_days.push(disable_day);
        // }
        // console.log(disable_days)
      } else if (today.getMonth() > now_month) {
        for (let i = 1; i < max_day + 1; i++) {
          let disable_day = new Date(
              now_year,
              now_month,
              i
          ).format();
          disable_days.push(disable_day);
        }
        // alert('过去了')
      }
      // let max_day = new Date(e_date.getFullYear(), e_date.getMonth() + 1, 0).getDate()
      console.log(days.length)
      max_day = new Date(e_date.getFullYear(), e_date.getMonth() + 1, 0).getDate()
      if (days.length == 0) {
        for (let i = 1; i < max_day + 1; i++) {
          let disable_day = new Date(
              now_year,
              now_month,
              i
          ).format();
          disable_days.push(disable_day);
        }
      } else if (days.length == max_day) {
        disable_days = []
      } else {
        for (let i = 0; i < days.length; i++) {
          let disable_day = new Date(now_year, now_month, days[i]).format();
          console.log(disable_day)
          disable_days.push(disable_day);
        }
        console.log(disable_days)
      }

      this.disable_days = disable_days;
      console.log("disable_days");
      console.log(disable_days);
    },

    //点击事件后取消这一段
    onEventClick(event, e) {
      this.selectedEvent = event;
      this.showDialog = true;
      // alert(new Date(event.start).format('YYYY-MM-DD H:00'))
      // alert(this.events)


      // for (let i = 0; i < this.events.length; i++) {
      for (const i in this.events) {
        // alert(i)
        // alert('开始')
        if (new Date(event.start).format('YYYY-MM-DD H:00') == this.events[i].start) {
          // alert('已存在')
          delete this.events[i]
          break
        } else {
          // alert('不存在')
          // alert(new Date(event.start).format('YYYY-MM-DD H:00'))
          // alert(this.events[i].start)
        }
      }
    },
    async getMonth(e) {
      let e_date = new Date(e)

      let fa_id = this.msg.facility.facility_id
      let year = new Date(e_date).getFullYear()
      let month = new Date(e_date).getMonth() + 1
      // let data = {fa_id, 'year': year, 'month': month};
      // const res = await get_day_ava(data);
      // let days = res.data.days;
      await this.getSpecialHours_days(fa_id, year, month, e)
      let dis = this.disable_days
      let max_day = new Date(e_date.getFullYear(), e_date.getMonth() + 1, 0).getDate()

      if (dis.length >= max_day) {
        alert('There is no time this month')
      } else {
        console.log(e)
        let today = new Date()
        if (e_date.getFullYear() < today.getFullYear()) {
          alert('You cannot select a previous time')

        } else if (e_date.getFullYear() == today.getFullYear() && e_date.getMonth() + 1 < today.getMonth() + 1) {
          alert('You cannot select a previous time')

        } else {
          let max_day = new Date(e_date.getFullYear(), e_date.getMonth() + 1, 0).getDate()
          let days = []
          for (let i = 1; i < max_day + 1; i++) {
            days.push(i)
          }
          //新的
          this.times.unit = this.unit;
          this.times.year = e_date.getFullYear();
          //为啥+1我忘了，可能再父组件我又改了
          this.times.month = e_date.getMonth() + 1;
          this.times.days = JSON.stringify(days);
          this.times.hours = JSON.stringify([]);


          this.$emit("childFn", this.times);
          this.$emit("father-click");
        }


      }
    },
    async get_month_ava(e) {
      let e_date = new Date(e)
      let year = e_date.getFullYear()
      let month = e_date.getMonth()
      await this.getSpecialHours_days(
          this.msg.facility.facility_id, year, month, e
      );
    },
    //创建事件
    createEvent(start, end) {
      let event = {
        start: start, end: end, title: '', icon: '', content: '', contentFull: '',
        class: 'bg-primary'
      }
      this.events.push(event)
    },
    backTimes(e) {
      this.times.unit = this.unit;
      this.times.year = new Date(e).getFullYear();
      this.times.month = new Date(e).getMonth() + 1;
      this.times.days = new Date(e).getDate();
      this.times.hours = new Date(e).getHours() - 1;
    },
    create_hours_events(s, e) {
      if (this.hours_ava.indexOf(e.getHours()) == -1) {
        console.log("选择的不是可用时间");
      } else {
        let e_date = new Date(e)
        let event_start = e_date.format("YYYY-MM-DD H:00");
        // alert(event_start)
        let event_end = new Date(e_date.setHours(e_date.getHours() + 1)).format("YYYY-MM-DD H:00");
        // alert(event_end)
        this.createEvent(event_start, event_end)
      }
    },
    return() {
      // alert(this.unit)
      if (this.unit == 0) {
        // alert(this.unit)
        this.returnHours()
      }
      //现在点击月和天会直接跳转，没用上confirm
      this.$emit("childFn", this.times);

      this.$emit("father-click");

    },
    returnHours() {
      // alert('return hours')
      this.backTimes(this.events[0])
      let startTime = '', endTime, hours = [], date = '', month = '', year = ''
      for (const i in this.events) {
        let item = this.events[i]
        hours.push(new Date(item.start).getHours())
        if (startTime == '')
          startTime = item.start
        if (date == '')
          date = new Date(item.start).getDate()
        if (month == '')
          month = new Date(item.start).getMonth()
        if (year == '')
          year = new Date(item.start).getFullYear()

        endTime = item.end
      }
      this.times.startTime = ''
      this.times.endTime = ''
      this.times.days = JSON.stringify([date]);
      this.times.hours = JSON.stringify(hours);
      this.times.month = month + 1;
      this.times.year = year;

      let times = this.times
      console.log(times)
      // this.$emit("childFn", this.times);
      // this.$emit("father-click");
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
      endTime = addTime.setDate(addTime.getDate() + 7);
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
      let e_date = new Date(e)
      let max_day = new Date(e_date.getFullYear(), e_date.getMonth() + 1, 0).getDate()
      for (let i = 0; i < 7, startdate + i < max_day + 1; i++) {
        if (disable_days_date.indexOf(startdate + i) === -1) {
          // if (startdate + i >= max_day)
          //   break
          days.push(startdate + i);
        }
      }
      this.times.days = JSON.stringify(days);

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
