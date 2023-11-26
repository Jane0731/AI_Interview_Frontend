import axios from "@/api/axios.config";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { compileStyleAsync } from "vue/compiler-sfc";

export const useCategorysStore = defineStore("category", () => {
  const categorys = reactive([]);
  
  const getCategorys = async () => {
    await axios
      .get("/category")
      .then((response) => {
        response.data.forEach((category) => {
            if (category.id == null) {
                category.id = 0
              return;
            }
          });
        Object.assign(categorys, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCategoryName = (id) => {
    const name = ref("");
    categorys.forEach((category) => {
      if (category.id == id) {
        name.value = category.name;
        return;
      }
    });
    return name.value;
  };
  return {
    categorys,
    getCategorys,
    getCategoryName,
  };
});
