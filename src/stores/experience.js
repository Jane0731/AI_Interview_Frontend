import { computed, reactive } from "vue";
import { defineStore } from "pinia";

import axios from "@/api/axios.config";
import { useResultStore } from "@/stores/result";
import moment from "moment";
import "moment/dist/locale/zh-tw";
moment.locales();

export const useExperienceStore = defineStore("experience", () => {
  const experiences = reactive([]);
  const experience = reactive({});
  const newExperiences=computed(()=>{
    return experiences.new
  })
  const popularExperiences=computed(()=>{
    return experiences.popular
  })
  const getAllExperiences = async () => {
    await axios
      .get("/experience")
      .then((response) => {
        response.data.new.forEach((experience) => {
          experience.created_at = moment(experience.created_at).fromNow();
        });
        response.data.popular.forEach((experience) => {
          experience.created_at = moment(experience.created_at).fromNow();
        });
        Object.assign(experiences, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getExperience = async (id) => {
    await axios
      .get("/experience/" + id)
      .then((response) => {
        response.data.created_at = moment(response.data.created_at).fromNow();
        Object.assign(experience, response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const updateExperience = async (experience_id,company, position, date, description, result, difficulty, questions) => {
    const json = JSON.stringify({
      company,
      position,
      date,
      description,
      result,
      difficulty,
      questions
    });
    await axios
      .patch("/experience/"+experience_id, JSON.parse(json))
      .then((response) => {
        const resultStore = useResultStore();
        resultStore.success("編輯成功");
        getAllExperiences();
      })
      .catch((error) => {
        const resultStore = useResultStore();
        resultStore.error("編輯失敗");
        console.log(error);
      });
  };
  const createExperience = async (company, position, date, description, result, difficulty, questions) => {
    const json = JSON.stringify({
      company,
      position,
      date,
      description,
      result,
      difficulty,
      questions
    });
    await axios
      .post("/experience", JSON.parse(json))
      .then((response) => {
        console.log(response)
        const resultStore = useResultStore();
        resultStore.success("新增成功");
        getAllExperiences();
      })
      .catch((error) => {
        const resultStore = useResultStore();
        resultStore.error("新增失敗");
        console.log(error);
      });
  };
  const deleteExperience = async (id) => {
    await axios
      .delete("/experience/" + id)
      .then((response) => {
        const resultStore = useResultStore();
        experiences.length=0
        resultStore.success("刪除成功");
        getAllExperiences();

      })
      .catch((error) => {
        const resultStore = useResultStore();
        resultStore.error("刪除失敗");
        console.log(error);
      });
  };

  return {
    experiences,
    experience,
    newExperiences,
    popularExperiences,
    getAllExperiences,
    getExperience,
    createExperience,
    updateExperience,
    deleteExperience,
  };
});
