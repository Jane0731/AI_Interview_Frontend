import { reactive } from "vue";
import { defineStore } from "pinia";

import axios from "@/api/axios.config";
import { useResultStore } from "@/stores/result";

import moment from "moment";
import "moment/dist/locale/zh-tw";
moment.locales();

export const useCommentStore = defineStore("comment", () => {
    const comments = reactive([]);
    const clearComment=()=>{
        Object.assign(comments, [""]);
    }
    const getComment = async (id) => {
        await axios
            .get("/discussion/" + id + "/comment")
            .then((response) => {
                response.data.forEach((comment) => {
                    console.log("test")
                    comment.created_at = moment(comment.created_at).fromNow();
                  });
                Object.assign(comments, response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const updateComment = async (title, content, category_id, tags, discussion_id) => {
        // const json = JSON.stringify({
        //     title,
        //     content,
        //     category_id,
        //     tags,
        // });
        // await axios
        //     .patch("/discussion/" + discussion_id, JSON.parse(json))
        //     .then((response) => {
        //         const resultStore = useResultStore();
        //         resultStore.success("編輯成功");
        //         getAllDiscussions();
        //     })
        //     .catch((error) => {
        //         const resultStore = useResultStore();
        //         resultStore.error("編輯失敗");
        //         console.log(error);
        //     });
    };
    const createComment = async (id,comment) => {
        const json = JSON.stringify({
            comment
        });
        console.log(id,comment)
        await axios
            .post("/discussion/" + id + "/comment", JSON.parse(json))
            .then((response) => {
                const resultStore = useResultStore();
                resultStore.success("新增成功");
                getComment(id);
            })
            .catch((error) => {
                const resultStore = useResultStore();
                resultStore.error("新增失敗");
                console.log(error);
            });
    };
    const deleteComment = async (id,discussionId) => {
        await axios
            .delete("/comment/" + id)
            .then((response) => {
                const resultStore = useResultStore();
                resultStore.success("刪除成功");
                getComment(discussionId)
            })
            .catch((error) => {
                const resultStore = useResultStore();
                resultStore.error("刪除失敗");
                console.log(error);
            });
    };

    return {
        comments,
        clearComment,
        getComment,
        createComment,
        updateComment,
        deleteComment,
    };
});
