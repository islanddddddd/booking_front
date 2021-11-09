<template>
  <div id="body">
    <div id="main" class="form-signin">
      <form>
        <h1 class="h3 mb-3 fw-normal">Register</h1>

        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            v-model="formMess.userName"
          />
          <label for="floatingInput">UserName</label>
        </div>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            placeholder="Password"
            v-model="formMess.firstName"
          />
          <label for="floatingPassword">FirstName</label>
        </div>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="formMess.lastName"
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
              v-model="formMess.gender"
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
              v-model="formMess.gender"
            />
            <label class="form-check-label" for="inlineRadio2">Female</label>
          </div>
        </div>
        <!-- tel -->
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            placeholder="Password"
            v-model="formMess.tel"
          />
          <label for="floatingPassword">Tel</label>
        </div>
        <!-- address -->
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            placeholder="Password"
            v-model="formMess.address"
          />
          <label for="floatingPassword">Address</label>
        </div>
        <div class="form-floating">
          <input
            type="email"
            class="form-control"
            placeholder="Password"
            v-model="formMess.email"
          />
          <label for="floatingPassword">Email</label>
        </div>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            placeholder="Password"
            v-model="formMess.passwd"
          />
          <label for="floatingPassword">Password</label>
        </div>

        <button
          class="w-100 btn btn-lg btn-primary"
          type="submit"
          @click="onSubmit()"
        >
          Submit
        </button>
        <!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> -->
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {userRegister} from "../../utils/api";

export default {
  name: "register",
  data() {
    return {
      formMess: {
        userName: "",
        firstName: "",
        lastName: "",
        gender: "",
        tel: "",
        address: "",
        email: "",
        passwd: "",
      },
      checked: false,
    };
  },
  methods: {
    async onSubmit() {
      this.check();

      if (this.checked === true) {
        // var formData = new FormData();
        // console.log(this.formMess["tel"])
        // for(var key in this.formMess){
        //   console.log(key);
        //   formData.append(key,this.formMess[key]);
        // }
        // console.log(formData);
        var formData = JSON.stringify(this.formMess); // 这里才是你的表单数据

        const res = await userRegister(this.formMess);
        if (res.status === 200) {
          console.log("注册成功！！！！");
          await this.$router.push('/profile')
        }
        // console.log(formData);
        // console.log("-----------------");
        //
        // axios({
        //   method: "post",
        //   url: " http://127.0.0.1:8000/user/register/",
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        //   withCredentials: true,
        //   data: formData,
        // }).then((res) => {
        //   console.log(res);
        // });
        // // 接着写登陆逻辑
      } else {
        alert("请输入正确的表单");
      }
    },
    check() {
      let formData = this.formMess;
      for (var a in formData) {
        let element = formData[a];
        if (element != "") {
          this.checked = true;
        } else {
          this.checked = false;
          console.log("空字符串");
        }
      }
    },
  },
};
</script>

<style>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
#body {
  height: 100%;
}

#body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.form-floating {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
