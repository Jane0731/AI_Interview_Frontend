import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/api/axios.config";

export const useVoiceStore = defineStore("voice", () => {
    
    const getToken= async () => {
        await axios
          .post("/AI-voice/token")
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error);
          });
      };
    return {
        getToken
    };
});
