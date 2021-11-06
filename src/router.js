import {
	createRouter,
	createWebHashHistory
} from "vue-router"
import Login from "./views/login.vue"
import Register from "./views/register.vue"
import Home from "./views/home.vue"
import Sidebar from "./components/sidebar.vue"

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
			children: [{
				path: "/login",
				name: "/login",
				component: Login
			}, ]
		},
	]
})
export default router;
