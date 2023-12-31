import { defineStore } from "pinia";
import { reactive } from "vue";
import { ref } from "vue";

export const useDialogStore = defineStore("dialog", () => {
  const dialogContent = reactive({});
  const dialogStatus = ref(false);
  const loginDialogStatus = ref(false);

  const changeDialogStatus = () => {
    dialogStatus.value = !dialogStatus.value;
    if (!dialogStatus.value) clearDialogContent();
  };
  const setDialogContent = (title, submit, id) =>
    Object.assign(dialogContent, { title, submit, id });
  const clearDialogContent = () => {
    Object.assign(dialogContent, { title: "", submit: "", id: "" });
  };
  const changeLoginDialogStatus = () => {
    loginDialogStatus.value = !loginDialogStatus.value;
  };

  return {
    loginDialogStatus,
    dialogContent,
    dialogStatus,
    changeDialogStatus,
    setDialogContent,
    clearDialogContent,
    changeLoginDialogStatus,

  };
});
