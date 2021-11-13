<template>
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
      Update
    </button>
    <!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> -->
  </form>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "changeUser",
  data() {
    return {
      modifyTable: JSON.parse(Cookies.get("user"))
    }
  },
  methods :{
    onSubmit() {

    },
    initData() {

    }
  },
  created() {
    this.initData();
  }
}
</script>

<style scoped>

</style>
