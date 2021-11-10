<template>
  <div
      class="modal modal-signin position-static d-block bg-Light py-5"
      tabindex="-1"
      role="dialog"
      id="modalSignin"
  >
    <div class="modal-dialog" role="document">
      <div id="body" class="modal-content rounded-5 shadow">
        <div class="modal-header p-5 pb-4 border-bottom-0">
          <!-- <h5 class="modal-title">Modal title</h5> -->
          <h2 class="fw-bold mb-0">Sign in</h2>
        </div>

        <div class="modal-body p-5 pt-0">
          <form class="">
            <div class="form-floating mb-3">
              <input
                  type="email"
                  class="form-control rounded-4"
                  id="floatingInput"
                  placeholder="name@example.com"
                  v-model="dataForm.email"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                  type="password"
                  class="form-control rounded-4"
                  id="floatingPassword"
                  placeholder="Password"
                  v-model="dataForm.passwd"
              />
              <label for="floatingPassword">Password</label>
            </div>
            <button
                class="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
                @click="onSubmit()"
            >
              Sign in
            </button>
            <small class="text-muted">By clicking Sign in, you agree to the terms of use.</small>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {userLogin} from "../../utils/api";
export default {
  data() {
    return {
      dataForm: {
        email: "",
        passwd: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      if (this.dataForm.email !== '' && this.dataForm.passwd !== '') {
        const res = await userLogin(this.dataForm);
        if (res.status === 200) {
          const user = res.data.user
          console.log("登陆成功");
          Cookies.set("userId", user.userId);
          Cookies.set("admin", user.admin);
          if (res.data.isAdmin) {
            await this.$router.push('/adminHome')
          } else {
            await this.$router.push('/profile')
          }
        }
      }
      // alert('登录');
    },
  },
};
</script>

<style>
#body {
  top: 100px;
}

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
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
  inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.rounded-4 {
  border-radius: 0.5rem;
}
.rounded-5 {
  border-radius: 0.75rem;
}
.rounded-6 {
  border-radius: 1rem;
}

.modal-sheet .modal-dialog {
  width: 380px;
  transition: bottom 0.75s ease-in-out;
}
.modal-sheet .modal-footer {
  padding-bottom: 2rem;
}

.modal-alert .modal-dialog {
  width: 380px;
}

.border-right {
  border-right: 1px solid #eee;
}

.modal-tour .modal-dialog {
  width: 380px;
}
</style>
