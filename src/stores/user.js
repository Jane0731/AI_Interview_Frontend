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
  const restore = async () => {
    
    await axios
      .get("/auth/profile")
      .then((response) => {
        const auth=useAuthStore()
        Object.assign(user, response.data);
        auth.setAuthorize(true)

      })
      .catch((error) => {
        console.log(error);
        const auth=useAuthStore()

        auth.setAuthorize(false)

      });
  }
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
        response.data.forEach((element) => {
          let date = new Date(element.created_at)
          let year = date.getFullYear();
          let month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1，并且补零
          let day = String(date.getDate()).padStart(2, '0');
          let hours = String(date.getHours()).padStart(2, '0');
          let minutes = String(date.getMinutes()).padStart(2, '0');
          let seconds = String(date.getSeconds()).padStart(2, '0');
          element.created_at = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

          const data = element.interview_questions
          const translationMap = {
            'hand_on_hip': '手揮動放低於超過偵測畫面',
            'hand_above_head': '手揮動高度超過頭頂',
            'hand_on_head': '手頭揮動高度在頭',
            'hand_on_neck': '手揮動高度在脖子',
            'hand_below_chest': '手揮動於胸部以下的位置',
            'hand_on_chest': '手揮動高度於胸部附',
            'hand_crossed_chest': '手交叉於胸前'
          };
          const newData = {
            'hand_on_hip': 0,
            'hand_above_head': 0,
            'hand_on_head': 0,
            'hand_on_neck': 0,
            'hand_below_chest': 0,
            'hand_on_chest': 0,
            'hand_crossed_chest': 0
          }
          data.map((item) => {
            for (const key in item.motion) {
              newData[key] = newData[key] + item.motion[key];
            }
          })
          const dataLabel = element.interview_questions[0].motion
          const translatedA = Object.keys(dataLabel).map((key) => translationMap[key]);
          element.dataLabel = translatedA
          element.allData = Object.values(newData)
          let translatedData = {};
          let motiontimesData = {
            'hand_on_hip': 0,
            'hand_above_head': 0,
            'hand_on_head': 0,
            'hand_on_neck': 0,
            'hand_below_chest': 0,
            'hand_on_chest': 0,
            'hand_crossed_chest': 0
          };

          data.forEach((item) => {
            translatedData = {}
            Object.keys(item.motion).forEach((key) => {
              translatedData[translationMap[key] || key] = item.motion[key];
              motiontimesData[translationMap[key] || key] = motiontimesData[translationMap[key] || key] + item.motion[key]
            });
            item.motion = translatedData
          })
          element.interview_questions = data
        })
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
    restore,
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
