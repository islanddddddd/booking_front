<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
    <div class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <span class="fs-4">Home</span>
    </div>
    <hr/>
    <ul class="nav nav-pills flex-column mb-auto" v-if="ifAdmin">
      <li class="nav-item" v-for="(item, index) in adminLinks" :key="index" @click="changeIt(index)">
        <router-link class="nav-link link-dark" :class="{ active: currentIndex == index }" :to="{ name: item }">{{
            index
          }}
        </router-link>
      </li>
    </ul>
    <ul class="nav nav-pills flex-column mb-auto" v-else>
      <li class="nav-item" v-for="(item, index) in userLinks" :key="index" @click="changeIt(index)">
        <router-link class="nav-link link-dark" :class="{ active: currentIndex == index }" :to="{ name: item }">{{
            index
          }}
        </router-link>
      </li>
    </ul>

    <hr/>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2"
         data-bs-toggle="dropdown" aria-expanded="false">
        <strong>more</strong>
      </a>
      <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
        <li class="dropdown-item" @click="signOut()">Sign out</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'


export default {
  mounted() {
    this.init()
  },
  update() {
    this.init()
  },

  data() {
    return {
      ifAdmin: Cookies.get("admin") === "true",
      userLinks: {
        Home: 'profile',
        Orders: 'order',
        Reserve: 'reserve',
      },
      adminLinks: {
        Home: 'profile',
        UserManagement: 'userManagement',
        OrderManagement: 'order',
        PlanManagement: 'planManagement',
        FacilityManagement: 'facilityManagement',
        Reserve: 'reserve',
      },
      currentIndex: 'Home'
    };
  },
  methods: {
    changeIt(index) {
      // alert(index);
      this.currentIndex = index;
    },
    signOut() {
      alert('signOut')
      Cookies.remove('userId');
      Cookies.remove('admin');
      this.init()
    },
    init() {
      let userId = Cookies.get("userId")
      if (userId == undefined) {
        console.log('未登录，跳转到登录页')
        this.$router.push('/login')
      }
    }
  },
  components: {}
};
</script>

<style>
router-link {
  color: red;
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

body {
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

html {
  height: -webkit-fill-available;
}

main {
  display: flex;
  flex-wrap: nowrap;
  height: 100vh;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
}

.b-example-divider {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1), inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.bi {
  vertical-align: -0.125em;
  pointer-events: none;
  fill: currentColor;
}

.dropdown-toggle {
  outline: 0;
}

.nav-flush .nav-link {
  border-radius: 0;
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
  background-color: transparent;
  border: 0;
}

.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, 0.85);
  background-color: #d2f4ea;
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform 0.35s ease;
  transform-origin: 0.5em 50%;
}

.btn-toggle[aria-expanded='true'] {
  color: rgba(0, 0, 0, 0.85);
}

.btn-toggle[aria-expanded='true']::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: 0.1875rem 0.5rem;
  margin-top: 0.125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}

.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
}

.scrollarea {
  overflow-y: auto;
}

.fw-semibold {
  font-weight: 600;
}

.lh-tight {
  line-height: 1.25;
}
</style>
