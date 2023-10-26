import { reactive } from "vue";
import { defineStore } from "pinia";

import axios from "@/api/axios.config";
import { useResultStore } from "@/stores/result";

import moment from "moment";
import "moment/dist/locale/zh-tw";
moment.locales();

export const useCommentStore = defineStore("comment", () => {
    const comments = reactive([]);

    const getComment = async (id, type) => {
        await axios
            .get("/" + type + "/" + id + "/comment")
            .then((response) => {
                response.data.forEach((comment) => {
                    comment.created_at = moment(comment.created_at).fromNow();
                });
                comments.length=0

                Object.assign(comments, response.data);

            })
            .catch((error) => {
                console.error(error);
            });
    };
    const updateComment = async (id, typeId, type, comment) => {
        const json = JSON.stringify({
            comment
        });
        await axios
            .patch("/comment/" + id, JSON.parse(json))
            .then((response) => {
                const resultStore = useResultStore();
                resultStore.success("編輯成功");
                getComment(typeId, type)
            })
            .catch((error) => {
                const resultStore = useResultStore();
                resultStore.error("新增失敗");
                console.log(error);
            });
    };
    const createComment = async (id, comment, type) => {
        const json = JSON.stringify({
            comment
        });
        await axios
            .post("/" + type + "/" + id + "/comment", JSON.parse(json))
            .then((response) => {
                const resultStore = useResultStore();
                resultStore.success("新增成功");
                getComment(id, type);
            })
            .catch((error) => {
                const resultStore = useResultStore();
                resultStore.error("新增失敗");
                console.log(error);
            });
    };
    const deleteComment = async (id, typeId, type) => {
        await axios
            .delete("/comment/" + id)
            .then((response) => {
                const resultStore = useResultStore();
                resultStore.success("刪除成功");
                getComment(typeId, type)
            })
            .catch((error) => {
                const resultStore = useResultStore();
                resultStore.error("刪除失敗");
                console.log(error);
            });
    };

    return {
        comments,
        getComment,
        createComment,
        updateComment,
        deleteComment,
    };
});
