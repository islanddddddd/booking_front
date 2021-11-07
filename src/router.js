import {
	createRouter,
	createWebHashHistory
} from "vue-router"
import Login from "./views/logIN/login.vue"
import Register from "./views/logIN/register.vue"
import Home from "./views/home.vue"
import Sidebar from "./components/sidebar.vue"
import profile from './views/Profile.vue'
import ShowPlan from './views/plan/showPlan.vue'
import BuyPlan from './views/plan/buyPlan.vue'
import UserManagement from './views/admin/userManagement.vue'
import order from './views/order.vue'
import Header from './components/header.vue'
import adminhome from './views/admin/adminHome.vue'
import planManagement from './views/plan/planManagement.vue'
import facilityManagement from './views/admin/facilityManagement.vue'
import reserve from './views/reserve.vue'
import officeMap from './components/officeMap.vue'

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{path:'/',
		redirect:'/home',
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/register",
			component: Register
		},
		{
			path: "/home",
			name: 'Home',
			component: Home,
			redirect: '/profile',
			children: [{
				path: "/profile",
				name: "profile",
				component: profile
			}, {
				path: "/userManagement",
				name: "userManagement",
				component: UserManagement
			}, {
				path: "/adminHome",
				name: "adminHome",
				component: adminhome
			}, {
				path: "/planManagement",
				name: "planManagement",
				component: planManagement
			}, {
				path: "/facilityManagement",
				name: "facilityManagement",
				component: facilityManagement
			}, {
				path: "/reserve",
				name: "reserve",
				component: reserve,
				children: [{
					path: "/officeMap",
					name: "officeMap",
					component: officeMap,
				}]
			}, {
				path: "/order",
				name: "order",
				component: order
			}, ]
		},
		{
			path: "/showPlan",
			name: "showPlan",
			component: ShowPlan
		},
		{
			path: "/buyPlan",
			name: "buyPlan",
			component: BuyPlan
		},
		{
			path: "/header",
			name: "header",
			component: Header
		},
		{
			path: "/header",
			name: "header",
			component: Header
		},

	]
})
export default router;
