<template>
  <h4>Home</h4>

  <div class="p-4 mb-4 rounded bg-light">
    <!--    <div id="profileCard" class="">-->
    <!--      <div class="row">-->
    <!--        <p class=" lead col-6" style="text-align: left;" v-for="(item, index) in user">{{ index }}:{{ item }}</p>-->

    <!--      </div>-->
    <!--    </div>-->

    <dl class="row text-capitalize">
      <div class="row col-6" v-for="(item, index) in user">
        <dt class="col-sm-3">{{ index }}</dt>
        <dd class="col-sm-3">{{ item }}</dd>
      </div>
    </dl>

  </div>
  <!--  -->
<!--  <div class="row mb-2" id="user" v-if="user.admin ==false">-->
  <div class="row mb-2" id="user" v-if="!user.admin">
    <div class="col-md-6">
      <div
          class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative profileCard">
        <div class="col p-4 d-flex flex-column position-static" @click="goPlan()">
          <strong class="d-inline-block mb-2 text-primary">Plan</strong>
          <h3 class="mb-0">{{ plan.type }}</h3>
          <div class="mb-1 text-muted">{{ plan.time }}</div>
        </div>
      </div>
    </div>
    <div class="col-md-6 ">
      <div
          class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative profileCard">
        <div class="col p-4 d-flex flex-column position-static" @click="goOrder()">
          <strong class="d-inline-block mb-2 text-success">Order</strong>
          <h3 class="mb-0">{{ order }}</h3>
        </div>
      </div>
    </div>
  </div>

  <div class="row mb-2" id="admin" v-else>
    <div class="col-md-6">
      <div
          class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative profileCard">
        <div class="col p-4 d-flex flex-column position-static" @click="goPlan()">
          <strong class="d-inline-block mb-2 text-primary">Plan</strong>
          <h3 class="mb-0">Admin</h3>
        </div>
      </div>
    </div>
    <div class="col-md-6 ">
      <div
          class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative profileCard">
        <div class="col p-4 d-flex flex-column position-static" @click="goOrder()">
          <strong class="d-inline-block mb-2 text-success">Order</strong>
          <h3 class="mb-0">{{ order }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      plan: {
        type: '月卡',
        time: '2021-12-12'
      },
      order: '无',
      user: JSON.parse(Cookies.get("user"))
    };
  },
  methods: {
    goPlan() {
      alert('plan');
    },
    goOrder() {
      alert('order');
    }
  },
  components: {}
};
</script>

<style>
.profileCard {
  min-height: 9.375rem;
  cursor: pointer;
}
</style>
