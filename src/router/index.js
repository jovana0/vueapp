import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import SingleBookView from "../views/SingleBookView.vue"
import TheForm from "../components/books/TheFormComment.vue"
import SingUpView from '@/views/SingUpView.vue'
import LogInView from '@/views/LogInView.vue'
import AdminView from '@/views/AdminView.vue'
import MyProfileView from '@/views/MyProfileView.vue'
import AboutView from '../views/AboutView.vue'
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      transition: "fade",
      isUnauth: true,
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      transition: "fade",
      isUnauth: true,
    }
  },
  {
    path: "/book/:id",
    name: "book",
    component: SingleBookView,
    props: true,
    meta: {
      transition: "slide-fade",
      isUnauth: true,
    },
    children: [
      {
        path: "comment",
        name: "comment",
        component: TheForm,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/singup",
    name: "singup",
    component: SingUpView,
    meta: {
      transition: "slide-fade",
      isUnauth: true,
      requiresGuest: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: LogInView,
    meta: {
      transition: "slide-fade",
      isUnauth: true,
      requiresGuest: true
    }
  },
  {
    path: "/myprofile",
    name: "myprofile",
    component: MyProfileView,
    meta: { 
      transition: "slide-fade",
      requiresAuth: true, 
      requiredRole: "User"
    }
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: { 
      transition: "slide-fade",
      requiresAuth: true, 
      requiredRole: "Admin" 
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const userRole = store.getters['auth/currentUserRole'];
  console.log(userRole);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'login' });
    } else if (to.matched.some(record => record.meta.requiredRole)) {
      const requiredRole = to.meta.requiredRole;
      if (userRole !== requiredRole) {
        next({ name: 'home' });
      } else {
        next();
      }
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (isAuthenticated) {
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;
