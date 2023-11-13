import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "@/api/axios.config";
import { useResultStore } from "./result";
import { useAuthStore } from "./auth";

export const useUserStore = defineStore("user", () => {
  const userId = ref(null);
  const name = ref("");
  const token = ref("");
  const user = reactive({});
  const discussionPosts = reactive([]);
  const experiencePosts = reactive([]);
  const interviewRecord = reactive([]);

  const setToken = async (accessToken) => {
    token.value = accessToken;
  };
  const getToken = () => {
    return token.value;
  };
  const setUserId = (id) => {
    userId.value = id;
  };
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
  const getDiscussionPost = async () => {
    await axios
      .get("/auth/discussion")
      .then((response) => {
        Object.assign(discussionPosts, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getExperiencePost = async () => {
    await axios
      .get("/auth/experience")
      .then((response) => {
        Object.assign(experiencePosts, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getInterviewRecord = async () => {
    await axios
      .get("/interview-record")
      .then((response) => {
        Object.assign(interviewRecord, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateProfile = async (
    name
  ) => {
    return new Promise(async (resolve, reject) => {
      const json = JSON.stringify({
        name,
      });
      await axios
        .patch("/auth/profile", JSON.parse(json))
        .then((response) => {
          const resultStore = useResultStore();
          resultStore.clear();
          console.log(response)
          resolve(true);
        })
        .catch((error) => {
          reject(false);
        });
    });
  };
  const register = async (name, sex, email, password) => {
    return new Promise(async (resolve, reject) => {
      const json = JSON.stringify({
        name,
        sex,
        email,
        password,
      });
      await axios
        .post("/auth/register", JSON.parse(json))
        .then((response) => {
          const resultStore = useResultStore();
          resultStore.clear();
          resolve(true);
        })
        .catch((error) => {
          const resultStore = useResultStore();
          for (let errorMessage in error.response.data.errors) {
            resultStore.error(error.response.data.errors[errorMessage][0]);
            break;
          }
          reject(false);

        });
    });
  };
  const restPassword = async (
    password,
    new_password,
    new_password_confirmation
  ) => {
    return new Promise(async (resolve, reject) => {
      const json = JSON.stringify({
        password,
        new_password,
        new_password_confirmation,
      });
      await axios
        .post("/auth/reset-password", JSON.parse(json))
        .then((response) => {
          const resultStore = useResultStore();
          resultStore.clear();
          const authStroe = useAuthStore();
          authStroe.logout();
          resolve(true);
        })
        .catch((error) => {
          const resultStore = useResultStore();
          for (let errorMessage in error.response.data.errors) {
            resultStore.error(error.response.data.errors[errorMessage][0]);
            break;
          }
          reject(false);
        });
    });
  };

  return {
    userId,
    getDiscussionPost,
    getExperiencePost,
    discussionPosts,
    experiencePosts,
    name,
    setToken,
    getUserData,
    token,
    getToken,
    register,
    setUserId,
    user,
    restPassword,
    updateProfile,
    getInterviewRecord,
    interviewRecord
  };
});
