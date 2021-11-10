<template>
	<!-- {{ msg }} -->
	<!-- <vue-cal :time-from="msg.startTime * 60" :time-to="msg.endTime * 60" :special-hours="msg.specialHours" :disable-views="['years']" today-button :events="[events]" /> -->
	<!-- <vue-cal :time-from="msg.startTime * 60" :time-to="msg.endTime * 60" :disable-views="['years']" today-button :events="[events]" @cell-dblclick="dbclick()" /> -->
	<vue-cal
		v-if="msg.unit == 0"
		style="height: 25rem;"
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
		v-else-if="msg.unit == 1"
		style="height: 25rem;"
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
		v-else-if="msg.unit == 2"
		style="height: 25rem;"
		:time-from="msg.startTime * 60"
		:time-to="msg.endTime * 60"
		:disable-views="['years', 'day', 'year', 'week']"
		:special-hours="specialHours"
		:dblclickToNavigate="false"
		today-button
		:events="[events]"
		@cell-click="logEvents('cell-click ', $event)"
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
	components: { VueCal },
	name: 'rcalendar',
	props: ['msg'],
	emits: ['childFn'],
	data: () => ({
		events: {
			start: '2021-11-19 12:00', // Required.
			end: '2021-11-19 14:00',
			class: 'badevents'
		},
		times: { startTime: '', endTime: '', date: '', specialHours: [] },
		specialHours: {}
	}),
	methods: {
		onEventClick(event, e) {
			this.selectedEvent = event;
			this.showDialog = true;

			// Prevent navigating to narrower view (default vue-cal behavior).
			e.stopPropagation();
		},
		logEvents(s, e) {
			console.log(s);
			console.log(e);
			console.log(e.getHours());
			this.times.date = new Date(e).format('YYYY-MM-DD');
			this.times.startTime = new Date(e).format('HH:00');
			let addTime = e.setHours(e.getHours() + 1);
			this.times.endTime = new Date(addTime).format('HH:00');

			var day = '7123456'.charAt(new Date(e).getDay());
			this.times.day = day;

			this.times.jump = true;

			// this.specialHours.day={this.times.startTime*60}
			// if(day==1){
			// 	this.times.specialHours.=7
			// }
			this.$emit('childFn', this.times);
		},
		getDay(s, e) {
			console.log(s);
			console.log(e);
			console.log(this.$props.msg);
			console.log(e.getHours());
			
			// this.times.date = new Date(e).format('YYYY-MM-DD');
			// this.times.startTime = new Date(e).format('YYYY-MM-DD');
			
			// // let addTime = e.setHours();
			// this.times.endTime = new Date(addTime).format('YYYY-MM-DD');

			// var day = '7123456'.charAt(new Date(e).getDay());
			// this.times.day = day;


			// this.specialHours.day={this.times.startTime*60}
			// if(day==1){
			// 	this.times.specialHours.=7
			// }
			this.$emit('childFn', this.times);
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
