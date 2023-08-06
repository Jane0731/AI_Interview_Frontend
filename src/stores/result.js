import { defineStore } from "pinia";
import { reactive } from "vue";
import { ref } from "vue";

export const useResultStore = defineStore("result", () => {
  const result =reactive({message:"", type: ""})
  const success = (message) => {
    Object.assign(result, { message, type: "success" });
  };
  const error = (message) => {
    console.log("erro alert")
    Object.assign(result, { message, type: "error" });

  };
  const clear = () => {
    console.log("clear alert")
    Object.assign(result, {message:"", type: ""});
  };
  return { result, success, error, clear };
});
