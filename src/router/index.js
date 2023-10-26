// Composables
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "",
        name: "Index",
        component: () => import("@/views/Index.vue"),
      },
      {
        path: "discussion/all",
        name: "AllDiscussions",
        component: () => import("@/views/AllDiscussions.vue"),
      },
      {
        path: "discussion/:id",
        name: "Discussion",
        component: () => import("@/views/SingleDiscussion.vue"),
        props: (route) => route.params,
      },
      {
        path: "experience/all",
        name: "AllExperiences",
        component: () => import("@/views/AllExperiences.vue"),
      },
      {
        path: "experience/:id",
        name: "Experience",
        component: () => import("@/views/SingleExperience.vue"),
        props: (route) => route.params,
      },
      {
        path: "profile",
        name: "Profile",
        beforeEnter: (to) => {
          if (to.name == "Profile" && !localStorage.getItem('token'))
            return { name: "Login" };
        },
        component: () => import("@/views/Profile.vue"),
      },
      {
        path: "login",
        name: "Login",
        beforeEnter: (to) => {
          if (to.name == "Login" && localStorage.getItem('token'))
            return { name: "Profile" };
        },
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "signup",
        name: "Signup",
        beforeEnter: (to) => {

          if (to.name == "Signup" && localStorage.getItem('token'))
            return { name: "Profile" };
        },
        component: () => import("@/views/Signup.vue"),
      },
      {
        path: "interview",
        name: "Interview",
        // beforeEnter: (to) => {

        //   if (to.name == "Interview" && !localStorage.getItem('token'))
        //   return { name: "Login" };
        // },
        component: () => import("@/views/Interview.vue"),
      },
      
    ],
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
