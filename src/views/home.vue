<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-2">
        <Sidebar></Sidebar>
      </div>
      <div class="col-1"></div>

      <div class="col-7">
        <router-view></router-view>
      </div>
      <!--      <div class="col-1"></div>-->
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/sidebar.vue';
import Cookies from 'js-cookie'

export default {
  components: {
    Sidebar,
  },

  // created() {
  //   this.init()
  // },
  // data() {
  //   return {
  //     userId: Cookies.get("userId")
  //   }
  // },
  // methods: {
  //   init() {
  //     if (this.userId == undefined) {
  //       console.log('未登录，跳转到登录页')
  //       this.$router.push('/login')
  //     }
  //   }
  // }
  // ,
  // watch: {
  //   userId: function () {
  //     this.init();
  //   }
  // }
};
</script>

<style>
div {
  padding: 0;
}
</style>
