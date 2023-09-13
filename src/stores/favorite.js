import { reactive } from "vue";
import { defineStore } from "pinia";
import axios from "@/api/axios.config";
import { useResultStore } from "./result";
import { useExperienceStore } from "./experience";
import { useDiscussionStore } from "./discussion";
import moment from "moment";
import "moment/dist/locale/zh-tw";
moment.locales();
export const useFavoriteStore = defineStore("favorite", () => {
  const favorites = reactive({})

  const getFavorite = async () => {
    await axios
      .get("/favorite")
      .then((response) => {
        response.data.discussion.forEach((favorite) => {
          favorite.is_Favorite= true
          favorite.created_at = moment(favorite.created_at).fromNow();
        });
        response.data.experience.forEach((favorite) => {
          favorite.is_Favorite= true
          favorite.created_at = moment(favorite.created_at).fromNow();
        });
        Object.assign(favorites, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const addFavorites = async (type, id, pageType) => {
    await axios
      .post("/" + type + "/" + id + "/favorite")
      .then((response) => {
        const resultStore = useResultStore();
        resultStore.success("收藏成功");
        if (type == 'experience') {
          const experienceStore = useExperienceStore()
          if (pageType == "all")
            experienceStore.getAllExperiences();
          else
            experienceStore.getExperience(id)
        }
        else {
          const discussionStore = useDiscussionStore()
          if (pageType == "all")
            discussionStore.getAllDiscussions();
          else
            discussionStore.getDiscussion(id)
        }
      })
      .catch((error) => {
        const resultStore = useResultStore();
        resultStore.error("收藏失敗");
        console.log(error);
      });
  }
  const deleteFavorites = async (type, id, pageType) => {
    await axios
      .delete("/" + type + "/" + id + "/favorite")
      .then((response) => {
        const resultStore = useResultStore();
        resultStore.success("取消收藏成功");
        if (type == 'experience') {
          const experienceStore = useExperienceStore()
          if (pageType == "all")
            experienceStore.getAllExperiences();
          else
            experienceStore.getExperience(id)
        }
        else {
          const discussionStore = useDiscussionStore()
          if (pageType == "all")
            discussionStore.getAllDiscussions();
          else
            discussionStore.getDiscussion(id)
        }
      })
      .catch((error) => {
        const resultStore = useResultStore();
        resultStore.error("取消收藏失敗");
        console.log(error);
      });
  }

  return { getFavorite, favorites, addFavorites, deleteFavorites };
});
