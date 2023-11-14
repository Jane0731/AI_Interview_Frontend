import { ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useResultStore } from "./result";
import axios from "@/api/axios.config";

export const useAuthStore = defineStore("auth", () => {
  const isAuthorized = ref(false)
  const login = async (email, password) => {
    const json = JSON.stringify({
      email,
      password,
    });
    await axios
      .post("/auth/login", JSON.parse(json))
      .then(async (response) => {
        const userStore = useUserStore()
        const resultStore = useResultStore()
        resultStore.clear()
        localStorage.setItem("token", response.data.access_token);
        await userStore.setToken(response.data.access_token)
        isAuthorized.value = true
      })
      .catch((error) => {
        const resultStore = useResultStore()
        console.log(error)
        // resultStore.error(error.response.data.message)
      });
  };
  const setAuthorize=(value)=>{
    isAuthorized.value = value
  }
  const logout = async () => {
    await axios
      .get("/auth/logout")
      .then(async (response) => {
        const userStroe = useUserStore()
        localStorage.removeItem("token")
        await userStroe.setToken("")
      })
      .catch((error) => {
        const resultStore = useResultStore()
        console.log(error)
        // resultStore.error(error.response.data.message)
      });
  };

  return { login, logout, isAuthorized ,setAuthorize};
});
