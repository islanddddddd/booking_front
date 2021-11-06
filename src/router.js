import {
	createRouter,
	createWebHashHistory
} from "vue-router"
import Login from "./views/login.vue"
import Register from "./views/register.vue"
import Home from "./views/home.vue"
import Sidebar from "./components/sidebar.vue"
import Profile from './views/profile.vue'
import ShowPlan from './views/plan/showPlan.vue'
import BuyPlan from './views/plan/buyPlan.vue'
import UserManagement from './views/userManagement.vue'

const router = createRouter({
	history: createWebHashHistory(),
	routes: [{
			path: "/",
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
				component: Profile
			}, {
				path: "/login",
				name: "login",
				component: Login
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
			path: "/userManagement",
			name: "userManagement",
			component: UserManagement
		},
	]
})
export default router;
