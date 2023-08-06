import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/api/axios.config";
import { useResultStore } from "./result";

export const useUserStore = defineStore("user", () => {
  const userId = ref(null);
  const name = ref("");
  const token=ref("")
  const isSuccessRegist=ref(false)

  const setToken=async(accessToken)=>{
    token.value=accessToken
  }
  const getToken=()=>{
    return token.value
  }
  const setUserId=(id)=>{
    userId.value=id
  }
  console.log(userId.value)
  const register=async(name,sex,email,password)=>{
    const json = JSON.stringify({
      name,
      sex,
      email,
      password,
    });
    await axios
      .post("/auth/register", JSON.parse(json))
      .then((response) => {
        const resultStore=useResultStore()
        resultStore.clear()
        console.log("test user")
        isSuccessRegist.value=true
      })
      .catch((error) => {
        const resultStore=useResultStore()
        for (let errorMessage in error.response.data.errors) {
          resultStore.error(error.response.data.errors[errorMessage][0])
          break
        }
      });
  }

  return { userId, name,setToken,token,getToken,isSuccessRegist,register,setUserId };
});
