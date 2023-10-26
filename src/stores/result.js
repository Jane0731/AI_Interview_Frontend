import { defineStore } from "pinia";
import { reactive } from "vue";
import { ref,inject } from "vue";

export const useResultStore = defineStore("result", () => {
  const reload=inject("reload")
  const result =reactive({message:"", type: ""})
  const success = (message) => {
    Object.assign(result, { message, type: "success" });
  };
  const error = (message) => {
    Object.assign(result, { message, type: "error" });

  };
  const clear = () => {
    Object.assign(result, {message:"", type: ""});
    reload()
  };
  return { result, success, error, clear };
});
