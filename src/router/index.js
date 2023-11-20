// Composables
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";
import { useStepperStore } from "@/stores/stepper";

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
        component: () => import("@/views/Profile.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "signup",
        name: "Signup",
        component: () => import("@/views/Signup.vue"),
      },
      {
        path: "interview",
        name: "Interview",

        component: () => import("@/views/Interview.vue"),
      },

    ],
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(async (to, from) => {
  const user = useUserStore()
  const auth = useAuthStore()
  const stepper=useStepperStore()
  stepper.setStep(0)
  await user.restore()

  switch (to.name) {
    case 'Profile':
      if (!auth.isAuthorized)
        return { name: "Login" };
      break;
    case 'Login':
      if (auth.isAuthorized)
        return { name: "Profile" };
    case 'Signup':
      if (auth.isAuthorized)
        return { name: "Profile" };

    default:
      break;
  }

})
export default router;
