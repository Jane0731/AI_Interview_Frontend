import { reactive } from "vue";
import { defineStore } from "pinia";

import axios from "@/api/axios.config";
import { useResultStore } from "@/stores/result";
import { useCategorysStore } from '@/stores/category';

import moment from "moment";
import "moment/dist/locale/zh-tw";
moment.locales();

export const useDiscussionStore = defineStore("discussion", () => {
  const discussions = reactive([]);
  const discussion = reactive({});
  const getAllDiscussions = async () => {
    await axios
      .get("/discussion")
      .then((response) => {
        const categoryStore = useCategorysStore()
        response.data.forEach((discussion) => {
          discussion.categoryName= categoryStore.getCategoryName(discussion.category_id)
          discussion.created_at = moment(discussion.created_at).fromNow();
        });
        Object.assign(discussions, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDiscussion = async (id) => {
    await axios
      .get("/discussion/" + id)
      .then((response) => {

        response.data.created_at = moment(response.data.created_at).fromNow();
        Object.assign(discussion, response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const updateDiscussion = async(title, content, category_id, tags,discussion_id) => {
    const json = JSON.stringify({
      title,
      content,
      category_id,
      tags,
    });
    await axios
      .patch("/discussion/"+discussion_id, JSON.parse(json))
      .then((response) => {
        const resultStore = useResultStore();
        resultStore.success("編輯成功");
        getAllDiscussions();
      })
      .catch((error) => {
        const resultStore = useResultStore();
        resultStore.error("編輯失敗");
        console.log(error);
      });
  };
  const createDiscussion =  async(title, content, category_id, tags) => {
    const json = JSON.stringify({
      title,
      content,
      category_id,
      tags,
    });
    console.log(tags)
    await axios
      .post("/discussion", JSON.parse(json))
      .then((response) => {
        const resultStore = useResultStore();
        resultStore.success("新增成功");
        getAllDiscussions();
      })
      .catch((error) => {
        const resultStore = useResultStore();
        resultStore.error("新增失敗");
        console.log(error);
      });
  };
  const deleteDiscussion = async (id) => {
    await axios
      .delete("/discussion/" + id)
      .then((response) => {
        const resultStore = useResultStore();
        discussions.length=0
        resultStore.success("刪除成功");
        getAllDiscussions();

      })
      .catch((error) => {
        const resultStore = useResultStore();
        resultStore.error("刪除失敗");
        console.log(error);
      });
  };

  return {
    discussions,
    discussion,
    getAllDiscussions,
    getDiscussion,
    createDiscussion,
    updateDiscussion,
    deleteDiscussion,
  };
});
