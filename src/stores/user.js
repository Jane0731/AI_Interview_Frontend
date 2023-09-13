import { ref,reactive } from "vue";
import { defineStore } from "pinia";
import axios from "@/api/axios.config";
import { useResultStore } from "./result";

export const useUserStore = defineStore("user", () => {
  const userId = ref(null);
  const name = ref("");
  const token = ref("")
  const isSuccessRegist = ref(false)
  const user=reactive({})
  const discussionPosts=reactive([])
  const experiencePosts=reactive([])

  const setToken = async (accessToken) => {
    token.value = accessToken
  }
  const getToken = () => {
    return token.value
  }
  const setUserId = (id) => {
    userId.value = id
  }
  const getUserData = async () => {
    await axios
      .get("/auth/profile")
      .then((response) => {
        Object.assign(user, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDiscussionPost=async()=>{
    await axios
      .get("/auth/discussion")
      .then((response) => {
        Object.assign(discussionPosts, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const getExperiencePost=async()=>{
    await axios
      .get("/auth/experience")
      .then((response) => {
        Object.assign(experiencePosts, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const register = async (name, sex, email, password) => {
    const json = JSON.stringify({
      name,
      sex,
      email,
      password,
    });
    await axios
      .post("/auth/register", JSON.parse(json))
      .then((response) => {
        const resultStore = useResultStore()
        resultStore.clear()
        console.log("test user")
        isSuccessRegist.value = true
      })
      .catch((error) => {
        const resultStore = useResultStore()
        for (let errorMessage in error.response.data.errors) {
          resultStore.error(error.response.data.errors[errorMessage][0])
          break
        }
      });
  }

  return { userId,getDiscussionPost,getExperiencePost,discussionPosts,experiencePosts, name, setToken,getUserData, token, getToken, isSuccessRegist, register, setUserId,user };
});
