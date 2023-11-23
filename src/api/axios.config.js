import Axios from "axios";
import router from "@/router/index";
import { useResultStore } from "@/stores/result";

const axios = (baseURL) => {
  const instance = Axios.create({
    baseURL: "https://interviewai.nutc.edu.tw/api",
    // baseURL: "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
  });
  instance.interceptors.request.use(
    (request) => {
      const token = localStorage.getItem("token");
      request.headers["Authorization"] = "Bearer" + token;
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // instance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   async(error) => {
  //     if (error.response) {
  //       switch (error.response.status) {
  //         case 404:
  //           console.log("你要找的頁面不存在");
  //           // go to 404 page
  //           break;
  //         case 500:
  //           console.log("程式發生問題");
  //           // go to 500 page
  //           break;
  //         case 401:
  //           // console.log("token過期或未登入");
  //           localStorage.removeItem("token");
  //           localStorage.removeItem("userId");
  //           // alert("請重新登入");
  //           router.push("/Login");
  //           break;
  //         default:
  //           console.log(error.message);
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  return instance;
};
export { axios };
export default axios();
