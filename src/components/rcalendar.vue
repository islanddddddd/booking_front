<template>

  <dl class="row text-capitalize">
    <div class="row col-6" v-for="(item, index) in msg.facility">
      <dt class="col-sm-3">{{ index }}</dt>
      <dd class="col-sm-3">{{ item }}</dd>
    </div>
  </dl>

  <button class="btn btn-primary m-1" @click="changeUnit(0)">hour</button>
  <button class="btn btn-primary m-1" @click="changeUnit(1)">day</button>
  <button class="btn btn-primary m-1" @click="changeUnit(2)">week</button>
  <vue-cal
      v-if="unit == 0"
      style="height: 25rem"
      :time-from="msg.startTime * 60"
      :time-to="msg.endTime * 60"
      :disable-views="['years', 'day', 'year', 'month']"
      :special-hours="specialHours"
      :dblclickToNavigate="false"
      today-button
      :events="[events]"
      @cell-click="logEvents('cell-click ', $event)"
  />
  <vue-cal
      v-else-if="unit == 1"
      style="height: 25rem"
      :time-from="msg.startTime * 60"
      :time-to="msg.endTime * 60"
      :disable-views="['years', 'day', 'year', 'week']"
      :special-hours="specialHours"
      :dblclickToNavigate="false"
      today-button
      :events="[events]"
      @cell-click="getDay('cell-click ', $event)"
  />
  <vue-cal
      v-else-if="unit == 2"
      style="height: 25rem"
      :time-from="msg.startTime * 60"
      :time-to="msg.endTime * 60"
      :disable-views="['years', 'day', 'year', 'week']"
      :special-hours="specialHours"
      :dblclickToNavigate="false"
      today-button
      :events="[events]"
      @cell-click="getWeek('cell-click ', $event)"
  />
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

// `from` and `to` are expected in minutes.
// const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' };

// In your component's data, special hours from Monday to Friday.
// Note that you can provide an array of multiple blocks for the same day.

export default {
  components: {VueCal},
  name: 'rcalendar',
  props: ['msg'],
  emits: ['childFn'],
  data: () => ({
    events: {
      start: '2021-11-19 12:00', // Required.
      end: '2021-11-19 14:00',
      class: 'badevents'
    },
    times: {},
    specialHours: {},
    unit: 0,
  }),
  methods: {
    changeUnit(unit) {
      this.unit = unit
    },
    onEventClick(event, e) {
      this.selectedEvent = event;
      this.showDialog = true;

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
    },
    logEvents(s, e) {
      // 这是弃用的,但还有点用
      this.times.date = new Date(e).format('YYYY-MM-DD');
      this.times.startTime = new Date(e).format('HH:00');
      let addTime = e.setHours(e.getHours() + 1);
      this.times.endTime = new Date(addTime).format('HH:00');

      this.times.unit = this.unit
      this.times.year = new Date(e).getFullYear()
      this.times.month = new Date(e).getMonth()
      this.times.days = new Date(e).getDate()
      this.times.hours = new Date(e).getHours()


      // this.specialHours.day={this.times.startTime*60}
      // if(day==1){
      // 	this.times.specialHours.=7
      // }
      this.$emit('childFn', this.times);
      this.$emit('father-click');
    },
    getDay(s, e) {

      //旧的
      let startTime, endTime, time1, time2;
      time1 = this.$props.msg.startTime;
      time2 = this.$props.msg.endTime;
      this.times.date = new Date(e).format('YYYY-MM-DD');
      startTime = e.setHours(time1);
      startTime = new Date(startTime).format('YYYY-MM-DD-HH:00');
      this.times.startTime = startTime;
      let addTime = e.setHours(time2);
      this.times.endTime = new Date(addTime).format('YYYY-MM-DD-HH:00');

      //新的
      this.times.unit = this.unit
      this.times.year = new Date(e).getFullYear()
      this.times.month = new Date(e).getMonth()
      this.times.days = new Date(e).getDate()
      this.times.hours = new Date(e).getHours()

      this.$emit('childFn', this.times);
      this.$emit('father-click');
    },
    getWeek(s, e) {
      //旧的
      let startTime, endTime, time1, time2;
      // 分别是预约开始时间,预约结束时间,开业时间,关门时间
      time1 = this.$props.msg.startTime;
      time2 = this.$props.msg.endTime;
      this.times.date = new Date(e).format('YYYY-MM-DD');
      startTime = e.setHours(time1);
      startTime = new Date(startTime).format('YYYY-MM-DD-HH:00');
      this.times.startTime = startTime;
      let addTime = new Date(e);
      endTime = addTime.setDate(addTime.getDate() + 7);
      endTime = addTime.setHours(time2);
      endTime = new Date(endTime).setHours(time2);
      this.times.endTime = new Date(endTime).format('YYYY-MM-DD-HH:00');

      //新的
      this.times.unit = this.unit
      this.times.year = new Date(e).getFullYear()
      this.times.month = new Date(e).getMonth()
      this.times.days = new Date(e).getDate()
      this.times.hours = new Date(e).getHours()


      // this.specialHours.day={this.times.startTime*60}
      // if(day==1){
      // 	this.times.specialHours.=7
      // }
      // console.log(this.times);
      this.$emit('childFn', this.times);
      this.$emit('father-click');
    }
  }
};
</script>

<style>
.business-hours {
  background-color: rgba(255, 255, 0, 0.2);
  border: solid rgba(255, 210, 0, 0.6);
  border-width: 2px 0;
}

.badevents {
  background-color: red;
}
</style>
