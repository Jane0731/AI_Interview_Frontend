import { reactive } from "vue";
import { defineStore } from "pinia";

import axios from "@/api/axios.config";
import { useResultStore } from "@/stores/result";
import moment from "moment";
import "moment/dist/locale/zh-tw";
moment.locales();

export const useExperienceStore = defineStore("experience", () => {
  const experiences = reactive([]);
  const experience = reactive({});
  const getAllExperiences = async () => {
    // await axios
    //   .get("/discussion")
    //   .then((response) => {
    //     response.data.forEach((discussion) => {
    //       discussion.created_at = moment(discussion.created_at).fromNow();
    //     });
    //     Object.assign(discussions, response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  const getExperience = async (id) => {
    // await axios
    //   .get("/discussion/" + id)
    //   .then((response) => {

    //     response.data.created_at = moment(response.data.created_at).fromNow();
    //     Object.assign(discussion, response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
  const updateExperience = async(title, content, category_id, tags,discussion_id) => {
    // const json = JSON.stringify({
    //   title,
    //   content,
    //   category_id,
    //   tags,
    // });
    // await axios
    //   .patch("/discussion/"+discussion_id, JSON.parse(json))
    //   .then((response) => {
    //     const resultStore = useResultStore();
    //     resultStore.success("編輯成功");
    //     getAllDiscussions();
    //   })
    //   .catch((error) => {
    //     const resultStore = useResultStore();
    //     resultStore.error("編輯失敗");
    //     console.log(error);
    //   });
  };
  const createExperience =  async(title, content, category_id, tags) => {
    // const json = JSON.stringify({
    //   title,
    //   content,
    //   category_id,
    //   tags,
    // });
    // await axios
    //   .post("/discussion", JSON.parse(json))
    //   .then((response) => {
    //     const resultStore = useResultStore();
    //     resultStore.success("新增成功");
    //     getAllDiscussions();
    //   })
    //   .catch((error) => {
    //     const resultStore = useResultStore();
    //     resultStore.error("新增失敗");
    //     console.log(error);
    //   });
  };
  const deleteExperience = async (id) => {
    // await axios
    //   .delete("/discussion/" + id)
    //   .then((response) => {
    //     const resultStore = useResultStore();
    //     resultStore.success("刪除成功");
    //     getAllDiscussions();

    //   })
    //   .catch((error) => {
    //     const resultStore = useResultStore();
    //     resultStore.error("刪除失敗");
    //     console.log(error);
    //   });
  };

  return {
    experiences,
    experience,
    getAllExperiences,
    getExperience,
    createExperience,
    updateExperience,
    deleteExperience,
  };
});
