import axios from "axios";
import { API_URL } from "../navigation/Constants";

export const login = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URL + "/api/token/", data, {})
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
