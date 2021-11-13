<template>
  <h4>Home</h4>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal"
          @click="this.modifyTable = this.user">
    modify
  </button>

  <div class="p-4 mb-4 rounded bg-light">
    <!--    <div id="profileCard" class="">-->
    <!--      <div class="row">-->
    <!--        <p class=" lead col-6" style="text-align: left;" v-for="(item, index) in user">{{ index }}:{{ item }}</p>-->

    <!--      </div>-->
    <!--    </div>-->
    <h4 class="text-capitaliz " v-if="user.admin">Admin</h4>

    <dl class="row text-capitalize">
      <div class="row col-6" v-for="(item, index) in user">
        <dt class="col-sm-3">{{ index }}</dt>
        <dd class="col-sm-3">{{ item }}</dd>
      </div>

    </dl>

  </div>
  <!--  -->
  <!--  <div class="row mb-2" id="user" v-if="user.admin ==false">-->
  <!--  <div class="row mb-2" id="user" v-if="!user.admin">-->
  <!--    <div class="col-md-6">-->
  <!--      <div-->
  <!--          class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative profileCard">-->
  <!--        <div class="col p-4 d-flex flex-column position-static">-->
  <!--          <strong class="d-inline-block mb-2 text-primary">Plan</strong>-->
  <!--          <h3 class="mb-0">{{ plan.type }}</h3>-->
  <!--          <div class="mb-1 text-muted">{{ plan.time }}</div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

  <!--  <div class="row mb-2" id="admin" v-if="user.admin ==true">-->
  <!--    <div class="col-md-6">-->
  <!--      <div-->
  <!--          class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative profileCard">-->
  <!--        <div class="col p-4 d-flex flex-column position-static">-->
  <!--          <strong class="d-inline-block mb-2 text-primary">Plan</strong>-->
  <!--          <h3 class="mb-0">Admin</h3>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->


  <!-- 模态框 -->
  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- 模态框头部 -->
        <div class="modal-header">
          <h4 class="modal-title">Modify User</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- 模态框内容 -->
        <div class="modal-body">
          <form>

            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  v-model="modifyTable.userName"
              />
              <label for="floatingInput">UserName</label>
            </div>
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  placeholder="Password"
                  v-model="modifyTable.firstName"
              />
              <label for="floatingPassword">FirstName</label>
            </div>
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  v-model="modifyTable.lastName"
              />
              <label for="floatingPassword">LastName</label>
            </div>
            <!-- 性别 -->
            <div>
              <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="1"
                    v-model="modifyTable.gender"
                />
                <label class="form-check-label" for="inlineRadio1">Male</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="0"
                    v-model="modifyTable.gender"
                />
                <label class="form-check-label" for="inlineRadio2">Female</label>
              </div>
            </div>
            <!-- tel -->
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  placeholder="Tel"
                  v-model="modifyTable.tel"
              />
              <label for="floatingPassword">Tel</label>
            </div>
            <!-- address -->
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  placeholder="Address"
                  v-model="modifyTable.address"
              />
              <label for="floatingPassword">Address</label>
            </div>
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
                @click="onSubmit"
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
import Cookies from 'js-cookie'
import {get_user_by_id, updateUser} from "../utils/api";

export default {
  data() {
    return {
      modifyTable: {},
      plan: {
        type: '月卡',
        time: '2021-12-12'
      },
      order: '无',
      user: {}
    };
  },
  methods: {
    goPlan() {
      // alert('plan');
    },
    goOrder() {
      // alert('order');

    },
    async initData() {
      const res = await get_user_by_id({"userId":Cookies.get("userId")})
      if (res.status === 200) {
        this.user = res.data.user;
      }
      console.log(res.data, "aaa");

    },
    async onSubmit() {
      console.log(this.modifyTable.gender);
      const data = this.modifyTable;
      data['gender'] = data['gender'] === 0 ? "Female" : "Male";

      const res = await updateUser(this.modifyTable);
      if (res.status === 200) {
        console.log("update success")

        this.$router.go(0);
      }
    }
  },
  components: {},
  created() {
    this.initData();
  }
};
</script>

<style>
.profileCard {
  min-height: 9.375rem;
  cursor: pointer;
}
</style>
